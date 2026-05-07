/**
 * Generates the initial SQL to seed the admin_credentials table.
 * Run with: npx tsx server/seed.ts
 *
 * Then apply the output SQL via:
 *   wrangler d1 execute albion-coach-db --command="<paste SQL here>"
 */

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

const email = process.argv[2] ?? "admin@sjtcoaches.co.uk";
const password = process.argv[3] ?? "ChangeMe123!";

const hash = await hashPassword(password);

console.log(`\n-- Paste this into wrangler d1 execute:\n`);
console.log(
  `INSERT OR REPLACE INTO admin_credentials (id, email, password_hash) VALUES (1, '${email}', '${hash}');`,
);
console.log(`\nEmail:    ${email}`);
console.log(`Password: ${password}\n`);

// Fleet seed data
const fleetSeedData = [
  { id: "royal-suite", img: "/src/assets/fleet-executive.jpg", range: "From £640 / day" },
  { id: "v-class-prive", img: "/src/assets/fleet-minibus.jpg", range: "From £280 / day" },
  { id: "setra-touring", img: "/src/assets/fleet-coach.jpg", range: "From £960 / day" },
  { id: "phantom-saloon", img: "/src/assets/fleet-phantom.jpg", range: "From £1,200 / day" },
  { id: "bentayga-suv", img: "/src/assets/fleet-bentayga.jpg", range: "From £780 / day" },
  { id: "tourismo-midi", img: "/src/assets/fleet-tourismo.jpg", range: "From £720 / day" },
  { id: "double-decker-thames", img: "/src/assets/fleet-double-decker.jpg", range: "From £1,450 / day" },
  { id: "lumiere-electric", img: "/src/assets/fleet-electric.jpg", range: "From £880 / day" },
  { id: "concorde-shuttle", img: "/src/assets/fleet-shuttle.jpg", range: "From £360 / day" },
  { id: "claridge-heritage", img: "/src/assets/fleet-heritage.jpg", range: "From £1,100 / day" },
  { id: "highland-sleeper", img: "/src/assets/fleet-sleeper.jpg", range: "From £1,380 / day" },
];

console.log(`\n-- Fleet seed data (optional):\n`);
fleetSeedData.forEach(vehicle => {
  console.log(
    `INSERT OR REPLACE INTO fleet (id, img, range) VALUES ('${vehicle.id}', '${vehicle.img}', '${vehicle.range}');`
  );
});
console.log();

