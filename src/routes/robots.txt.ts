import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots/txt")({
  loader: () => {
    return new Response(
      `User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://sjtcoaches.co.uk/sitemap.xml
`,
      {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "public, max-age=86400",
        },
      }
    );
  },
});
