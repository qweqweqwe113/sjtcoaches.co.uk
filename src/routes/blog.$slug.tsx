import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { getPost, posts } from "@/data/blog-posts";
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

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const img = POST_IMAGES[loaderData.slug] ?? journalProtocol;
    const canonicalUrl = `https://sjtcoaches.co.uk/blog/${loaderData.slug}`;
    return {
      meta: [
        { title: loaderData.title + " — SJT Coaches Journal" },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:image", content: `https://sjtcoaches.co.uk${img}` },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `https://sjtcoaches.co.uk${img}` },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: loaderData.title,
            description: loaderData.excerpt,
            image: `https://sjtcoaches.co.uk${img}`,
            datePublished: loaderData.date,
            dateModified: loaderData.date,
            author: {
              "@type": "Organization",
              name: "SJT Coaches",
              url: "https://sjtcoaches.co.uk",
            },
            publisher: {
              "@type": "Organization",
              name: "SJT Coaches",
              logo: {
                "@type": "ImageObject",
                url: "https://sjtcoaches.co.uk/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function renderBody(body: string) {
  return body.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="font-display text-2xl font-normal mt-12 mb-4 text-ink">
          {block.slice(3)}
        </h2>
      );
    }
    return (
      <p key={i} className="text-muted-foreground leading-relaxed">
        {block}
      </p>
    );
  });
}

function ArticlePage() {
  const post = Route.useLoaderData();
  const heroImg = POST_IMAGES[post.slug] ?? journalProtocol;
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 min-h-[55svh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/20" />
        <div className="container-luxe relative z-10 pb-16 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ivory/60 hover:text-champagne transition-colors mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Journal
          </Link>
          <div>
            <span className="eyebrow text-champagne">{post.category}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mt-4 font-normal leading-tight text-ivory">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-ivory/60">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-ivory/40" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20">
        <div className="container-luxe max-w-2xl">
          <div className="space-y-6">
            {renderBody(post.body)}
          </div>

          <div className="hairline mt-16 mb-12" />

          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-champagne-deep transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All articles
            </Link>
            <Link
              to="/quote"
              className="px-6 py-3 bg-champagne-deep text-midnight text-xs tracking-[0.2em] uppercase hover:bg-champagne transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      {/* More from the journal */}
      {otherPosts.length > 0 && (
        <section className="pb-24 border-t border-border">
          <div className="container-luxe max-w-5xl pt-16">
            <span className="eyebrow">More from the journal</span>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col border border-border hover:border-champagne-deep transition-colors overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={POST_IMAGES[p.slug] ?? journalProtocol}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs tracking-[0.15em] uppercase text-champagne-deep">{p.category}</span>
                    <h3 className="font-display text-lg font-normal mt-3 leading-snug group-hover:text-champagne-deep transition-colors flex-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-2 mt-5 text-xs tracking-[0.15em] uppercase text-champagne-deep">
                      Read
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
      <ConciergeCTA />
    </div>
  );
}
