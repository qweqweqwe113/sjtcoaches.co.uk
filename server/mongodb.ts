/**
 * MongoDB connection and client management
 */

import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(uri: string): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db("albion_coach");
  
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

export function getMongoDb(env: { MONGODB_URI: string }): Promise<Db> {
  return connectToDatabase(env.MONGODB_URI).then(({ db }) => db);
}
