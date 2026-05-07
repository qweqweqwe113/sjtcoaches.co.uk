import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are the SJT Coaches AI concierge. Be friendly, concise and professional.

SJT Coaches — UK premium coach hire:
- Phone: 020 7167 6648 | WhatsApp: 07892 832617 | Email: info@sjtcoaches.co.uk
- Address: Kingcup Farm, Denham, UB9 4HE | Book at: /quote

Fleet & pricing (estimates):
- Executive minibus (up to 8): from £280/day
- Executive coach (up to 23): from £640/day
- Standard coach (up to 53): from £960/day
- Double decker (up to 79): from £1,450/day
- Rolls-Royce Phantom: from £1,200/day
- Bentayga SUV: from £780/day

Services: airport transfers, corporate travel, weddings & events, private tours, school trips, festivals.

Rules: Keep answers to 3-5 sentences. Give estimates freely but say exact quotes come from the team. Always be helpful and warm.`;

export const chatFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messages: z.array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })
      ).max(20),
    })
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("[chatFn] GEMINI_API_KEY is not set — using built-in fallback");
      return { reply: getFallbackReply(data.messages) };
    }

    try {
      const res = await fetch(

        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: data.messages.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.7,
            },
          }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("[chatFn] Gemini API error:", res.status, errText);
        return { reply: "I'm having a moment — please try again or call 020 7167 6648." };
      }

      const json = await res.json();
      const reply =
        json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
        "Sorry, I couldn't process that. Please contact us at info@sjtcoaches.co.uk.";

      return { reply };
    } catch (err) {
      console.error("[chatFn] Fetch error:", err);
      return { reply: "I'm having a moment — please try again or call 020 7167 6648." };
    }
  });

/* -----------------------------------------------------------------------
   Built-in fallback — keyword-based replies when no API key is configured
----------------------------------------------------------------------- */
function getFallbackReply(messages: { role: string; content: string }[]): string {
  const last = messages.filter((m) => m.role === "user").pop();
  const text = (last?.content ?? "").toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup|yo)\b/.test(text)) {
    return "Hello! I'm the SJT Coaches concierge. I can help with fleet info, pricing, bookings, and services. What can I do for you today?";
  }

  // Farewells
  if (/\b(bye|goodbye|see you|take care|cheers|thanks? you|thank you)\b/.test(text)) {
    return "Thanks for chatting! If you'd like to book or get a quote, feel free to visit our quote page or call us on 020 7167 6648. Have a great day!";
  }

  // Who are you / about
  if (/\b(who are you|what are you|about you|your name|introduce)\b/.test(text)) {
    return "I'm the SJT Coaches AI concierge — here to help you explore our fleet, get pricing estimates, and find the right service for your journey. SJT Coaches is a UK premium coach hire company based in Denham, offering everything from airport transfers to luxury weddings.";
  }

  // Where are you from / location
  if (/\b(where are you|where.*from|location|based|address)\b/.test(text)) {
    return "SJT Coaches is based at Kingcup Farm, Denham, UB9 4HE, and we operate across the whole of the UK. You can reach us on 020 7167 6648 or at info@sjtcoaches.co.uk.";
  }

  // Rolls-Royce / luxury cars
  if (/\b(rolls.?royce|phantom|bentayga|bentley|luxury car|wedding car)\b/.test(text)) {
    return "Absolutely! We offer the Rolls-Royce Phantom from £1,200/day and the Bentayga SUV from £780/day — both popular choices for weddings and special occasions. For an exact quote tailored to your date and route, our team would love to help. Call 020 7167 6648 or visit our quote page.";
  }

  // Wedding
  if (/\bwedding\b/.test(text)) {
    return "We specialise in wedding transport — from bridal cars to full guest coach fleets. Our Rolls-Royce Phantom starts from £1,200/day and we can coordinate multi-vehicle movements for your entire party. Get in touch on 020 7167 6648 for a bespoke wedding quote.";
  }

  // Airport
  if (/\b(airport|heathrow|gatwick|stansted|luton|manchester airport|transfer)\b/.test(text)) {
    return "We offer premium airport transfers to and from all major UK airports including Heathrow, Gatwick, Stansted, and Luton. Our chauffeurs track your flight and meet you at arrivals. Prices start from £280 for an executive minibus. Would you like to get a quote?";
  }

  // Pricing / cost / how much
  if (/\b(price|pricing|cost|how much|rates?|quote|estimate)\b/.test(text)) {
    return "Here are our starting estimates: Executive minibus (up to 8) from £280/day · Executive coach (up to 23) from £640/day · Standard coach (up to 53) from £960/day · Double decker (up to 79) from £1,450/day · Rolls-Royce Phantom from £1,200/day. For an exact quote, visit our quote page or call 020 7167 6648.";
  }

  // Fleet / vehicles
  if (/\b(fleet|vehicle|coach|bus|minibus|car|van)\b/.test(text)) {
    return "Our fleet includes executive minibuses (up to 8), boutique mini-coaches (up to 16), executive coaches (up to 23), standard coaches (up to 53), double deckers (up to 79), and luxury cars including the Rolls-Royce Phantom and Bentayga SUV. What size group are you travelling with?";
  }

  // Corporate
  if (/\b(corporate|business|company|roadshow|shuttle|staff)\b/.test(text)) {
    return "We provide tailored corporate travel solutions — from executive airport runs to full roadshow logistics and daily staff shuttles. Our vehicles are equipped with WiFi, climate control, and privacy glass. Call 020 7167 6648 to discuss a corporate account.";
  }

  // Tours / sightseeing
  if (/\b(tour|sightseeing|scotland|highlands|edinburgh|uk tour|europe)\b/.test(text)) {
    return "We offer private UK and European tours with experienced drivers who know the routes well. Popular itineraries include the Scottish Highlands, the Cotswolds, and London day trips. Prices depend on group size and duration — call 020 7167 6648 for a tailored itinerary.";
  }

  // Contact / phone / email
  if (/\b(contact|phone|call|email|reach|get in touch|number)\b/.test(text)) {
    return "You can reach us by phone on 020 7167 6648, WhatsApp on 07892 832617, or email at info@sjtcoaches.co.uk. Our team is happy to help with quotes, bookings, and any questions.";
  }

  // Booking
  if (/\b(book|booking|reserve|reservation|availability)\b/.test(text)) {
    return "To book, you can use our online quote form at /quote, call us on 020 7167 6648, or email info@sjtcoaches.co.uk. We'll confirm availability and send you a tailored quote within a few hours.";
  }

  // Default
  return "Thanks for your message! I can help with fleet options, pricing, bookings, airport transfers, weddings, corporate travel, and more. What would you like to know? Or feel free to call us on 020 7167 6648.";
}
