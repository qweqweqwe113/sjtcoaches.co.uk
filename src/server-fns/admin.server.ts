import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getMongoDb } from "../../server/mongodb";
import {
  listBlogPosts,
  insertBlogPost,
  updateBlogPost,
  deleteBlogPost,
  type BlogPost,
  listContactMessages,
  deleteContactMessage,
  listFleet,
  type FleetVehicle,
  insertFleetVehicle,
  updateFleetVehicle,
  deleteFleetVehicle,
} from "../../server/db";

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const getBlogPostsFn = createServerFn({ method: "GET" }).handler(
  async ({ context }: { context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    const posts = await listBlogPosts(db, false);
    return posts.map((post) => ({ ...post, _id: post._id?.toString() }));
  },
);

export const createBlogPostFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      title: z.string(),
      slug: z.string(),
      excerpt: z.string(),
      content: z.string(),
      featured_image: z.string(),
      author: z.string(),
      published: z.boolean(),
    }),
  )
  .handler(
    async ({
      data,
      context,
    }: {
      data: Omit<BlogPost, "_id" | "created_at" | "updated_at">;
      context: any;
    }) => {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) throw new Error("MongoDB URI not configured");
      const db = await getMongoDb({ MONGODB_URI: mongoUri });
      const result = await insertBlogPost(db, data);
      return { ok: true, id: result.insertedId.toString() };
    },
  );

export const updateBlogPostFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      updates: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featured_image: z.string().optional(),
        author: z.string().optional(),
        published: z.boolean().optional(),
      }),
    }),
  )
  .handler(
    async ({
      data,
      context,
    }: {
      data: { id: string; updates: Partial<Omit<BlogPost, "_id" | "created_at">> };
      context: any;
    }) => {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) throw new Error("MongoDB URI not configured");
      const db = await getMongoDb({ MONGODB_URI: mongoUri });
      await updateBlogPost(db, data.id, data.updates);
      return { ok: true };
    },
  );

export const deleteBlogPostFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }: { data: { id: string }; context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    await deleteBlogPost(db, data.id);
    return { ok: true };
  });

// ─── Contact messages ─────────────────────────────────────────────────────────

export const getContactMessagesFn = createServerFn({ method: "GET" }).handler(
  async ({ context }: { context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    const messages = await listContactMessages(db);
    return messages.map((msg) => ({
      ...msg,
      _id: msg._id?.toString(),
      created_at: msg.created_at.toISOString(),
    }));
  },
);

export const deleteContactMessageFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }: { data: { id: string }; context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    await deleteContactMessage(db, data.id);
    return { ok: true };
  });

// ─── Fleet ────────────────────────────────────────────────────────────────────

export const getFleetVehiclesFn = createServerFn({ method: "GET" }).handler(
  async ({ context }: { context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    const vehicles = await listFleet(db);
    return vehicles.map((v) => ({ ...v, _id: v._id?.toString() }));
  },
);

export const createFleetVehicleFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      name: z.string(),
      model: z.string(),
      tag: z.string(),
      img: z.string(),
      capacity: z.string(),
      range: z.string(),
      price: z.number(),
      description: z.string(),
      features: z.array(z.string()),
    }),
  )
  .handler(
    async ({
      data,
      context,
    }: {
      data: Omit<FleetVehicle, "_id" | "created_at" | "updated_at">;
      context: any;
    }) => {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) throw new Error("MongoDB URI not configured");
      const db = await getMongoDb({ MONGODB_URI: mongoUri });
      const result = await insertFleetVehicle(db, data);
      return { ok: true, id: result.insertedId.toString() };
    },
  );

export const updateFleetVehicleFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      updates: z.object({
        name: z.string().optional(),
        model: z.string().optional(),
        tag: z.string().optional(),
        img: z.string().optional(),
        capacity: z.string().optional(),
        range: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
      }),
    }),
  )
  .handler(
    async ({
      data,
      context,
    }: {
      data: { id: string; updates: Partial<FleetVehicle> };
      context: any;
    }) => {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) throw new Error("MongoDB URI not configured");
      const db = await getMongoDb({ MONGODB_URI: mongoUri });
      await updateFleetVehicle(db, data.id, data.updates);
      return { ok: true };
    },
  );

export const deleteFleetVehicleFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }: { data: { id: string }; context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    await deleteFleetVehicle(db, data.id);
    return { ok: true };
  });
