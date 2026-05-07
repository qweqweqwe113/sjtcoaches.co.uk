import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/blog-posts";
import journalHighlands from "@/assets/journal-highlands.jpg";
import journalInteriors from "@/assets/journal-interiors.jpg";
import journalProtocol from "@/assets/journal-protocol.jpg";
import journalWedding from "@/assets/journal-wedding.jpg";
import fleetCoach from "@/assets/fleet-coach.jpg";
import serviceAirport from "@/assets/service-airport.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceEvents from "@/assets/service-events.jpg";
import fleetElectric from "@/assets/fleet-electric.jpg";
import fleetHeritage from "@/assets/fleet-heritage.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — SJT Coaches" },
      {
        name: "description",
        content:
          "Guides, perspectives and stories from the world of executive coach hire and group travel across the UK.",
      },
      { property: "og:title", content: "Journal — SJT Coaches" },
      {
        property: "og:description",
        content:
          "Guides, perspectives and stories from the world of executive coach hire.",
      },
      { property: "og:image", content: journalProtocol },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: journalProtocol },
    ],
  }),
  component: BlogPage,
});

// Map each post slug to a relevant image
const POST_IMAGES: Record<string, string> = {
  "choosing-right-coach-corporate-event": serviceCorporate,
  "airport-transfers-group-travel-guide": serviceAirport,
  "luxury-coach-hire-vs-train-uk": fleetCoach,
  "wedding-coach-hire-planning-tips": journalWedding,
  "uk-countryside-tours-by-coach": journalHighlands,
  "school-trip-coach-hire-safety": journalInteriors,
  "festival-season-coach-hire": serviceEvents,
  "electric-coach-sustainable-travel": fleetElectric,
  "chauffeur-etiquette-luxury-travel": journalProtocol,
  "london-to-edinburgh-coach-guide": fleetHeritage,
};

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-border">
        <img
          src={journalProtocol}
          alt="SJT Coaches Journal"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/60 to-ink/80" />
        <div className="container-luxe relative z-10 max-w-3xl text-center mx-auto">
          <span className="eyebrow text-champagne">The Journal</span>
          <h1 className="display-lg mt-6 fade-up text-ivory">
            Guides, perspectives &amp; <span className="italic-accent">stories</span>.
          </h1>
          <p className="mt-6 text-ivory/75 leading-relaxed max-w-xl mx-auto fade-up fade-up-delay-1">
            From corporate travel etiquette to countryside routes — everything worth
            knowing about executive coach hire across the UK.
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-card/30">
        <div className="container-luxe">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover insights from the world of luxury coach travel. Our journal features expert advice on corporate transportation, 
              travel etiquette, route planning, and the latest developments in executive group travel across the United Kingdom. 
              Whether you're planning a corporate event, wedding celebration, or countryside tour, find the knowledge you need to 
              make informed decisions about your journey.
            </p>
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <div className="container-luxe py-32 text-center text-muted-foreground">
          No articles in this category yet.
        </div>
      ) : (
        <section className="py-16">
          <div className="container-luxe grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col border border-border hover:border-champagne-deep transition-colors duration-300 overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={POST_IMAGES[post.slug]}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-xs tracking-[0.2em] uppercase text-champagne-deep">
                    {post.category}
                  </span>
                  <h3 className="font-display text-xl mt-3 leading-snug group-hover:text-champagne-deep transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span>{post.readTime}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-champagne-deep group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
      <ConciergeCTA />
    </div>
  );
}
