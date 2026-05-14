import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, ShieldCheck, Clock, Award, Sparkles, Gauge, HeartHandshake, Building2, Plane, MapPinned, Sparkle, Wrench, BadgePoundSterling, Users, MapPin, Quote } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { SmartTripBuilder } from "@/components/SmartTripBuilder";
import heroCoach from "@/assets/hero-coach-light.jpg";
import fleetCoach from "@/assets/fleet-tourismo.jpg";
import fleetMinibus from "@/assets/fleet-phantom.jpg";
import fleetExecutive from "@/assets/fleet-double-decker.jpg";
import ukMap from "@/assets/uk-coverage-map.jpg";

import logoRollsRoyce from "@/assets/brands/rollsroyce.svg";
import logoFerrari from "@/assets/brands/ferrari.svg";
import logoBentley from "@/assets/brands/bentley.svg";
import logoAstonMartin from "@/assets/brands/astonmartin.svg";
import logoHermes from "@/assets/brands/hermes.svg";
import logoBritishAirways from "@/assets/brands/britishairways.svg";
import logoBmw from "@/assets/brands/bmw.svg";
import logoBugatti from "@/assets/brands/bugatti.svg";
import logoEmirates from "@/assets/brands/emirates.svg";
import logoHilton from "@/assets/brands/hilton.svg";
import logoLamborghini from "@/assets/brands/lamborghini.svg";
import logoLufthansa from "@/assets/brands/lufthansa.svg";
import logoMarriott from "@/assets/brands/marriott.svg";
import logoMaserati from "@/assets/brands/maserati.svg";
import logoMclaren from "@/assets/brands/mclaren.svg";
import logoPorsche from "@/assets/brands/porsche.svg";
import logoQatarAirways from "@/assets/brands/qatarairways.svg";
import logoRitzCarlton from "@/assets/brands/ritzcarlton.svg";
import logoTesla from "@/assets/brands/tesla.svg";
import logoVirginAtlantic from "@/assets/brands/virginatlantic.svg";

const trustBrands = [
  { name: "Rolls-Royce Motor Cars", logo: logoRollsRoyce },
  { name: "Bentley", logo: logoBentley },
  { name: "Ferrari", logo: logoFerrari },
  { name: "Aston Martin", logo: logoAstonMartin },
  { name: "Hermès", logo: logoHermes },
  { name: "British Airways", logo: logoBritishAirways },
  { name: "BMW", logo: logoBmw },
  { name: "Bugatti", logo: logoBugatti },
  { name: "Emirates", logo: logoEmirates },
  { name: "Hilton", logo: logoHilton },
  { name: "Lamborghini", logo: logoLamborghini },
  { name: "Lufthansa", logo: logoLufthansa },
  { name: "Marriott", logo: logoMarriott },
  { name: "Maserati", logo: logoMaserati },
  { name: "McLaren", logo: logoMclaren },
  { name: "Porsche", logo: logoPorsche },
  { name: "Qatar Airways", logo: logoQatarAirways },
  { name: "The Ritz-Carlton", logo: logoRitzCarlton },
  { name: "Tesla", logo: logoTesla },
  { name: "Virgin Atlantic", logo: logoVirginAtlantic },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SJT Coaches — Luxury Coach Hire London & UK" },
      {
        name: "description",
        content:
          "Travel without compromise. Premium chauffeured coach hire across London and the UK — smart trip builder, instant pricing, executive fleet, 24/7 concierge.",
      },
      { property: "og:title", content: "SJT Coaches — Luxury Coach Hire London & UK" },
      { property: "og:description", content: "Private coach charter meets precision ground transport. Build your journey in seconds." },
      { property: "og:image", content: "https://sjtcoaches.co.uk/og-image.jpg" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sjtcoaches.co.uk" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sjtcoaches.co.uk/og-image.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://sjtcoaches.co.uk/#organization",
              name: "SJT Coaches",
              url: "https://sjtcoaches.co.uk",
              logo: "https://sjtcoaches.co.uk/logo.png",
              telephone: "+442071676648",
              email: "info@sjtcoaches.co.uk",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kingcup Farm",
                addressLocality: "Denham",
                postalCode: "UB9 4HE",
                addressCountry: "GB",
              },
              sameAs: [
                "https://www.facebook.com/sjtcoaches",
                "https://www.instagram.com/sjtcoaches",
              ],
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://sjtcoaches.co.uk/#localbusiness",
              name: "SJT Coaches",
              description: "Premium chauffeured coach hire across London and the UK. Executive fleet, 24/7 concierge, instant pricing.",
              url: "https://sjtcoaches.co.uk",
              telephone: "+442071676648",
              email: "info@sjtcoaches.co.uk",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kingcup Farm",
                addressLocality: "Denham",
                postalCode: "UB9 4HE",
                addressCountry: "GB",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 51.5656,
                longitude: -0.5007,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              aggregateRating: undefined,
              priceRange: "£££",
              currenciesAccepted: "GBP",
              areaServed: {
                "@type": "Country",
                name: "United Kingdom",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://sjtcoaches.co.uk/#website",
              url: "https://sjtcoaches.co.uk",
              name: "SJT Coaches",
              publisher: { "@id": "https://sjtcoaches.co.uk/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://sjtcoaches.co.uk/hire/{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* 1 — HERO with embedded Smart Trip Builder */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <img
          src={heroCoach}
          alt="Luxury coach arriving at a Mayfair hotel at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Light wash overlay — keeps daylight feel, ensures legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/55 to-ivory/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-transparent to-transparent" />

        <div className="container-luxe relative z-10 pt-36 pb-12 md:pb-20 grid lg:grid-cols-12 gap-10 items-end">
          {/* Headline */}
          <div className="lg:col-span-6 text-ink">
            <div className="flex items-center gap-4 fade-up">
              <span className="gold-rule" />
              <span className="eyebrow">Private Coach Charter & Chauffeured Group Travel</span>
            </div>
            <h1 className="display-xl mt-6 fade-up fade-up-delay-1">
              Travel without<br />
              <span className="italic-accent">compromise.</span>
            </h1>
            <p className="mt-7 max-w-xl text-ink/75 text-lg leading-relaxed fade-up fade-up-delay-2">
              Luxury coach hire across London &amp; the United Kingdom — designed
              for comfort, precision, and prestige. Build your journey in
              seconds. No callbacks. No forms in triplicate.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 fade-up fade-up-delay-3">
              <Link
                to="/quote"
                className="group flex items-center gap-3 bg-ink text-ivory px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-midnight transition-colors"
              >
                Plan Your Journey
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/fleet"
                className="border border-ink/40 text-ink px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-ink hover:text-ivory transition-colors"
              >
                View Our Fleet
              </Link>
            </div>
          </div>

          {/* Smart Trip Builder — embedded in hero */}
          <div className="lg:col-span-6 fade-up fade-up-delay-3">
            <SmartTripBuilder variant="hero" />
          </div>
        </div>
      </section>


{/* 2 — TRUST MARQUEE */}

{/* 

      <section className="bg-ink text-ivory/40 py-6 overflow-hidden border-y border-ivory/10">
        <div className="flex marquee whitespace-nowrap gap-16 text-xs tracking-[0.4em] uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16 items-center shrink-0">
              {["Chanel", "Rolls-Royce Motor Cars", "House of Lords", "Goldman Sachs", "The Royal Opera", "Ferrari", "Tatler", "Sotheby's"].map((b) => (
                <span key={b}>{b}</span>
              ))}
              <span className="text-champagne">✦</span>
            </div>
          ))}
        </div>
      </section>

*/}
      

      <section className="bg-ivory text-ink/70 py-2 overflow-hidden border-y border-ink/10">
        <div className="flex marquee whitespace-nowrap gap-16 items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-16 items-center shrink-0" aria-hidden={i > 0}>
              {trustBrands.map((b) => (
                <img
                  key={b.name}
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  className="h-9 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
              <span className="text-champagne-deep px-4">✦</span>
            </div>
          ))}
        </div>
      </section>



      {/* 2.5 — WELCOME / INTRO */}
      <section className="py-24 md:py-24 bg-background">
        <div className="container-luxe grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 fade-up">
              <span className="gold-rule" />
              <span className="eyebrow">Welcome</span>
            </div>
            <h2 className="display-md mt-6 leading-tight">
              The premier private<br />
              coach charter company<br />
              in the <span className="italic-accent">United Kingdom.</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {[
                { icon: Sparkle, label: "Clean" },
                { icon: ShieldCheck, label: "Safe" },
                { icon: Clock, label: "On time" },
              ].map((p) => (
                <span key={p.label} className="inline-flex items-center gap-2 border border-champagne-deep/40 px-4 py-2 text-[0.65rem] tracking-[0.3em] uppercase text-ink/75">
                  <p.icon className="h-3.5 w-3.5 text-champagne-deep" strokeWidth={1.4} />
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-ink/75 leading-relaxed">
            <p>
              An outstanding reputation for friendly, professional group
              transportation services at competitive rates — SJT Coaches is
              renowned for its ability to deliver superior coach hire and
              transport management with a particular focus on safety and
              comfort, giving you complete peace of mind.
            </p>
            <p>
              Through years of experience we have come to understand that
              what matters most to our clients is cleanliness, punctuality,
              competitive rates and a friendly, professional service. Our
              business is built around these expectations to ensure our
              clients are delighted, every single time.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — FLEET SHOWCASE */}

      <section className="py-12 md:py-12 bg-background">
        <div className="container-luxe">
          <div className="flex flex-col items-center text-center gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">The Fleet</span>
              <h2 className="display-lg mt-4">
                Find the perfect vehicle for your <span className="italic-accent">journey</span>.
              </h2>
              <p className="text-muted-foreground mt-5">
                Every coach in our care is bespoke-specified, professionally
                detailed weekly, and retired at five years — never older.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <FleetCard
              img={fleetCoach}
              name="Setra Tourismo"
              capacity="49 — 53"
              tag="Touring"
              description="Germany's finest touring coach, specified to our exacting standards. Fully reclining leather seats with individual climate control, an onboard galley, and a dedicated luggage hold. The preferred choice for multi-day UK and European tours."
              features={["Reclining Leather", "Onboard Galley", "Climate Control", "WiFi", "Entertainment"]}
            />
            <FleetCard
              img={fleetMinibus}
              name="Rolls-Royce Phantom"
              capacity="3 — 4"
              tag="Ultra Luxury"
              description="The pinnacle of private ground transport. Hand-crafted interior with starlight headliner, bespoke champagne cooler, and whisper-quiet ride. Reserved for VIP transfers, premieres, and occasions where only the extraordinary will do."
              features={["Starlight Roof", "Champagne Bar", "Privacy Glass", "WiFi", "Leather"]}
              bright
            />
            <FleetCard
              img={fleetExecutive}
              name="Executive Double Decker"
              capacity="60 — 80"
              tag="Grand Touring"
              description="Two levels of refined travel for large groups who refuse to compromise. The upper deck features panoramic windows and lounge-style seating, while the lower deck offers a private meeting area with conference table and presentation screen."
              features={["Panoramic Windows", "Conference Deck", "WiFi", "Galley Kitchen", "USB Power"]}
              bright
            />
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-3 bg-ink text-ivory px-10 py-4 text-sm tracking-[0.25em] uppercase hover:bg-champagne-deep transition-colors duration-300"
            >
              All Vehicles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 — WHY CHOOSE US */}
      <section className="py-24 md:py-24 bg-ink text-ivory">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow text-champagne">Why SJT Coaches</span>
              <h2 className="text-ivory mt-4 leading-tight" style={{fontFamily:"var(--font-display)", fontWeight:400, fontSize:"clamp(2.6rem, 4.5vw, 3.75rem)", letterSpacing:"-0.02em"}}>
                The standard,<br /><span className="italic-accent">quietly</span> set.
              </h2>
              <p className="text-ivory/65 mt-6 max-w-md leading-relaxed">
                Coach hire isn't usually thought of as luxury. We are working,
                deliberately, to change that — one journey at a time.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {[
                { icon: Sparkles, t: "Executive-Level Comfort", d: "Hand-stitched leather, ambient lighting, climate per row, and refreshments to your specification." },
                { icon: Gauge, t: "Precision & Reliability", d: "Every journey is tracked in real time, every mile — so your group arrives on time, every time." },
                { icon: HeartHandshake, t: "Tailored Travel Experience", d: "A dedicated journey manager from first call to final mile. Your preferences remembered, always." },
                { icon: ShieldCheck, t: "Trusted by Discerning Clients", d: "Corporate boards, embassies, royal households, private offices. Discretion is the floor, not the ceiling." },
              ].map((b) => (
                <div key={b.t} className="fade-up">
                  <b.icon className="h-7 w-7 text-champagne" strokeWidth={1.2} />
                  <div className="font-display text-2xl mt-5 text-ivory">{b.t}</div>
                  <div className="text-sm text-ivory/65 mt-3 leading-relaxed">{b.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — COVERAGE */}
      <section className="py-24 md:py-24 bg-background">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow">Coverage</span>
              <h2 className="mt-4 leading-tight" style={{fontFamily:"var(--font-display)", fontWeight:400, fontSize:"clamp(2.25rem, 4vw, 3.25rem)", letterSpacing:"-0.02em"}}>
                Covering London &amp;<br />
                <span className="italic-accent">nationwide</span> travel.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-md">
                From a Mayfair forecourt to the Highlands — one operator, one
                standard, end to end. Our owned fleet is positioned across the
                UK to ensure same-day mobilisation.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Building2, t: "London Coach Hire", d: "All 33 boroughs · 24/7" },
                  { icon: Plane, t: "Heathrow Transfers", d: "All terminals · meet & greet" },
                  { icon: MapPinned, t: "UK-Wide Travel", d: "England · Scotland · Wales" },
                  { icon: ShieldCheck, t: "Multi-day Tours", d: "Crewed & curated" },
                ].map((c) => (
                  <Link
                    key={c.t}
                    to="/services"
                    className="group flex items-start gap-3 p-4 border border-border hover:border-champagne-deep transition-colors"
                  >
                    <c.icon className="h-5 w-5 text-champagne-deep mt-0.5" strokeWidth={1.4} />
                    <div>
                      <div className="font-display text-lg leading-tight">{c.t}</div>
                      <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative aspect-square max-w-xl mx-auto w-full">
              <img
                src={ukMap}
                alt="Map of the United Kingdom showing SJT Coaches service coverage"
                width={1280}
                height={1280}
                loading="lazy"
                className="w-full h-full object-contain"
              />
              {/* Decorative pin pulses */}
              <span className="absolute top-[64%] left-[44%] flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne-deep opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-champagne-deep" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — TESTIMONIALS */}
      <section className="py-12 md:py-18 bg-ink text-ivory">
        <div className="container-luxe">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow text-champagne">A Word From Our Guests</span>
            <h2 className="display-lg text-ivory mt-4 leading-tight">
              Trusted by those who <span className="italic-accent">notice</span> the details.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                q: "The benchmark for group travel in London. Quietly impeccable, from the first call to the final mile.",
                a: "Verified Client",
                r: "Corporate Travel · London",
              },
              {
                q: "Forty-eight executives. Six cities. Five days. SJT Coaches handled it as though it were a single transfer to Heathrow.",
                a: "Verified Client",
                r: "Corporate Event · UK",
              },
              {
                q: "Our wedding had ninety guests across three venues. SJT Coaches made the logistics invisible. That is the highest praise I can offer.",
                a: "Verified Client",
                r: "Wedding · United Kingdom",
              },
            ].map((t) => (
              <figure key={t.a} className="border border-ivory/15 p-8 flex flex-col bg-midnight/40">
                <div className="flex gap-1 text-champagne">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-xl leading-snug text-ivory mt-5 flex-1">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-ivory/10">
                  <div className="text-sm font-medium text-ivory">{t.a}</div>
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mt-1">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — HOW IT WORKS */}
      <section className="py-12 md:py-18 bg-background">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">How It Works</span>
            <h2 className="display-lg mt-4">
              Three steps. <span className="italic-accent">No friction.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* hairline connector */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
            {[
              { n: "01", t: "Plan Your Journey", d: "Tell us where, when, and who. Our smart builder recommends the right vehicle in seconds." },
              { n: "02", t: "Get Vehicle & Price", d: "See your match, live availability, route, and a transparent price range — instantly." },
              { n: "03", t: "Confirm Your Booking", d: "Lock it in online or with a concierge. Track your coach in real time on the day." },
            ].map((s) => (
              <div key={s.n} className="relative bg-background text-center px-4">
                <div className="inline-flex h-16 w-16 items-center justify-center border border-champagne-deep text-champagne-deep font-display text-2xl bg-background mx-auto">
                  {s.n}
                </div>
                <h3 className="font-display text-2xl mt-6">{s.t}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed max-w-xs mx-auto">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5 — WHY CHOOSE US (expanded) */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="display-lg mt-4">
              The difference is in the <span className="italic-accent">detail.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              {
                icon: MapPin,
                t: "Nationwide Coverage",
                d: "Drivers and vehicles at depots across the United Kingdom — transport for any number of passengers from any location.",
              },
              {
                icon: Users,
                t: "Modern Vehicles",
                d: "From 13-seat minibuses to 70-seat coaches in standard, executive and VIP classes — all kept to the highest standards.",
              },
              {
                icon: BadgePoundSterling,
                t: "Competitive Rates",
                d: "Great service alongside economical pricing. Every trip is individually priced, and we are happy to match any reasonable competitor offer.",
              },
              {
                icon: Wrench,
                t: "Group Transport Management",
                d: "Beyond hire — we manage tours, large events, and contract work for private clients and multinational businesses alike.",
              },
            ].map((b) => (
              <div key={b.t} className="bg-background p-8 hover:bg-ivory transition-colors">
                <b.icon className="h-7 w-7 text-champagne-deep" strokeWidth={1.2} />
                <h3 className="font-display text-xl mt-5">{b.t}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.6 — FEATURED REVIEW */}
      <section className="py-12 md:py-12 bg-ivory">
        <div className="container-luxe max-w-4xl">
          <Quote className="h-7 w-7 text-champagne-deep mb-8" strokeWidth={1} />
          <blockquote className="font-display text-xl md:text-2xl leading-snug text-ink">
            "I recently used this coach service for an airport transfer and
            had quite a pleasant experience. The booking process was
            straightforward and efficient. The coach arrived on time and the
            driver was courteous and professional, making the journey smooth
            and stress-free — clean, comfortable, and exactly what you want
            after a long day."
          </blockquote>
          <div className="mt-10 flex items-center gap-6">
            <div className="h-px w-16 bg-champagne-deep" />
            <div>
              <div className="font-display text-lg text-ink">Graham Slaney</div>
              <div className="text-[0.65rem] tracking-[0.25em] uppercase text-ink/55 mt-1">
                Verified Guest · 19 Jan 2026
              </div>
            </div>
            <div className="ml-auto flex gap-1 text-champagne-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.7 — ABOUT / VALUES (long-form) */}
      <section className="py-12 md:py-12 bg-background">
        <div className="container-luxe grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <span className="eyebrow">About SJT Coaches</span>
            <h2 className="display-lg mt-4 leading-tight">
              Clean, safe coaches for hire across the <span className="italic-accent">United Kingdom.</span>
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              One of the UK's most trusted providers of private coaches for
              hire — operating 365 days a year, with vehicles available from
              depots across the country and pickups arranged in as little as
              a day's notice.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div>
              <h3 className="font-display text-2xl text-ink">Safety &amp; Comfort</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Every coach is strictly and regularly maintained and cleaned
                to the highest UK Ministry of Transport (VOSA) standards.
                Routine safety inspections, stringent protocols, and
                thoughtful onboard features ensure passengers travel warm,
                cosy, and at ease — every mile of the way.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink">Our Drivers</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                All drivers hold the legally required CPC (Driver Certificate
                of Professional Competence) qualification and are
                professionally trained in both driving and hospitality —
                polite, friendly, and helpful at all times.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink">Our Values</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Our experience has taught us that passengers value safety,
                punctuality, cleanliness, competitive rates, and a friendly
                professional service. Our business is built around those
                expectations — so we can be part of more memorable journeys
                in more lives.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {[
                "Charter Transport",
                "Long-term Contracts",
                "Transport Management",
                "Planning &amp; Delivery",
                "Live Monitoring &amp; Reporting",
                "Remote Deployment",
                "Risk Assessment",
                "Account Options",
              ].map((s) => (
                <div key={s} className="flex items-center gap-3 text-sm text-ink/75 border-b border-border pb-3">
                  <span className="text-champagne-deep">✦</span>
                  <span dangerouslySetInnerHTML={{ __html: s }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 — FINAL CTA */}

      <section className="relative py-12 md:py-18 bg-ivory overflow-hidden">
        <div className="absolute inset-0 noise" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-deep to-transparent" />
        <div className="container-luxe relative z-10 text-center text-ink">
          <span className="eyebrow text-champagne-deep">Begin</span>
          <h2 className="display-lg text-ink mt-6 max-w-3xl mx-auto leading-[1]">
            Your journey <span className="italic-accent">starts here.</span>
          </h2>
          <p className="text-ink/70 mt-6 max-w-xl mx-auto">
            Build a journey in 30 seconds, or speak with a concierge in Mayfair —
            twenty-four hours a day, every day of the year.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/quote"
              className="group inline-flex items-center gap-3 gold-gradient text-ink px-9 py-5 text-xs tracking-[0.3em] uppercase hover:brightness-105 transition-all shadow-luxe"
            >
              Get Instant Quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[0.65rem] tracking-[0.25em] uppercase text-ink/55">
            <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-champagne-deep" /> DVSA Licenced</span>
            <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-champagne-deep" /> ISO 9001:2015</span>
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-champagne-deep" /> 24 / 7 Concierge</span>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ConciergeCTA />
    </div>
  );
}

function FleetCard({
  img,
  name,
  capacity,
  tag,
  features,
  description,
  bright = false,
}: {
  img: string;
  name: string;
  capacity: string;
  tag: string;
  features: string[];
  description: string;
  bright?: boolean;
}) {
  return (
    <article className="group bg-card border border-border overflow-hidden flex flex-col hover:border-champagne-deep transition-all duration-500 hover:shadow-luxe">
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={img}
          alt={name}
          loading="lazy"
          style={bright ? { filter: "brightness(1.35) contrast(0.9) saturate(0.85)" } : undefined}
          className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
        />
      </div>
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-champagne-deep">{tag}</span>
          <span className="text-xs text-muted-foreground">{capacity} guests</span>
        </div>
        <h3 className="font-display text-2xl mt-3">{name}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span key={f} className="text-[0.65rem] tracking-[0.15em] uppercase px-2 py-1 bg-secondary text-ink/70">
              {f}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
