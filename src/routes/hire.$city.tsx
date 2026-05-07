import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { ArrowRight, MapPin, Bus, ShieldCheck, Sparkles } from "lucide-react";
import {
  HIRE_CITY_LIST,
  HIRE_SERVICES,
  OPTIONAL_FEATURES,
  STANDARD_FEATURES,
  citySlug,
  getHireCity,
} from "@/data/hire-cities";

export const Route = createFileRoute("/hire/$city")({
  loader: ({ params }) => {
    const valid = HIRE_CITY_LIST.some((c) => citySlug(c) === params.city);
    if (!valid) throw notFound();
    return getHireCity(params.city);
  },
  head: ({ loaderData }) => {
    const city = loaderData;
    if (!city) return { meta: [] };
    return {
      meta: [
        { title: `Coach Hire ${city.name} — SJT Coaches` },
        {
          name: "description",
          content: `Private coach hire in ${city.name}. Standard, executive and VIP coaches from 8 to 71+ seats with professional drivers.`,
        },
        { property: "og:title", content: `Coach Hire ${city.name} — SJT Coaches` },
        { property: "og:description", content: city.tagline },
        { property: "og:image", content: city.hero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: city.hero },
      ],
    };
  },
  component: HireCityPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-ivory">
      <SiteHeader />
      <div className="container-luxe py-40 text-center">
        <h1 className="font-display text-4xl mb-4">Location not found</h1>
        <Link to="/" className="text-champagne-deep underline">
          Go home
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-ivory">
      <SiteHeader />
      <div className="container-luxe py-40 text-center">
        <h1 className="font-display text-3xl mb-4">Something went wrong</h1>
        <p className="text-foreground/70">{error.message}</p>
      </div>
      <SiteFooter />
    </div>
  ),
});

function HireCityPage() {
  const city = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={city.hero}
          alt={`${city.name} skyline`}
          width={1280}
          height={832}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/20 via-transparent to-midnight/70" />
        <div className="relative container-luxe h-full flex flex-col justify-end pb-16 text-ivory">
          <div className="eyebrow text-champagne-deep mb-4 flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            Coach Hire
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight max-w-4xl text-ivory">
            Coach Hire {city.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/80">{city.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-ivory">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <div className="eyebrow text-champagne-deep mb-4">About the service</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Hire from trusted {city.name} coach operators
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-4">{city.intro}</p>
            <p className="text-foreground/75 leading-relaxed">
              Each coach undergoes meticulous cleaning, sanitisation and maintenance to meet the
              stringent requirements set by the UK Ministry of Transport (VOSA). Drivers hold the
              Driver Certificate of Professional Competence (CPC) and receive regular refresher
              training.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border p-6">
              <ShieldCheck className="h-6 w-6 text-champagne-deep mb-3" />
              <div className="font-display text-2xl">VOSA</div>
              <p className="text-xs text-foreground/60 mt-1">Compliant fleet</p>
            </div>
            <div className="border border-border p-6">
              <Bus className="h-6 w-6 text-champagne-deep mb-3" />
              <div className="font-display text-2xl">8–71+</div>
              <p className="text-xs text-foreground/60 mt-1">Seat capacity</p>
            </div>
            <div className="border border-border p-6">
              <Sparkles className="h-6 w-6 text-champagne-deep mb-3" />
              <div className="font-display text-2xl">3 Grades</div>
              <p className="text-xs text-foreground/60 mt-1">Standard · Luxury · VIP</p>
            </div>
            <div className="border border-border p-6">
              <MapPin className="h-6 w-6 text-champagne-deep mb-3" />
              <div className="font-display text-2xl">24/7</div>
              <p className="text-xs text-foreground/60 mt-1">Concierge support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services / fleet options */}
      <section className="py-24 bg-midnight text-ivory">
        <div className="container-luxe">
          <div className="eyebrow text-champagne-deep mb-4">Our coaches for hire</div>
          <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-3xl text-ivory">
            {city.name} fleet options
          </h2>

          <div className="grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {HIRE_SERVICES.map((s) => (
              <div key={s.name} className="bg-midnight p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-champagne-deep mb-2">
                  {s.capacity}
                </div>
                <div className="font-display text-xl">{s.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <div className="eyebrow text-champagne-deep mb-3">Every coach includes</div>
              <ul className="space-y-2">
                {STANDARD_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ivory/80">
                    <span className="mt-2 h-px w-4 bg-champagne-deep" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow text-champagne-deep mb-3">Available on request</div>
              <ul className="space-y-2">
                {OPTIONAL_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ivory/80">
                    <span className="mt-2 h-px w-4 bg-champagne-deep" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular places */}
      <section className="py-24 bg-ivory">
        <div className="container-luxe">
          <div className="eyebrow text-champagne-deep mb-4">Popular destinations</div>
          <h2 className="font-display text-4xl md:text-5xl mb-4 max-w-3xl">
            Places we travel to in {city.name}
          </h2>
          <p className="text-foreground/70 max-w-2xl mb-12">
            Below are popular locations where our coaches for hire have transported passengers over
            the years.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.places.map((p) => (
              <article key={p.name} className="border border-border p-6 hover:border-champagne-deep transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-4 w-4 text-champagne-deep mt-1 shrink-0" />
                  <h3 className="font-display text-xl">{p.name}</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">{p.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-ink text-ivory px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-midnight transition-colors"
            >
              Get an instant quote
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 border border-ink text-ink px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-ink hover:text-ivory transition-colors"
            >
              View full fleet
            </Link>
          </div>
        </div>
      </section>

      <ConciergeCTA />
      <SiteFooter />
    </div>
  );
}
