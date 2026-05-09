import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CookieConsent } from "@/components/CookieConsent";
import { AIConcierge } from "@/components/AIConcierge";
import { ComingSoon } from "@/components/ComingSoon";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SJT Coaches — Luxury Coach Hire London & UK" },
      { name: "description", content: "Premium chauffeured coach hire across London and the UK. Executive fleet, 24/7 concierge, instant pricing." },
      { name: "author", content: "SJT Coaches" },
      { property: "og:site_name", content: "SJT Coaches" },
      { property: "og:title", content: "SJT Coaches — Luxury Coach Hire London & UK" },
      { property: "og:description", content: "Premium chauffeured coach hire across London and the UK. Executive fleet, 24/7 concierge, instant pricing." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sjtcoaches.co.uk" },
      { property: "og:image", content: "https://sjtcoaches.co.uk/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SJTCoaches" },
      { name: "twitter:title", content: "SJT Coaches — Luxury Coach Hire London & UK" },
      { name: "twitter:description", content: "Premium chauffeured coach hire across London and the UK. Executive fleet, 24/7 concierge, instant pricing." },
      { name: "twitter:image", content: "https://sjtcoaches.co.uk/og-image.jpg" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0a0a0a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "canonical", href: "https://sjtcoaches.co.uk" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <ComingSoon />
      <Outlet />
      <CookieConsent />
      <AIConcierge />
    </>
  );
}
