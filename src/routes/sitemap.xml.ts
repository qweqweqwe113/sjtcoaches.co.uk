import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://sjtcoaches.co.uk";
const TODAY = new Date().toISOString().split("T")[0];

const CITIES = [
  "belfast", "birmingham", "bradford", "bristol", "cardiff",
  "edinburgh", "glasgow", "leeds", "liverpool", "london",
  "manchester", "newcastle", "sheffield", "uk-inbound-tours", "other-locations",
];

const BLOG_SLUGS = [
  "choosing-right-coach-corporate-event",
  "airport-transfers-group-travel-guide",
  "luxury-coach-hire-vs-train-uk",
  "wedding-coach-hire-planning-tips",
  "uk-countryside-tours-by-coach",
  "school-trip-coach-hire-safety",
  "festival-season-coach-hire",
  "electric-coach-sustainable-travel",
  "chauffeur-etiquette-luxury-travel",
  "london-to-edinburgh-coach-guide",
];

function url(loc: string, priority: string, changefreq: string, lastmod = TODAY) {
  return `  <url>
    <loc>${BASE}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url("/", "1.0", "weekly")}
${url("/fleet", "0.9", "monthly")}
${url("/services", "0.9", "monthly")}
${url("/quote", "0.9", "weekly")}
${url("/contact", "0.8", "monthly")}
${url("/reviews", "0.7", "monthly")}
${url("/team", "0.6", "yearly")}
${url("/blog", "0.7", "weekly")}
${BLOG_SLUGS.map((s) => url(`/blog/${s}`, "0.6", "monthly")).join("\n")}
${CITIES.map((c) => url(`/hire/${c}`, "0.8", "monthly")).join("\n")}
${url("/privacy", "0.3", "yearly")}
${url("/terms", "0.3", "yearly")}
${url("/cookies", "0.3", "yearly")}
${url("/gdpr", "0.3", "yearly")}
${url("/conditions", "0.3", "yearly")}
</urlset>`;

export const Route = createFileRoute("/sitemap/xml")({
  loader: () => {
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
});
