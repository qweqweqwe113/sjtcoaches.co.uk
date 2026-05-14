import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConciergeCTA } from "@/components/ConciergeCTA";
import { getFleetDataFn } from "../server-fns/fleet.server";
import {
  ArrowRight,
  ArrowLeft,
  Wifi,
  Wine,
  Tv,
  Snowflake,
  Users,
  Briefcase,
  Plug,
  Coffee,
  Check,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import fleetExecutive from "@/assets/fleet-executive.jpg";
import fleetMinibus from "@/assets/fleet-minibus.jpg";
import fleetCoach from "@/assets/fleet-coach.jpg";
import fleetPhantom from "@/assets/fleet-phantom.jpg";
import fleetBentayga from "@/assets/fleet-bentayga.jpg";
import fleetDoubleDecker from "@/assets/fleet-double-decker.jpg";
import fleetTourismo from "@/assets/fleet-tourismo.jpg";
import fleetHero from "@/assets/fleet-hero.jpg";
import fleetElectric from "@/assets/fleet-electric.jpg";
import fleetShuttle from "@/assets/fleet-shuttle.jpg";
import fleetHeritage from "@/assets/fleet-heritage.jpg";
import fleetSleeper from "@/assets/fleet-sleeper.jpg";
import fleet49Seater from "@/assets/fleet-49-seater.png";
import fleet55Seater from "@/assets/fleet-55-seater.png";
import car1 from "@/assets/car1.jpg";
import car2 from "@/assets/car2.jpg";


export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "The Fleet — SJT Coaches" },
      {
        name: "description",
        content:
          "Explore our curated fleet of executive minibuses, luxury coaches and touring vehicles for hire across the UK.",
      },
      { property: "og:title", content: "The Fleet — SJT Coaches" },
      {
        property: "og:description",
        content: "A meticulously specified collection of luxury coaches and minibuses.",
      },
      { property: "og:image", content: fleetExecutive },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: fleetExecutive },
    ],
  }),
  component: FleetPage,
});

type Category = "Coaches" | "Buses" | "Minibuses" | "Luxury & Special";

type Vehicle = {
  id: string;
  img: string;
  tag: "Flagship" | "Executive" | "Touring" | "Saloon" | "Heritage";
  category: Category;
  name: string;
  model: string;
  capacity: string;
  capacityNum: number;
  range: string;
  features: string[];
  blurb: string;
  specs: { label: string; value: string }[];
  amenities: { wifi: boolean; refreshment: boolean; entertainment: boolean; lavatory: boolean; tables: boolean; usb: boolean };
};

const FLEET: Vehicle[] = [
  {
    id: "lumiere-electric",
    img: fleetElectric,
    tag: "Touring",
    category: "Coaches",
    name: "Lumière Electric",
    model: "Yutong TCe12 fully-electric coach",
    capacity: "44 — 49",
    capacityNum: 49,
    range: "From £880 / day",
    features: ["Zero-emission", "Whisper cabin", "USB-C at every seat", "Panoramic glazing"],
    blurb:
      "A fully-electric touring coach for low-emission zone events, brand activations and conscientious corporate travel — silent, smooth, uncompromised.",
    specs: [
      { label: "Length", value: "12.0 m" },
      { label: "Range", value: "Up to 350 km / charge" },
      { label: "Trim", value: "Recycled wool & vegan leather" },
      { label: "Cabin noise", value: "39 dB at 70 mph" },
      { label: "Year", value: "2024 — current" },
      { label: "Service interval", value: "3 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: true, usb: true },
  },
  {
    id: "claridge-heritage",
    img: fleetHeritage,
    tag: "Heritage",
    category: "Buses",
    name: "Claridge Heritage",
    model: "Bedford OB restored coach",
    capacity: "20 — 26",
    capacityNum: 26,
    range: "From £1,100 / day",
    features: ["Period interior", "Polished brass", "Open driver cabin", "Wedding-ready"],
    blurb:
      "A meticulously restored 1950s Bedford coach for weddings, film productions and heritage celebrations — period charm with modern reliability.",
    specs: [
      { label: "Length", value: "8.2 m" },
      { label: "Luggage", value: "Light cabin cases" },
      { label: "Trim", value: "Burgundy leather & oak" },
      { label: "Cabin noise", value: "60 dB at 50 mph" },
      { label: "Year", value: "1956, restored 2022" },
      { label: "Service interval", value: "2 weeks" },
    ],
    amenities: { wifi: false, refreshment: true, entertainment: false, lavatory: false, tables: true, usb: false },
  },
  {
    id: "tourismo-midi",
    img: fleetTourismo,
    tag: "Executive",
    category: "Coaches",
    name: "Tourismo Midi",
    model: "Mercedes-Benz Tourismo K",
    capacity: "32 — 36",
    capacityNum: 36,
    range: "From £720 / day",
    features: ["Reclining leather", "Panoramic glazing", "Onboard host (opt.)", "USB at every seat"],
    blurb:
      "A mid-size luxury coach perfectly scaled for corporate retreats and wedding parties — generous legroom in a more agile footprint.",
    specs: [
      { label: "Length", value: "10.7 m" },
      { label: "Luggage", value: "7 m³ underfloor" },
      { label: "Trim", value: "Quilted graphite leather" },
      { label: "Cabin noise", value: "50 dB at 70 mph" },
      { label: "Year", value: "2023 — current" },
      { label: "Service interval", value: "3 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: true, usb: true },
  },
  {
    id: "phantom-saloon",
    img: fleetPhantom,
    tag: "Saloon",
    category: "Luxury & Special",
    name: "Phantom Noir",
    model: "Rolls-Royce Phantom Extended",
    capacity: "1 — 3",
    capacityNum: 3,
    range: "From £1,200 / day",
    features: ["Starlight headliner", "Lambswool rugs", "Whisper cabin", "Champagne cooler"],
    blurb:
      "The pinnacle of chauffeured travel. A Rolls-Royce Phantom Extended for executive arrivals, weddings and discreet city moves.",
    specs: [
      { label: "Length", value: "5.99 m" },
      { label: "Luggage", value: "3 cabin cases" },
      { label: "Trim", value: "Seashell hide & piano black" },
      { label: "Cabin noise", value: "38 dB at 70 mph" },
      { label: "Year", value: "2024 — current" },
      { label: "Service interval", value: "2 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: false, tables: false, usb: true },
  },
  {
    id: "highland-sleeper",
    img: fleetSleeper,
    tag: "Touring",
    category: "Coaches",
    name: "Highland Sleeper",
    model: "Volvo 9700 night-tour conversion",
    capacity: "18 — 22",
    capacityNum: 22,
    range: "From £1,380 / day",
    features: ["Fully-flat berths", "En-suite lavatory", "Galley kitchen", "Blackout curtains"],
    blurb:
      "A bespoke sleeper coach for multi-day Scottish and Lake District tours — flat berths, en-suite facilities and a galley for crewed catering.",
    specs: [
      { label: "Length", value: "12.6 m" },
      { label: "Berths", value: "22 fully-flat" },
      { label: "Trim", value: "Midnight wool & walnut" },
      { label: "Cabin noise", value: "47 dB at 70 mph" },
      { label: "Year", value: "2023 — current" },
      { label: "Service interval", value: "2 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: true, usb: true },
  },
  {
    id: "royal-suite",
    img: fleetExecutive,
    tag: "Flagship",
    category: "Minibuses",
    name: "Royal Suite",
    model: "Mercedes-Benz Sprinter, bespoke conversion",
    capacity: "19 — 23",
    capacityNum: 23,
    range: "From £640 / day",
    features: ["Captain's chairs", "Walnut tables", "Onboard galley", "Mood lighting"],
    blurb:
      "Our most-requested vehicle. A bespoke Mercedes Sprinter, hand-trimmed in cream Nappa leather with reclining captain seats and bookmatched walnut.",
    specs: [
      { label: "Length", value: "8.7 m" },
      { label: "Luggage", value: "Generous, dedicated hold" },
      { label: "Trim", value: "Cream Nappa leather" },
      { label: "Cabin noise", value: "48 dB at 70 mph" },
      { label: "Year", value: "2023 — current" },
      { label: "Service interval", value: "4 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: false, tables: true, usb: true },
  },
  {
    id: "concorde-shuttle",
    img: fleetShuttle,
    tag: "Executive",
    category: "Minibuses",
    name: "Concorde Shuttle",
    model: "Mercedes-Benz Sprinter 16-seat",
    capacity: "12 — 16",
    capacityNum: 16,
    range: "From £360 / day",
    features: ["Meet & greet", "Garment rail", "Reading lights", "Onboard Wi-Fi"],
    blurb:
      "Our executive shuttle. Configured for FBO transfers and small executive groups, with garment rails and dedicated luggage hold.",
    specs: [
      { label: "Length", value: "7.4 m" },
      { label: "Luggage", value: "16 cabin cases" },
      { label: "Trim", value: "Black Nappa leather" },
      { label: "Cabin noise", value: "46 dB at 70 mph" },
      { label: "Year", value: "2024 — current" },
      { label: "Service interval", value: "4 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: false, lavatory: false, tables: false, usb: true },
  },
  {
    id: "double-decker-thames",
    img: fleetDoubleDecker,
    tag: "Heritage",
    category: "Buses",
    name: "Thames Double-Decker",
    model: "Van Hool TDX27 Astromega",
    capacity: "70 — 79",
    capacityNum: 79,
    range: "From £1,450 / day",
    features: ["Panoramic upper deck", "Two lavatories", "Galley & bar", "Tour-guide PA"],
    blurb:
      "Our flagship touring vehicle. A double-deck Van Hool Astromega for large-party transfers, brand activations and city sightseeing in unmistakable style.",
    specs: [
      { label: "Length", value: "13.99 m" },
      { label: "Luggage", value: "13 m³ underfloor" },
      { label: "Trim", value: "Charcoal leather & oak veneer" },
      { label: "Cabin noise", value: "53 dB at 70 mph" },
      { label: "Year", value: "2022 — current" },
      { label: "Service interval", value: "2 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: true, usb: true },
  },
  {
    id: "bentayga-suv",
    img: fleetBentayga,
    tag: "Saloon",
    category: "Luxury & Special",
    name: "Bentayga Estate",
    model: "Bentley Bentayga EWB",
    capacity: "1 — 4",
    capacityNum: 4,
    range: "From £780 / day",
    features: ["Mulliner trim", "Naim audio", "Rotating display", "Heated rear seats"],
    blurb:
      "All-terrain capability without compromise. The Bentayga EWB excels for country house weekends, shooting parties and discreet rural transfers.",
    specs: [
      { label: "Length", value: "5.32 m" },
      { label: "Luggage", value: "5 cabin cases" },
      { label: "Trim", value: "Beluga hide & open-pore walnut" },
      { label: "Cabin noise", value: "41 dB at 70 mph" },
      { label: "Year", value: "2024 — current" },
      { label: "Service interval", value: "3 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: false, tables: false, usb: true },
  },
  {
    id: "setra-touring",
    img: fleetCoach,
    tag: "Touring",
    category: "Coaches",
    name: "Setra ComfortClass",
    model: "Setra S 516 HDH",
    capacity: "49 — 53",
    capacityNum: 53,
    range: "From £960 / day",
    features: ["Toilet & galley", "PA & USB at every seat", "Generous luggage", "Driver second"],
    blurb:
      "The Setra S 516 HDH — the gold standard for full-size luxury touring across the UK and Europe.",
    specs: [
      { label: "Length", value: "13.9 m" },
      { label: "Luggage", value: "11.5 m³ underfloor" },
      { label: "Trim", value: "Anthracite cloth & leather" },
      { label: "Cabin noise", value: "52 dB at 70 mph" },
      { label: "Year", value: "2022 — current" },
      { label: "Service interval", value: "2 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: false, usb: true },
  },
  {
    id: "coach-49-seater",
    img: fleet49Seater,
    tag: "Touring",
    category: "Coaches",
    name: "Executive 49 Seater",
    model: "49-seat executive coach",
    capacity: "49",
    capacityNum: 49,
    range: "From £880 / day",
    features: ["Reclining seats", "Onboard Wi-Fi", "USB at every seat", "Generous luggage hold"],
    blurb:
      "A premium 49-seat executive coach ideal for large group travel, corporate events, and long-distance tours across the UK.",
    specs: [
      { label: "Capacity", value: "49 passengers" },
      { label: "Luggage", value: "Underfloor hold" },
      { label: "Trim", value: "Executive cloth & leather" },
      { label: "Year", value: "Current fleet" },
      { label: "Service interval", value: "3 weeks" },
      { label: "Climate", value: "Full air conditioning" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: false, usb: true },
  },
  {
    id: "coach-55-seater",
    img: fleet55Seater,
    tag: "Touring",
    category: "Coaches",
    name: "Executive 55 Seater",
    model: "55-seat executive coach",
    capacity: "55",
    capacityNum: 55,
    range: "From £960 / day",
    features: ["Reclining seats", "Onboard Wi-Fi", "USB at every seat", "Toilet & galley"],
    blurb:
      "A spacious 55-seat executive coach for large groups, school trips, stadium transfers, and extended UK tours.",
    specs: [
      { label: "Capacity", value: "55 passengers" },
      { label: "Luggage", value: "Underfloor hold" },
      { label: "Trim", value: "Executive cloth & leather" },
      { label: "Year", value: "Current fleet" },
      { label: "Service interval", value: "3 weeks" },
      { label: "Climate", value: "Full air conditioning" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: true, lavatory: true, tables: false, usb: true },
  },
  {
    id: "v-class-prive",
    img: fleetMinibus,
    tag: "Executive",
    category: "Minibuses",
    name: "V-Class Privé",
    model: "Mercedes-Benz V-Class long-wheelbase",
    capacity: "6 — 8",
    capacityNum: 8,
    range: "From £280 / day",
    features: ["Privacy glass", "Champagne bar", "Wireless charging", "Climate zones"],
    blurb:
      "Mercedes V-Class long-wheelbase, configured as a private four-seat conference cabin or eight-seat lounge.",
    specs: [
      { label: "Length", value: "5.4 m" },
      { label: "Luggage", value: "6 cabin cases" },
      { label: "Trim", value: "Black Nappa leather" },
      { label: "Cabin noise", value: "44 dB at 70 mph" },
      { label: "Year", value: "2024 — current" },
      { label: "Service interval", value: "4 weeks" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: false, lavatory: false, tables: true, usb: true },
  },
  {
    id: "minibus-car1",
    img: car1,
    tag: "Executive",
    category: "Minibuses",
    name: "Executive Minibus I",
    model: "Executive minibus",
    capacity: "8 — 16",
    capacityNum: 16,
    range: "From £320 / day",
    features: ["Leather seating", "Onboard Wi-Fi", "USB charging", "Air conditioning"],
    blurb:
      "A versatile executive minibus for airport transfers, corporate travel, and private group hire across the UK.",
    specs: [
      { label: "Capacity", value: "Up to 16 passengers" },
      { label: "Luggage", value: "Dedicated hold" },
      { label: "Trim", value: "Executive leather" },
      { label: "Year", value: "Current fleet" },
      { label: "Service interval", value: "4 weeks" },
      { label: "Climate", value: "Full air conditioning" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: false, lavatory: false, tables: false, usb: true },
  },
  {
    id: "minibus-car2",
    img: car2,
    tag: "Executive",
    category: "Minibuses",
    name: "Executive Minibus II",
    model: "Executive minibus",
    capacity: "8 — 16",
    capacityNum: 16,
    range: "From £320 / day",
    features: ["Leather seating", "Onboard Wi-Fi", "USB charging", "Air conditioning"],
    blurb:
      "A premium executive minibus ideal for group transfers, events, and corporate shuttle services throughout the UK.",
    specs: [
      { label: "Capacity", value: "Up to 16 passengers" },
      { label: "Luggage", value: "Dedicated hold" },
      { label: "Trim", value: "Executive leather" },
      { label: "Year", value: "Current fleet" },
      { label: "Service interval", value: "4 weeks" },
      { label: "Climate", value: "Full air conditioning" },
    ],
    amenities: { wifi: true, refreshment: true, entertainment: false, lavatory: false, tables: false, usb: true },
  },
];

const AMENITIES = [
  { icon: Wifi, label: "Onboard Wi-Fi" },
  { icon: Wine, label: "Refreshment Service" },
  { icon: Tv, label: "Entertainment" },
  { icon: Snowflake, label: "Climate Control" },
  { icon: Plug, label: "USB at Every Seat" },
  { icon: Coffee, label: "Hot Drinks Bar" },
  { icon: Briefcase, label: "Dedicated Luggage" },
  { icon: Users, label: "Onboard Host (opt.)" },
];

function FleetPage() {
  const [fleetData, setFleetData] = useState<FleetVehicle[]>([]);
  const [fleet, setFleet] = useState<Vehicle[]>(FLEET);

  useEffect(() => {
    getFleetDataFn()
      .then((data) => {
        setFleetData(data);
        // Merge database data with hardcoded fleet
        const updatedFleet = FLEET.map(vehicle => {
          const dbVehicle = data.find(v => v.id === vehicle.id);
          if (dbVehicle) {
            return {
              ...vehicle,
              img: dbVehicle.img,
              range: dbVehicle.range,
            };
          }
          return vehicle;
        });
        setFleet(updatedFleet);
      })
      .catch(console.error);
  }, []);

  const filtered = fleet; // kept for comparison table below

  const CATEGORIES: { key: Category; label: string; description: string }[] = [
    { key: "Coaches", label: "Coaches", description: "44, 55 and 75-seater touring coaches for large groups across the UK and Europe." },
    { key: "Buses", label: "Buses", description: "Double decker buses and other large capacity vehicles for events and sightseeing." },
    { key: "Minibuses", label: "Minibuses", description: "Executive and standard minibuses for smaller groups and corporate transfers." },
    { key: "Luxury & Special", label: "Luxury & Special Vehicles", description: "Rolls-Royce Phantom and premium saloons for VIP transfers and special occasions." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative pt-32 pb-12 min-h-[48svh] flex items-center overflow-hidden">
        <img
          src={fleetHero}
          alt="The SJT Coaches fleet lined up at a grand private courtyard at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/55 to-ivory/85" />

        <div className="container-luxe relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">The Collection</span>
            <h1 className="display-lg mt-6 fade-up text-ink">
              Vehicles, <span className="italic-accent">obsessed over</span>.
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-ink/75 text-base fade-up fade-up-delay-1">
              Every coach is bespoke-specified to atelier standard, detailed weekly,
              and retired before its fifth birthday.
            </p>
          </div>
        </div>
      </section>

      <div className="hairline container-luxe" />

      <section className="py-8 md:py-12 bg-ivory/60">
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <p className="eyebrow text-champagne-deep mb-5">Our Collection</p>
          <h2 className="display-md text-ink leading-tight">
            Every vehicle, <span className="italic-accent">obsessed over</span>.
          </h2>
          <div className="mx-auto mt-6 mb-6 w-12 h-px bg-champagne-deep/50" />
          <p className="text-ink/70 leading-relaxed text-base">
            Every vehicle in the SJT Coaches fleet is bespoke-specified, hand-selected, and maintained to exacting
            standards. Whether you require an intimate saloon for a private transfer or a flagship touring coach
            for a large party, each journey is delivered with the same quiet precision.
          </p>
          <p className="mt-6 text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">
            Bespoke Specification · Weekly Detailing · Retired at Five Years · DBS-Checked Chauffeurs
          </p>

          {/* Category filter tabs */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((c) => (
              <a
                key={c.key}
                href={`#${c.key.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                className="text-[0.65rem] tracking-[0.25em] uppercase border border-ink/30 px-5 py-2.5 transition-colors hover:border-champagne-deep hover:text-champagne-deep"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category sections */}
      {CATEGORIES.map((cat) => {
        const vehicles = fleet.filter((v) => v.category === cat.key);
        if (vehicles.length === 0) return null;
        return (
          <section
            key={cat.key}
            id={cat.key.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}
            className="py-12 md:py-16 border-t border-border"
          >
            <div className="container-luxe">
              <div className="mb-8">
                <span className="eyebrow text-champagne-deep">{cat.label}</span>
                <h2 className="font-display text-3xl md:text-4xl mt-2 text-ink">{cat.label}</h2>
                <p className="text-muted-foreground mt-2 max-w-xl">{cat.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                  <article
                    key={v.id}
                    className="group bg-card border border-border flex flex-col hover:border-champagne-deep hover:shadow-luxe transition-all duration-500"
                  >
                    <div className="aspect-[5/4] bg-ivory overflow-hidden">
                      <img
                        src={v.img}
                        alt={v.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-champagne-deep">{v.tag}</span>
                        <span className="text-xs text-muted-foreground">{v.capacity} guests</span>
                      </div>
                      <h2 className="font-display text-2xl mt-3 leading-tight">{v.name}</h2>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{v.blurb}</p>
                      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                        <span className="font-display text-base text-ink">{v.range}</span>
                        <SpecDialog vehicle={v} />
                      </div>
                      <Link
                        to="/quote"
                        className="mt-4 inline-flex items-center justify-center gap-3 bg-ink text-ivory px-5 py-3 text-[0.65rem] tracking-[0.25em] uppercase hover:bg-midnight transition-colors group/cta"
                      >
                        Quote this vehicle
                        <ArrowRight className="h-3 w-3 group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Comparison table */}
      <section className="py-24 bg-secondary">
        <div className="container-luxe">
          <div className="max-w-2xl mb-12 mx-auto text-center">
            <span className="eyebrow">Side by Side</span>
            <h2 className="display-lg mt-4">
              The fleet, <span className="italic-accent">compared</span>.
            </h2>
            <p className="text-muted-foreground mt-4">
              A clear view of capacity, amenity and use-case across the collection.
            </p>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-5 pr-6 font-normal text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="text-left py-5 px-4 font-normal text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                    Capacity
                  </th>
                  <th className="text-left py-5 px-4 font-normal text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                    From
                  </th>
                  {(
                    [
                      ["Onboard Wi-Fi", "wifi"],
                      ["Refreshment Service", "refreshment"],
                      ["Entertainment", "entertainment"],
                      ["Lavatory", "lavatory"],
                      ["Walnut Tables", "tables"],
                      ["USB at Every Seat", "usb"],
                    ] as const
                  ).map(([label]) => (
                    <th key={label} className="text-left py-5 px-4 font-normal text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fleet.map((v) => (
                  <tr key={v.id} className="border-b border-border/60">
                    <td className="py-4 pr-6 font-display text-base">
                      {v.name}
                    </td>
                    <td className="px-4 py-4 font-display text-lg">
                      {v.capacity}
                    </td>
                    <td className="px-4 py-4 font-display text-lg">
                      {v.range}
                    </td>
                    {(
                      [
                        ["Onboard Wi-Fi", "wifi"],
                        ["Refreshment Service", "refreshment"],
                        ["Entertainment", "entertainment"],
                        ["Lavatory", "lavatory"],
                        ["Walnut Tables", "tables"],
                        ["USB at Every Seat", "usb"],
                      ] as const
                    ).map(([, key]) => (
                      <td key={key} className="px-4 py-4">
                        {v.amenities[key] ? (
                          <Check className="h-4 w-4 text-champagne-deep" strokeWidth={1.5} />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.25} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-ink text-ivory">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow text-champagne">Standard Across The Fleet</span>
            <h2 className="display-md text-ivory mt-4">Comforts as a baseline.</h2>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
            {AMENITIES.map((a) => (
              <div key={a.label} className="text-center">
                <a.icon className="h-7 w-7 text-champagne mx-auto" strokeWidth={1.25} />
                <div className="mt-4 text-sm tracking-wider">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <ConciergeCTA />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="border-b border-border/60">
      <td className="py-4 pr-6 text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
        {label}
      </td>
      {children}
    </tr>
  );
}

function SpecDialog({ vehicle }: { vehicle: Vehicle }) {
  const [page, setPage] = useState<1 | 2>(1);
  return (
    <Dialog onOpenChange={(open) => { if (!open) setPage(1); }}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-ink/70 hover:text-champagne-deep border-b border-border hover:border-champagne-deep pb-0.5 transition-colors">
          Full spec
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-ivory border-champagne/20 p-0 overflow-hidden">
        <img src={vehicle.img} alt={vehicle.name} className="w-full h-40 object-cover" />
        <div className="p-5">
          <DialogHeader>
            <div className="eyebrow text-champagne-deep text-[0.6rem]">{vehicle.tag}</div>
            <DialogTitle className="font-display text-xl mt-1.5">{vehicle.name}</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground mt-1.5">{vehicle.model}</p>

          {page === 1 ? (
            <>
              <p className="text-sm text-ink/80 mt-4 leading-relaxed">{vehicle.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {vehicle.features.map((f) => (
                  <span
                    key={f}
                    className="text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 bg-secondary text-ink/70"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              {vehicle.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="font-display text-sm mt-0.5">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
            <span className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
              {page} / 2
            </span>
            <div className="flex items-center gap-2">
              {page === 2 && (
                <button
                  onClick={() => setPage(1)}
                  className="inline-flex items-center gap-2 border border-ink/30 px-3 py-2 text-[0.6rem] tracking-[0.2em] uppercase text-ink hover:border-champagne-deep hover:text-champagne-deep transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
              )}
              {page === 1 ? (
                <button
                  onClick={() => setPage(2)}
                  className="inline-flex items-center gap-2 bg-ink text-ivory px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase hover:bg-midnight transition-colors"
                >
                  Next <ArrowRight className="h-3 w-3" />
                </button>
              ) : (
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 bg-ink text-ivory px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase hover:bg-midnight transition-colors"
                >
                  Quote <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
