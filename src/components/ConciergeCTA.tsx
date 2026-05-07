import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { toggleChatbot } from "./AIConcierge";
import iconUrl from "@/assets/Logo/ICON.png";

// WhatsApp SVG icon
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}

const PHONE = "02071676648";
const PHONE_DISPLAY = "0207 167 6648";
const WHATSAPP = "447892832617"; // confirmed number (removed extra digit)
const WHATSAPP_MSG = encodeURIComponent("Hi SJT Coaches, I'd like to enquire about a booking.");

export function ConciergeCTA() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Concierge panel — bottom LEFT — hidden */}
      <div className="hidden">
        {open && (
          <div className="bg-ink text-ivory shadow-2xl w-[280px] sm:w-[300px] p-6 border border-champagne/40">
            <div className="flex items-start justify-between">
              <div>
                <div className="eyebrow text-champagne text-[0.6rem]">SJT Coaches</div>
                <div className="font-display text-xl mt-2">At your service.</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-ivory/60 hover:text-ivory">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-ivory/70 text-xs leading-relaxed mt-3">
              Speak with our team — available every day.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 bg-champagne text-ink px-4 py-3 text-[0.7rem] tracking-[0.2em] uppercase hover:bg-ivory transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-ivory/30 px-4 py-3 text-[0.7rem] tracking-[0.2em] uppercase hover:bg-ivory hover:text-ink transition-colors"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </div>
          </div>
        )}

        {/* Concierge toggle button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Concierge"
          className="group flex items-center gap-3 bg-ink text-ivory pl-5 pr-6 py-4 shadow-2xl border border-champagne/40 hover:bg-midnight transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
          </span>
          <span className="text-[0.7rem] tracking-[0.25em] uppercase">Concierge</span>
        </button>
      </div>

      {/* Floating buttons — bottom RIGHT, one row */}
      <div
        className="fixed bottom-6 right-4 md:right-6 z-[9999] print:hidden flex flex-row items-center gap-3"
      >
        {/* WhatsApp floating button */}
        <a
          href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-2 ring-white hover:bg-[#1ebe5d] hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300"
        >
          <WhatsAppIcon />
        </a>

        {/* Phone floating button */}
        <a
          href="tel:02071676648"
          aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne-deep text-ivory shadow-2xl ring-2 ring-white hover:bg-champagne hover:scale-110 hover:shadow-[0_0_20px_rgba(200,169,106,0.5)] transition-all duration-300"
        >
          <Phone className="h-5 w-5" />
        </a>

        {/* AI Chatbot button */}
        <button
          onClick={toggleChatbot}
          aria-label="AI Concierge"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-midnight shadow-2xl ring-2 ring-white hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
        >
          <img src={iconUrl} alt="SJT" className="h-8 w-8 object-contain" />
        </button>
      </div>

      {/* Sticky tap-to-call bar — mobile only, bottom of screen */}
      <div className="fixed bottom-0 inset-x-0 z-[9998] md:hidden print:hidden">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-3 bg-champagne-deep text-ivory py-4 text-sm tracking-[0.2em] uppercase font-medium w-full"
        >
          <Phone className="h-4 w-4" />
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}
