import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import faviconUrl from "@/assets/Logo/ICON.png?url";
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
      { property: "og:title", content: "SJT Coaches — Luxury Coach Hire" },
      { property: "og:description", content: "Premium chauffeured coach hire across London and the UK." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Platinum Coach Booking is a luxury coach hire website for UK-based companies." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/74307615-86f8-494a-b8bf-73cef7f64f8b/id-preview-d3eed12c--3f263d2d-07ce-40e4-ae55-3ac447b916e5.lovable.app-1777144302054.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/74307615-86f8-494a-b8bf-73cef7f64f8b/id-preview-d3eed12c--3f263d2d-07ce-40e4-ae55-3ac447b916e5.lovable.app-1777144302054.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: faviconUrl,
      },
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
