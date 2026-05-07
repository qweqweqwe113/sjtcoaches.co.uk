import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ eyebrow, title, intro, updated, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <header className="bg-secondary border-b border-border">
        <div className="container-luxe pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="eyebrow text-champagne-deep mb-5">{eyebrow}</div>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 leading-relaxed">{intro}</p>
          <p className="mt-8 text-[0.65rem] tracking-[0.25em] uppercase text-ink/50">
            Last updated · {updated}
          </p>
        </div>
      </header>

      <main className="container-luxe py-10 md:py-14">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="eyebrow text-champagne-deep mb-5">Legal</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="hover:text-champagne-deep" activeProps={{ className: "text-champagne-deep font-medium" }}>Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-champagne-deep" activeProps={{ className: "text-champagne-deep font-medium" }}>Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-champagne-deep" activeProps={{ className: "text-champagne-deep font-medium" }}>Cookie Policy</Link></li>
              <li><Link to="/gdpr" className="hover:text-champagne-deep" activeProps={{ className: "text-champagne-deep font-medium" }}>GDPR</Link></li>
            </ul>
          </aside>

          <article className="md:col-span-9 prose-legal max-w-3xl">
            {children}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl md:text-3xl text-ink mb-4">{title}</h2>
      <div className="space-y-4 text-ink/75 leading-relaxed">{children}</div>
    </section>
  );
}
