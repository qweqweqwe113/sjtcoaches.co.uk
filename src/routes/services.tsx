import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { ArrowRight, Plane, Building2, Heart, Mountain, Star, Quote } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import serviceAirport from "@/assets/service-airport.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceEvents from "@/assets/service-events.jpg";
import fleetCoach from "@/assets/fleet-coach.jpg";
import servicesHero from "@/assets/services-hero.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Luxury Coach Hire London | SJT Coaches" },
      {
        name: "description",
        content:
          "Airport transfers, corporate travel, weddings, sporting events and private tours. Premium chauffeured coaches across London and the UK.",
      },
      { property: "og:title", content: "Our Services — SJT Coaches" },
      {
        property: "og:description",
        content: "Airport transfers, corporate travel, weddings and private tours.",
      },
      { property: "og:image", content: serviceCorporate },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: serviceCorporate },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Plane,
    img: serviceAirport,
    title: "Airport Transfers",
    blurb:
      "Flight-tracked transfers to and from Heathrow, Gatwick, Luton, Stansted, City and Farnborough. Meet-and-greet at the gate, luggage handled.",
    bullets: ["Flight tracking included", "Meet & assist at arrivals", "Heathrow VIP lounge access available"],
  },
  {
    icon: Building2,
    img: serviceCorporate,
    title: "Corporate Travel",
    blurb:
      "From investor roadshows to all-hands offsites, we run discreet, account-managed transport for the City's most demanding clients.",
    bullets: ["Dedicated account manager", "Consolidated billing", "NDA-trained chauffeurs"],
  },
  {
    icon: Heart,
    img: serviceEvents,
    title: "Weddings & Events",
    blurb:
      "Curated guest movement that reflects the consideration of your day. Decorated coaches available, briefed chauffeurs, faultless logistics.",
    bullets: ["Wedding decoration optional", "Multi-vehicle choreography", "Late-night returns standard"],
  },
  {
    icon: Mountain,
    img: fleetCoach,
    title: "Private Tours & Touring",
    blurb:
      "Multi-day UK and European touring. Football clubs, music tours, school excursions and private estates trust our touring division.",
    bullets: ["UK & EU coverage", "Driver-rotation for long routes", "Itinerary planning included"],
  },
];

const ALL_SERVICES = [
  {
    id: "private-charter",
    title: "Private Charter Bus Hire",
    blurb:
      "Exclusive coach hire for private groups — clubs, societies, family events and bespoke occasions, with the whole vehicle reserved for you.",
  },
  {
    id: "day-trips",
    title: "Day Trips & Tours",
    blurb:
      "Curated day excursions across the UK. Leave the route planning, timings and rest stops to us and simply enjoy the journey.",
  },
  {
    id: "school",
    title: "School Coach Hire",
    blurb:
      "Safe, DBS-checked drivers and modern coaches for school trips, sports fixtures, university outings and educational tours.",
  },
  {
    id: "airport",
    title: "Airport Transfers",
    blurb:
      "Group transfers to and from Heathrow, Gatwick, Stansted, Luton and London City — flight-tracked, luggage handled, on time every time.",
  },
  {
    id: "corporate",
    title: "Corporate Coach Hire",
    blurb:
      "Discreet, account-managed transport for conferences, away-days, client roadshows and staff shuttles — invoiced to a single point of contact.",
  },
  {
    id: "wedding",
    title: "Wedding Coach Hire",
    blurb:
      "Move guests in style between ceremony, reception and hotels. Decorated coaches, multi-vehicle convoys and late-night returns as standard.",
  },
  {
    id: "minibus",
    title: "Minibus Hire",
    blurb:
      "Smaller groups, same standard. 8 to 24-seat minibuses with professional drivers for stag and hen parties, airport runs and city tours.",
  },
  {
    id: "wheelchair",
    title: "Wheelchair Accessible Coach Hire",
    blurb:
      "Step-free boarding, secure wheelchair restraints and trained drivers — inclusive group travel for clubs, charities and care providers.",
  },
  {
    id: "festival",
    title: "Festival Coach Hire",
    blurb:
      "Direct return services to UK festivals and major events. Skip the parking, the traffic and the post-festival drive home.",
  },
  {
    id: "funeral",
    title: "Funeral Coach Hire",
    blurb:
      "Respectful, considered transport for mourners between service, burial and wake. Smart vehicles, calm drivers, every detail handled.",
  },
];

const CASE_STUDIES = [
  {
    client: "House of a major fashion maison",
    brief: "Move 84 international press across three London locations during fashion week.",
    delivered: "Three Royal Suites + two Setras, choreographed to a 90-second tolerance.",
    outcome: "Zero late arrivals across 14 movements over four days.",
  },
  {
    client: "Wedding at a private Cotswold estate",
    brief: "Transport 220 guests from London hotels with a fixed ceremony curtain.",
    delivered: "Five-vehicle convoy, two departure windows, late-night returns staffed to 3 a.m.",
    outcome: "All guests arrived 25 minutes ahead of the ceremony. Two return windows ran to plan.",
  },
  {
    client: "Premier-League football club",
    brief: "Recurring weekly first-team movement to home and away fixtures.",
    delivered: "Dedicated Setra, two assigned chauffeurs, kit-room storage onboard.",
    outcome: "Three-year contract renewed twice. Zero schedule disruptions.",
  },
  {
    client: "Global investment bank, City of London",
    brief: "Shuttle 340 delegates between Canary Wharf and a Mayfair conference venue across two days.",
    delivered: "Four-vehicle rotation on a 20-minute headway, dedicated fleet manager on-site.",
    outcome: "Client extended the commission to a third day. Adopted as the bank's preferred ground operator.",
  },
  {
    client: "Five-star hotel group, Edinburgh",
    brief: "Highland whisky distillery tour for 48 VIP guests with a black-tie dinner return.",
    delivered: "Two Heritage coaches, licensed guide, pre-arranged distillery access and private dining liaison.",
    outcome: "Guests rated the ground experience 9.8 / 10. Commission repeated for the following two annual retreats.",
  },
  {
    client: "International film production, UK locations",
    brief: "Daily cast and crew movement across six counties over a 12-week shoot.",
    delivered: "Dedicated fleet of six vehicles, 24/7 standby driver pool, production-schedule integration.",
    outcome: "Not a single call-time missed across 58 shooting days. Production coordinator cited SJT Coaches in wrap report.",
  },
  {
    client: "Royal Warrant-holding retailer, Christmas campaign",
    brief: "VIP client transfers from Heathrow and private terminals to flagship Mayfair store events.",
    delivered: "Phantom and Bentayga paired with meet-and-greet concierge, luggage handling and in-vehicle gifting.",
    outcome: "100% of guests arrived within the welcome window. Retained for the following season without re-tender.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The most considered service we have ever commissioned. Our partners noticed every detail.",
    author: "Charlotte Vyner",
    role: "Director of Communications · A Mayfair Maison",
  },
  {
    quote:
      "They moved 220 wedding guests as if it were nothing. We did not see a single hiccup.",
    author: "James & Sophie Marsden",
    role: "Cotswolds, June 2024",
  },
  {
    quote:
      "Faultless. Our players sleep on these coaches — that tells you everything.",
    author: "Operations Director",
    role: "Premier League Football Club",
  },
];

const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "For weddings and multi-vehicle commissions we recommend at least eight weeks. For airport transfers and one-off corporate work, we can frequently accommodate next-day with our standby fleet.",
  },
  {
    q: "Do you operate outside London?",
    a: "Yes — extensively. We run regular work to Manchester, Edinburgh, the Cotswolds, Cornwall and across continental Europe. Our touring division specialises in multi-day commissions.",
  },
  {
    q: "Can the chauffeur be briefed for a confidential guest?",
    a: "Of course. Every SJT Coaches chauffeur signs an NDA on appointment and is trained at our protocol academy in discretion as a discipline. We never confirm a guest's presence to anyone, ever.",
  },
  {
    q: "Are the coaches insured for European routes?",
    a: "Fully. Our PSV insurance extends across the EU and EEA, and we hold the appropriate green-card cover. International touring is a routine part of our work.",
  },
  {
    q: "What if my flight is delayed?",
    a: "Every transfer includes complimentary flight tracking. Our chauffeur waits without additional charge for the first 60 minutes after landing, and we adjust live to your arrival.",
  },
  {
    q: "Can you accommodate accessibility requirements?",
    a: "Yes. Several vehicles in our fleet are equipped for step-free boarding and we can supply additional support staff on request. Please flag this with the concierge at booking.",
  },
];

function ServicesPage() {
  const { hash } = useLocation();
  const activeId = hash?.replace("#", "") ?? "";
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative min-h-[48vh] flex items-center pt-32 pb-16 overflow-hidden">
        <img
          src={servicesHero}
          alt="SJT Coaches chauffeur welcoming a guest at a London townhouse"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/70" />
        <div className="container-luxe relative z-10">
          <div className="max-w-3xl mx-auto text-center text-ivory">
            <span className="eyebrow text-champagne">What We Do</span>
            <h1 className="display-lg mt-6 fade-up text-ivory">
              Transport, <span className="italic-accent">tailored</span> to every occasion.
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-ivory/80 text-base fade-up fade-up-delay-1">
              Five disciplines, one standard. Each service is led by a specialist
              with at least a decade in luxury hospitality or executive transport.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-20">
        <div className="container-luxe max-w-3xl text-center mb-16">
          <span className="eyebrow">Our Disciplines</span>
          <h2 className="display-md mt-4">
            A <span className="italic-accent">complete</span> chauffeured coach service.
          </h2>
          <div className="hairline w-32 mx-auto mt-6" />
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Whether it's a single airport pickup or a multi-day European tour, every
            SJT Coaches journey is planned, briefed and delivered by a dedicated specialist.
            Our four core disciplines below cover the bulk of what we do — the full
            directory further down lists every kind of coach hire we operate, from
            weddings and school trips to festivals and corporate roadshows.
          </p>
          <p className="text-champagne-deep mt-5 text-xs tracking-[0.25em] uppercase">
            Modern Euro 6 fleet · DBS-checked chauffeurs · 24/7 concierge · Fully insured
          </p>
        </div>
        <div className="container-luxe grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article key={s.title} className="bg-card group overflow-hidden flex flex-col">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur text-ivory p-2">
                  <s.icon className="h-3.5 w-3.5 text-champagne" strokeWidth={1.25} />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-display text-xl">{s.title}</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{s.blurb}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-xs flex items-center gap-2">
                      <span className="h-px w-3 bg-champagne-deep" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/quote"
                  className="mt-6 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase border-b border-champagne-deep self-start pb-1 hover:border-ink"
                >
                  Quote <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full service directory */}
      <section className="py-12 md:py-12 bg-background border-t border-border/50">
        <div className="container-luxe">
          <div className="max-w-2xl mb-14 mx-auto text-center">
            <span className="eyebrow">Full Directory</span>
            <h2 className="display-lg mt-4">
              Every kind of <span className="italic-accent">coach hire</span>.
            </h2>
            <p className="text-muted-foreground mt-5">
              From private charters and school trips to weddings, festivals and
              funerals — one team, one standard, ten specialisms.
            </p>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-2">
            {ALL_SERVICES.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className={`bg-background p-8 md:p-10 scroll-mt-28 group transition-colors duration-300 ${
                  activeId === s.id ? "ring-2 ring-inset ring-champagne-deep bg-champagne-deep/5" : ""
                }`}
              >
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
                  {s.blurb}
                </p>
                <Link
                  to="/quote"
                  className="mt-6 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase border-b border-champagne-deep pb-1 hover:border-ink"
                >
                  Request a quote <ArrowRight className="h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-12 bg-background">
        <div className="container-luxe">
          <div className="max-w-2xl mb-16 mx-auto text-center">
            <span className="eyebrow">Case Studies</span>
            <h2 className="display-lg mt-4">
              Recent <span className="italic-accent">commissions</span>.
            </h2>
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map((c, i) => (
              <article
                key={i}
                className="grid lg:grid-cols-12 gap-8 border-t border-border pt-10"
              >
                <div className="lg:col-span-3">
                  <div className="font-display text-champagne-deep text-3xl">
                    0{i + 1}
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase mt-3 text-muted-foreground">
                    {c.client}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">
                    Brief
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{c.brief}</p>
                </div>
                <div className="lg:col-span-3">
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">
                    Delivered
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{c.delivered}</p>
                </div>
                <div className="lg:col-span-3">
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">
                    Outcome
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{c.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-ink text-ivory">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow text-champagne">From the Guest Book</span>
            <h2 className="display-md text-ivory mt-4">In the words of our clients.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="border border-ivory/15 p-8 flex flex-col">
                <Quote className="h-6 w-6 text-champagne" strokeWidth={1.25} />
                <blockquote className="mt-6 font-display text-xl leading-snug flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex gap-1 mt-6 text-champagne">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-4">
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50 mt-1">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-luxe grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow">Considered Answers</span>
            <h2 className="display-lg mt-4">
              Frequently <span className="italic-accent">asked</span>.
            </h2>
            <p className="text-muted-foreground mt-6">
              For anything unanswered, our concierge desk is open at every hour.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="font-display text-xl text-left hover:no-underline py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-8">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ConciergeCTA />
    </div>
  );
}
