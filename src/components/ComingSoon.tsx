import { useState, useEffect } from "react";
import logoUrl from "@/assets/Logo/Logo.png";
import busUrl from "@/assets/hero-coach-light.jpg";

const PHONE = "02071676648";
const PHONE_DISPLAY = "020 7167 6648";
const WHATSAPP = "447892832617";
const WHATSAPP_MSG = encodeURIComponent("Hi SJT Coaches, I'd like to enquire about a booking.");
const EMAIL = "info@sjtcoaches.co.uk";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ComingSoon() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden">

      {/* Background image — full bleed, slightly zoomed for depth */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${busUrl})`,
          transition: "transform 8s ease-out",
          transform: mounted ? "scale(1)" : "scale(1.08)",
        }}
        aria-hidden="true"
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" aria-hidden="true" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Centered layout — split design */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 flex flex-col lg:flex-row items-stretch min-h-0"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* LEFT — branding panel */}
        <div
          className="flex flex-col justify-between p-8 sm:p-12 lg:w-[55%]"
          style={{
            background: "rgba(6, 6, 6, 0.82)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(200,169,106,0.3)",
            borderLeft: "1px solid rgba(200,169,106,0.3)",
            borderBottom: "1px solid rgba(200,169,106,0.3)",
          }}
        >
          {/* Top — logo + badge */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <img src={logoUrl} alt="SJT Coaches" className="h-12 object-contain" />
              <div
                className="text-[0.55rem] tracking-[0.35em] uppercase px-3 py-1"
                style={{
                  border: "1px solid rgba(200,169,106,0.4)",
                  color: "#C8A96A",
                  letterSpacing: "0.3em",
                }}
              >
                Est. London
              </div>
            </div>

            {/* Thin gold rule */}
            <div className="w-8 h-px mb-8" style={{ backgroundColor: "#C8A96A" }} />

            {/* Main headline */}
            <h1
              className="text-white leading-[1.15] mb-5"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Something<br />
              <span style={{ fontStyle: "italic", color: "#C8A96A" }}>exceptional</span><br />
              is coming.
            </h1>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "340px" }}>
              We're crafting a new digital experience worthy of our fleet. Until then, our concierge team is available to take your booking personally.
            </p>

            {/* Services tags */}
            <div className="flex flex-wrap gap-2">
              {["Airport Transfers", "Weddings", "Corporate", "Private Tours"].map((tag) => (
                <span
                  key={tag}
                  className="text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom — enter site */}
          <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <button
              onClick={dismiss}
              className="group flex items-center gap-3 cursor-pointer transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              <span className="text-[0.65rem] tracking-[0.35em] uppercase">Preview the site</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT — contact panel */}
        <div
          className="flex flex-col justify-center p-8 sm:p-12 lg:w-[45%]"
          style={{
            background: "rgba(14, 12, 10, 0.90)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-[0.6rem] tracking-[0.35em] uppercase mb-6" style={{ color: "#C8A96A" }}>
            Reach us directly
          </div>

          <div className="flex flex-col gap-3">
            {/* Phone */}
            <a
              href={`tel:${PHONE}`}
              className="group flex items-center gap-4 p-4 transition-all duration-200"
              style={{ border: "1px solid rgba(200,169,106,0.2)", background: "rgba(200,169,106,0.04)" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(200,169,106,0.12)";
                e.currentTarget.style.borderColor = "rgba(200,169,106,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(200,169,106,0.04)";
                e.currentTarget.style.borderColor = "rgba(200,169,106,0.2)";
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ background: "rgba(200,169,106,0.15)", color: "#C8A96A" }}
              >
                <PhoneIcon />
              </div>
              <div className="min-w-0">
                <div className="text-[0.55rem] tracking-[0.25em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Call us</div>
                <div className="text-sm font-medium text-white">{PHONE_DISPLAY}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#C8A96A" }} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 transition-all duration-200"
              style={{ border: "1px solid rgba(37,211,102,0.2)", background: "rgba(37,211,102,0.04)" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(37,211,102,0.1)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.45)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(37,211,102,0.04)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.2)";
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ background: "rgba(37,211,102,0.15)", color: "#25D366" }}
              >
                <WhatsAppIcon />
              </div>
              <div className="min-w-0">
                <div className="text-[0.55rem] tracking-[0.25em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>WhatsApp</div>
                <div className="text-sm font-medium text-white">Message us instantly</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#25D366" }} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 p-4 transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
              >
                <EmailIcon />
              </div>
              <div className="min-w-0">
                <div className="text-[0.55rem] tracking-[0.25em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Email</div>
                <div className="text-sm font-medium text-white truncate">{EMAIL}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.5)" }} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Address */}
          <div
            className="mt-8 pt-6 flex items-start gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#C8A96A" }} aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
              Kingcup Farm, Denham<br />UB9 4HE, United Kingdom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
