/**
 * Database helpers for MongoDB
 */

import { Db, ObjectId } from "mongodb";
import { getMongoDb } from "./mongodb";

export interface AdminCredentials {
  _id?: ObjectId;
  email: string;
  password_hash: string;
}

export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string | null;
  journey_date: string | null;
  message: string;
  created_at: Date;
}

export interface Booking {
  _id?: ObjectId;
  purpose: string;
  passengers: number;
  pickup: string;
  dropoff: string;
  journey_date: string;
  journey_time: string;
  vehicle: string;
  comfort_tier: string;
  add_ons: string[]; // Array of strings
  estimated_price: number;
  name: string;
  email: string;
  phone: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: Date;
}

export interface FleetVehicle {
  _id?: ObjectId;
  id: string;
  name: string;
  model: string;
  tag: string;
  img: string;
  capacity: string;
  range: string;
  price: number;
  description: string;
  features: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SiteContent {
  _id?: ObjectId;
  key: string; // Unique identifier like "hero_title", "contact_phone"
  section: string; // Group like "homepage", "contact", "footer"
  type: "text" | "image" | "price" | "number" | "email" | "phone" | "url" | "textarea";
  label: string; // Human-readable label
  value: string; // The actual content
  description?: string; // Help text
  updated_at: Date;
}

export interface PricingRule {
  _id?: ObjectId;
  vehicle_type: string;
  base_price: number;
  price_per_mile: number;
  price_per_hour: number;
  minimum_hours: number;
  active: boolean;
  updated_at: Date;
}

// ─── MongoDB helpers ──────────────────────────────────────────────────────────

export async function getAdminCredentials(db: Db): Promise<AdminCredentials | null> {
  return db.collection<AdminCredentials>("admin_credentials").findOne({});
}

export async function updateAdminEmail(db: Db, email: string) {
  return db.collection<AdminCredentials>("admin_credentials").updateOne(
    {},
    { $set: { email } },
    { upsert: true }
  );
}

export async function updateAdminPasswordHash(db: Db, hash: string) {
  return db.collection<AdminCredentials>("admin_credentials").updateOne(
    {},
    { $set: { password_hash: hash } },
    { upsert: true }
  );
}

export async function insertContactMessage(
  db: Db,
  data: Omit<ContactMessage, "_id" | "created_at">,
) {
  return db.collection<ContactMessage>("contact_messages").insertOne({
    ...data,
    created_at: new Date(),
  } as ContactMessage);
}

export async function listContactMessages(db: Db): Promise<ContactMessage[]> {
  return db
    .collection<ContactMessage>("contact_messages")
    .find()
    .sort({ created_at: -1 })
    .limit(100)
    .toArray();
}

export async function deleteContactMessage(db: Db, id: string) {
  return db.collection<ContactMessage>("contact_messages").deleteOne({ _id: new ObjectId(id) });
}

export async function insertBooking(
  db: Db,
  data: Omit<Booking, "_id" | "status" | "created_at">,
) {
  return db.collection<Booking>("bookings").insertOne({
    ...data,
    status: "pending",
    created_at: new Date(),
  } as Booking);
}

export async function listBookings(db: Db): Promise<Booking[]> {
  return db
    .collection<Booking>("bookings")
    .find()
    .sort({ created_at: -1 })
    .limit(200)
    .toArray();
}

export async function updateBookingStatus(
  db: Db,
  id: string,
  status: Booking["status"],
) {
  return db.collection<Booking>("bookings").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );
}

export async function listFleet(db: Db): Promise<FleetVehicle[]> {
  return db
    .collection<FleetVehicle>("fleet")
    .find()
    .sort({ id: 1 })
    .toArray();
}

export async function getFleetVehicle(db: Db, id: string): Promise<FleetVehicle | null> {
  return db.collection<FleetVehicle>("fleet").findOne({ id });
}

export async function insertFleetVehicle(
  db: Db,
  data: Omit<FleetVehicle, "_id" | "created_at" | "updated_at">,
) {
  const now = new Date();
  return db.collection<FleetVehicle>("fleet").insertOne({
    ...data,
    created_at: now,
    updated_at: now,
  } as FleetVehicle);
}

export async function updateFleetVehicle(
  db: Db,
  id: string,
  data: Partial<Omit<FleetVehicle, "_id" | "created_at">>,
) {
  return db.collection<FleetVehicle>("fleet").updateOne(
    { id },
    { $set: { ...data, updated_at: new Date() } }
  );
}

export async function upsertFleetVehicle(
  db: Db,
  data: FleetVehicle,
) {
  const now = new Date();
  return db.collection<FleetVehicle>("fleet").updateOne(
    { id: data.id },
    { 
      $set: { 
        ...data, 
        updated_at: now 
      },
      $setOnInsert: { created_at: now }
    },
    { upsert: true }
  );
}

export async function deleteFleetVehicle(db: Db, id: string) {
  return db.collection<FleetVehicle>("fleet").deleteOne({ id });
}

export async function listBlogPosts(db: Db, publishedOnly = false): Promise<BlogPost[]> {
  const filter = publishedOnly ? { published: true } : {};
  return db
    .collection<BlogPost>("blog_posts")
    .find(filter)
    .sort({ created_at: -1 })
    .toArray();
}

export async function getBlogPost(db: Db, id: string): Promise<BlogPost | null> {
  return db.collection<BlogPost>("blog_posts").findOne({ _id: new ObjectId(id) });
}

export async function getBlogPostBySlug(db: Db, slug: string): Promise<BlogPost | null> {
  return db.collection<BlogPost>("blog_posts").findOne({ slug });
}

export async function insertBlogPost(
  db: Db,
  data: Omit<BlogPost, "_id" | "created_at" | "updated_at">,
) {
  const now = new Date();
  return db.collection<BlogPost>("blog_posts").insertOne({
    ...data,
    created_at: now,
    updated_at: now,
  } as BlogPost);
}

export async function updateBlogPost(
  db: Db,
  id: string,
  data: Partial<Omit<BlogPost, "_id" | "created_at">>,
) {
  return db.collection<BlogPost>("blog_posts").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updated_at: new Date() } }
  );
}

export async function deleteBlogPost(db: Db, id: string) {
  return db.collection<BlogPost>("blog_posts").deleteOne({ _id: new ObjectId(id) });
}

// ─── Site Content Management ─────────────────────────────────────────────────

export async function listSiteContent(db: Db, section?: string): Promise<SiteContent[]> {
  const filter = section ? { section } : {};
  return db
    .collection<SiteContent>("site_content")
    .find(filter)
    .sort({ section: 1, key: 1 })
    .toArray();
}

export async function getSiteContentByKey(db: Db, key: string): Promise<SiteContent | null> {
  return db.collection<SiteContent>("site_content").findOne({ key });
}

export async function upsertSiteContent(
  db: Db,
  data: Omit<SiteContent, "_id" | "updated_at">
) {
  return db.collection<SiteContent>("site_content").updateOne(
    { key: data.key },
    { $set: { ...data, updated_at: new Date() } },
    { upsert: true }
  );
}

export async function deleteSiteContent(db: Db, key: string) {
  return db.collection<SiteContent>("site_content").deleteOne({ key });
}

// ─── Pricing Rules ────────────────────────────────────────────────────────────

export async function listPricingRules(db: Db): Promise<PricingRule[]> {
  return db
    .collection<PricingRule>("pricing_rules")
    .find()
    .sort({ vehicle_type: 1 })
    .toArray();
}

export async function upsertPricingRule(
  db: Db,
  data: Omit<PricingRule, "_id" | "updated_at">
) {
  return db.collection<PricingRule>("pricing_rules").updateOne(
    { vehicle_type: data.vehicle_type },
    { $set: { ...data, updated_at: new Date() } },
    { upsert: true }
  );
}

export async function deletePricingRule(db: Db, id: string) {
  return db.collection<PricingRule>("pricing_rules").deleteOne({ _id: new ObjectId(id) });
}
