import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { ConciergeAssistant } from "@/components/ConciergeAssistant";
import { MultiStopBuilder } from "@/components/MultiStopBuilder";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Concierge Booking — SJT Coaches" },
      { name: "description", content: "A guided, intelligent booking experience for luxury coach hire. Smart vehicle matching, live availability, visual journey planning, and adaptive transparent pricing." },
      { property: "og:title", content: "Concierge Booking — SJT Coaches" },
      { property: "og:description", content: "Booking a coach, reimagined — smart matching, live availability, real-time pricing." },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [tab, setTab] = useState<"multi" | "single">("multi");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-40 pb-8">
        <div className="container-luxe max-w-3xl text-center">
          <span className="eyebrow">Booking</span>
          <h1 className="display-lg mt-6 fade-up">
            Plan your <span className="italic-accent">journey</span>.
          </h1>
          <p className="mt-6 text-muted-foreground text-lg fade-up fade-up-delay-1">
            Single trip or complex multi-stop itinerary — build it here and
            we'll come back to you within the hour.
          </p>
        </div>
      </section>

      {/* Tab switcher — Multi-stop FIRST */}
      <section className="pb-4">
        <div className="container-luxe max-w-5xl">
          <div className="flex border-2 border-ink">
            {/* Multi-stop — first, prominent */}
            <button
              onClick={() => setTab("multi")}
              className={`flex-1 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-colors ${
                tab === "multi"
                  ? "bg-ink text-ivory"
                  : "bg-white text-ink hover:bg-ink/5"
              }`}
            >
              Multi-Drop / Multi-Day
              <span className="block text-[0.6rem] font-normal tracking-[0.15em] mt-0.5 opacity-70">
                Multiple stops · return journeys · multi-day
              </span>
            </button>
            {/* Single journey — second */}
            <button
              onClick={() => setTab("single")}
              className={`flex-1 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-colors border-l-2 border-ink ${
                tab === "single"
                  ? "bg-ink text-ivory"
                  : "bg-white text-ink hover:bg-ink/5"
              }`}
            >
              Single Journey
              <span className="block text-[0.6rem] font-normal tracking-[0.15em] mt-0.5 opacity-70">
                One pickup · one destination
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-luxe max-w-5xl">
          {tab === "multi" ? (
            <MultiStopBuilder />
          ) : (
            <ConciergeAssistant variant="page" />
          )}
        </div>
      </section>

      <SiteFooter />
      <ConciergeCTA />
    </div>
  );
}
