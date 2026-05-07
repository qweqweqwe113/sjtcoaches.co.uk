import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pcb-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-zinc-800/95 backdrop-blur-xl shadow-2xl shadow-black/10">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400">
              <Cookie className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                We value your privacy
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                We use cookies to enhance your browsing experience, analyse traffic, and tailor our luxury service. By clicking
                &ldquo;Accept&rdquo;, you consent to our use of cookies.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => persist("rejected")}
              className="bg-zinc-200 text-zinc-900 hover:bg-zinc-100"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={() => persist("accepted")}
              className="bg-yellow-400 text-zinc-900 hover:bg-yellow-300"
            >
              Accept all
            </Button>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => persist("rejected")}
              className="ml-1 hidden h-8 w-8 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white sm:inline-flex"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
