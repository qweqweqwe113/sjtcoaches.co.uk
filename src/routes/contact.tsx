import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import contactHero from "@/assets/contact-mayfair.jpg";
import { submitContactFn } from "../server-fns/contact.server";
import { SOCIALS } from "@/data/socials";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SJT Coaches" },
      { name: "description", content: "Contact SJT Coaches. Call 0207 167 6648, email info@sjtcoaches.co.uk or visit Kingcup Farm, Denham, UB9 4HE." },
      { property: "og:title", content: "Contact SJT Coaches" },
      { property: "og:description", content: "Speak with our Mayfair concierge — 24 hours a day." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Collect form values via refs-free controlled approach
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await submitContactFn({ data: { name, email, phone: phone || undefined, journeyDate: journeyDate || undefined, message } });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative pt-40 pb-16 min-h-[70svh] flex items-end overflow-hidden">
        <img
          src={contactHero}
          alt="A luxury chauffeured car waiting outside a Mayfair townhouse at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/70 to-ivory/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/80 via-transparent to-transparent" />
        <div className="container-luxe relative z-10 text-center">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="display-lg mt-6 max-w-3xl fade-up text-ink mx-auto">
            The concierge,
            <br />
            <span className="italic-accent">at your service</span>.
          </h1>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container-luxe text-center">
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Available 24 hours a day, 7 days a week. Whether you need an instant quote, 
            wish to discuss a bespoke itinerary, or require assistance with your journey — 
            our Mayfair-based team is here to help.
          </p>
        </div>
      </section>

      <section className="pl-12 pt-12 pb-24">
        <div className="container-luxe grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border p-8 md:p-12"
            >
              <h2 className="font-display text-3xl">Send a message</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Or use the live quote engine for an instant price estimate.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <Field label="Full name" required>
                  <input type="text" required maxLength={100} className="input-luxe" placeholder="John Smith"
                    value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field label="Email" required>
                  <input type="email" required maxLength={255} className="input-luxe" placeholder="john@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </Field>
                <Field label="Phone">
                  <input type="tel" maxLength={20} className="input-luxe" placeholder="+44 20 1234 5678"
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Field>
                <Field label="Date of journey">
                  <input type="date" className="input-luxe"
                    value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
                </Field>
              </div>

              <div className="mt-6">
                <Field label="How may we help?" required>
                  <textarea rows={5} required maxLength={1500} className="input-luxe resize-none"
                    placeholder="Tell us about your journey, group size and any preferences."
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                </Field>
              </div>

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <button type="submit" disabled={sent || loading}
                className="mt-8 bg-ink text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-midnight transition-colors disabled:opacity-50">
                {sent ? "Message received — thank you" : loading ? "Sending…" : "Send to concierge"}
              </button>
            </form>
          </div>

          <aside className="pl-12 pt-12 lg:col-span-4 space-y-10">
            <ContactItem
              icon={<Phone className="h-4 w-4" />}
              label="By Telephone"
              value="0207 167 6648"
              href="tel:02071676648"
              note="Available every day"
            />
            <ContactItem
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              value="07892 832617"
              href="https://wa.me/447892832617?text=Hi%20SJT%20Coaches%2C%20I%27d%20like%20to%20enquire%20about%20a%20booking."
              note="One-click message"
            />
            <ContactItem
              icon={<Mail className="h-4 w-4" />}
              label="By Email"
              value="info@sjtcoaches.co.uk"
              href="mailto:info@sjtcoaches.co.uk"
              note="We reply promptly"
            />
            <ContactItem
              icon={<MapPin className="h-4 w-4" />}
              label="Address"
              value="SJT Coaches"
              note="Kingcup Farm, Denham, UB9 4HE"
            />

            {/* Social media */}
            <div>
              <div className="eyebrow flex items-center gap-2 text-champagne-deep mb-4">Follow Us</div>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center border border-border text-ink/60 hover:border-champagne-deep hover:text-champagne-deep transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ink">
        <iframe
          title="SJT Coaches — Denham"
          src="https://www.google.com/maps?q=Kingcup+Farm,+Denham,+UB9+4HE&output=embed&z=15"
          width="100%"
          height="480"
          style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
          loading="lazy"
        />
      </section>

      <SiteFooter />
      <ConciergeCTA />

      <style>{`
        .input-luxe {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--color-border);
          padding: 0.65rem 0;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          color: var(--color-foreground);
        }
        .input-luxe:focus {
          border-bottom-color: var(--champagne-deep);
        }
      `}</style>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  const inner = (
    <div>
      <div className="eyebrow flex items-center gap-2 text-champagne-deep">
        {icon}
        {label}
      </div>
      <div className="font-display text-2xl mt-3">{value}</div>
      {note && <div className="text-xs text-muted-foreground mt-1 tracking-wide">{note}</div>}
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="eyebrow mb-2">
        {label}
        {required && <span className="text-champagne-deep ml-1">·</span>}
      </div>
      {children}
    </label>
  );
}
