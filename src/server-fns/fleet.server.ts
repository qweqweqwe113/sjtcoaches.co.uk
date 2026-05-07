import { createServerFn } from "@tanstack/react-start";
import { listFleet } from "../../server/db";
import { getMongoDb } from "../../server/mongodb";

export const getFleetDataFn = createServerFn({ method: "GET" }).handler(
  async ({ context }: { context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) return [];
    try {
      const db = await getMongoDb({ MONGODB_URI: mongoUri });
      const fleet = await listFleet(db);
      return fleet.map((f) => ({ ...f, _id: f._id?.toString() }));
    } catch {
      return [];
    }
  },
);
