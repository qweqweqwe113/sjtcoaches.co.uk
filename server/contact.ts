import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { insertContactMessage, listContactMessages } from "./db";
import { getMongoDb } from "./mongodb";
import { Resend } from "resend";

export const submitContactFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1).max(100),
      email: z.string().email().max(255),
      phone: z.string().max(20).optional(),
      journeyDate: z.string().optional(),
      message: z.string().min(1).max(1500),
    }),
  )
  .handler(async ({ data, context }: { data: { name: string; email: string; phone?: string; journeyDate?: string; message: string }; context: any }) => {
    // Get MongoDB URI from environment
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");

    // Save to database
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    await insertContactMessage(db, {
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      journey_date: data.journeyDate ?? null,
      message: data.message,
    });

    // Send email notification
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        await resend.emails.send({
          from: 'SJT Coaches <onboarding@resend.dev>',
          to: 'miroclejohn@gmail.com',
          subject: `New Contact Form Message from ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
                ${data.journeyDate ? `<p style="margin: 10px 0;"><strong>Journey Date:</strong> ${data.journeyDate}</p>` : ''}
              </div>
              
              <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #d4af37; margin: 20px 0;">
                <p style="margin: 0;"><strong>Message:</strong></p>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
                <p>This message was sent from the SJT Coaches contact form.</p>
                <p>Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailError) {
      // Log error but don't fail the request - message is still saved to database
      console.error('Failed to send email notification:', emailError);
    }

    return { ok: true };
  });

export const listContactMessagesFn = createServerFn({ method: "GET" }).handler(
  async ({ context }: { context: any }) => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI not configured");
    
    const db = await getMongoDb({ MONGODB_URI: mongoUri });
    const messages = await listContactMessages(db);
    
    // Serialize ObjectIds to strings
    return messages.map(msg => ({
      ...msg,
      _id: msg._id?.toString(),
    }));
  },
);
