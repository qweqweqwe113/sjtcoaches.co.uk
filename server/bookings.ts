import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { insertBooking, listBookings, updateBookingStatus } from "./db";
import { getMongoDb } from "./mongodb";
import { Resend } from "resend";

const BookingSchema = z.object({
  purpose: z.enum(["airport", "corporate", "wedding", "tour", "event", "private"]),
  passengers: z.number().int().min(1).max(100),
  pickup: z.string().min(1).max(200),
  dropoff: z.string().min(1).max(200),
  journeyDate: z.string().min(1),
  journeyTime: z.string().min(1),
  vehicle: z.string().min(1),
  comfortTier: z.string().min(1),
  addOns: z.array(z.string()).default([]),
  estimatedPrice: z.number().min(0),
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
});

export const submitBookingFn = createServerFn({ method: "POST" })
  .inputValidator(BookingSchema)
  .handler(async ({ data, context }: { data: z.infer<typeof BookingSchema>; context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");

    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    
    // Save booking to database
    await insertBooking(db, {
      purpose: data.purpose,
      passengers: data.passengers,
      pickup: data.pickup,
      dropoff: data.dropoff,
      journey_date: data.journeyDate,
      journey_time: data.journeyTime,
      vehicle: data.vehicle,
      comfort_tier: data.comfortTier,
      add_ons: data.addOns,
      estimated_price: data.estimatedPrice,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
    });

    // Send email notification
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        const addOnsText = data.addOns.length > 0 
          ? data.addOns.join(", ") 
          : "None";
        
        await resend.emails.send({
          from: "SJT Coaches <bookings@sjtcoaches.co.uk>",
          to: "miroclejohn@gmail.com",
          subject: `New Booking Request - ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                New Booking Request
              </h2>
              
              <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #d4af37;">
                <h3 style="margin-top: 0; color: #1a1a1a;">Customer Information</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
              </div>
              
              <div style="background-color: #fff; padding: 20px; margin: 20px 0; border: 1px solid #e0e0e0;">
                <h3 style="margin-top: 0; color: #1a1a1a;">Journey Details</h3>
                <p><strong>Purpose:</strong> ${data.purpose.charAt(0).toUpperCase() + data.purpose.slice(1)}</p>
                <p><strong>Date:</strong> ${data.journeyDate}</p>
                <p><strong>Time:</strong> ${data.journeyTime}</p>
                <p><strong>Passengers:</strong> ${data.passengers}</p>
                <p><strong>Pickup:</strong> ${data.pickup}</p>
                <p><strong>Drop-off:</strong> ${data.dropoff}</p>
              </div>
              
              <div style="background-color: #fff; padding: 20px; margin: 20px 0; border: 1px solid #e0e0e0;">
                <h3 style="margin-top: 0; color: #1a1a1a;">Vehicle & Service</h3>
                <p><strong>Vehicle:</strong> ${data.vehicle}</p>
                <p><strong>Comfort Tier:</strong> ${data.comfortTier}</p>
                <p><strong>Add-ons:</strong> ${addOnsText}</p>
              </div>
              
              <div style="background-color: #1a1a1a; color: #d4af37; padding: 20px; margin: 20px 0; text-align: center;">
                <h3 style="margin: 0; font-size: 24px;">Estimated Price</h3>
                <p style="font-size: 32px; font-weight: bold; margin: 10px 0;">£${data.estimatedPrice.toLocaleString()}</p>
              </div>
              
              <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                This booking was submitted on ${new Date().toLocaleString("en-GB", {
                  dateStyle: "full",
                  timeStyle: "short"
                })}
              </p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error("Failed to send booking email:", emailError);
      // Don't fail the booking if email fails
    }

    return { ok: true };
  });

export const listBookingsFn = createServerFn({ method: "GET" }).handler(async ({ context }: { context: any }) => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MongoDB URI not configured");
  
  const db = await getMongoDb({ MONGODB_URI: mongoUri });
  return listBookings(db);
});

export const updateBookingStatusFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      status: z.enum(["pending", "confirmed", "cancelled"]),
    }),
  )
  .handler(async ({ data, context }: { data: { id: string; status: "pending" | "confirmed" | "cancelled" }; context: any }) => {
    const env = (context as { cloudflare?: { env: { MONGODB_URI: string } } })
      ?.cloudflare?.env;
    if (!env?.MONGODB_URI) throw new Error("MongoDB URI not configured");
    
    const db = await getMongoDb(env);
    await updateBookingStatus(db, data.id, data.status);
    return { ok: true };
  });
