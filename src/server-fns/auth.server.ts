import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getMongoDb } from "../../server/mongodb";
import { getAdminCredentials, updateAdminEmail, updateAdminPasswordHash } from "../../server/db";

// ─── Simple session storage ───────────────────────────────────────────────────
const sessions = new Set<string>();

function generateSessionId(): string {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}

// ─── Password hashing ─────────────────────────────────────────────────────────
async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100_000 },
    key,
    256,
  );
  const hashHex = Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [saltHex, hashHex] = hash.split(":");
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)));
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100_000 },
    key,
    256,
  );
  const computedHashHex = Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return computedHashHex === hashHex;
}

// ─── Server functions ─────────────────────────────────────────────────────────

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email(), password: z.string().min(1) }))
  .handler(async ({ data }: { data: { email: string; password: string } }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");

    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    const admin = await getAdminCredentials(db);

    if (!admin) throw new Error("Admin credentials not found");

    const emailMatch = data.email.toLowerCase() === admin.email.toLowerCase();
    const pwMatch = await verifyPassword(data.password, admin.password_hash);

    if (!emailMatch || !pwMatch) throw new Error("Invalid credentials");

    const sessionId = generateSessionId();
    sessions.add(sessionId);

    return {
      ok: true,
      setCookie: `albion_session=${sessionId}; HttpOnly; SameSite=Strict; Path=/; Max-Age=86400`,
    };
  });

export const checkSessionFn = createServerFn({ method: "GET" }).handler(async (ctx: any) => {
  const request = ctx.request || ctx.context?.request;
  if (!request) return { authed: false };

  const cookie = request.headers.get("cookie");
  if (!cookie) return { authed: false };

  const match = cookie.match(/albion_session=([^;]+)/);
  if (!match) return { authed: false };

  return { authed: sessions.has(match[1]) };
});

export const logoutFn = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const request = ctx.request || ctx.context?.request;
  if (request) {
    const cookie = request.headers.get("cookie");
    if (cookie) {
      const match = cookie.match(/albion_session=([^;]+)/);
      if (match) sessions.delete(match[1]);
    }
  }
  return {
    ok: true,
    setCookie: `albion_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`,
  };
});

export const getCredentialsFn = createServerFn({ method: "GET" }).handler(async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MongoDB URI not configured");

  const db = await getMongoDb({ MONGODB_URI: mongoUri });
  const admin = await getAdminCredentials(db);

  if (!admin) throw new Error("Admin credentials not found");

  return { email: admin.email, hasPassword: true };
});

export const updateEmailFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email() }))
  .handler(async ({ data }: { data: { email: string } }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");

    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    await updateAdminEmail(db, data.email);

    return { ok: true, message: "Email updated successfully" };
  });

export const updatePasswordFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(6),
    }),
  )
  .handler(
    async ({ data }: { data: { currentPassword: string; newPassword: string } }) => {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) throw new Error("MongoDB URI not configured");

      const db = await getMongoDb({ MONGODB_URI: mongoUri });
      const admin = await getAdminCredentials(db);

      if (!admin) throw new Error("Admin credentials not found");

      const pwMatch = await verifyPassword(data.currentPassword, admin.password_hash);
      if (!pwMatch) throw new Error("Current password is incorrect");

      const newHash = await hashPassword(data.newPassword);
      await updateAdminPasswordHash(db, newHash);

      return { ok: true, message: "Password updated successfully" };
    },
  );
