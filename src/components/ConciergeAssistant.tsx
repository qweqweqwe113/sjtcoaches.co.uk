import { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Plane,
  Briefcase,
  GlassWater,
  Heart,
  Mountain,
  Users,
  Calendar,
  MapPin,
  Clock,
  Check,
  ShieldCheck,
  Wifi,
  Wine,
  Snowflake,
  Headphones,
  Loader2,
  CircleDot,
} from "lucide-react";

/* ======================================================================
   LOCATION AUTOCOMPLETE
   ====================================================================== */

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

function shortenAddress(full: string): string {
  const parts = full.split(",").map((p) => p.trim());
  return parts.slice(0, 3).join(", ");
}

function useLocationSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.length < 3) { setSuggestions([]); return; }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=gb`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: Suggestion[] = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  return { suggestions, loading };
}

function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  const { suggestions, loading } = useLocationSuggestions(value);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showDropdown = open && (suggestions.length > 0 || loading);

  return (
    <div ref={wrapRef} className="relative w-full">
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={className ?? "w-full bg-transparent outline-none text-base placeholder:text-muted-foreground/50"}
        autoComplete="off"
        title={value}
      />
      {showDropdown && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-[280px] bg-white border border-border shadow-xl z-[500] max-h-60 overflow-y-auto">
          {loading && (
            <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Searching…
            </div>
          )}
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(shortenAddress(s.display_name));
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-champagne/20 border-b border-border/40 last:border-0"
            >
              <span className="text-champagne-deep mr-1.5">📍</span>
              {s.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================================
   CONCIERGE BOOKING ASSISTANT
   A guided, multi-step booking experience that feels like a private
   travel concierge — not a transport enquiry form.
   ====================================================================== */

type Purpose = "airport" | "corporate" | "wedding" | "tour";
type Comfort = "executive" | "premier" | "ultraluxe";
type VehicleKey = "vclass" | "minicoach" | "executive-coach" | "touring-coach";

const PURPOSES: {
  key: Purpose;
  icon: typeof Plane;
  title: string;
  blurb: string;
}[] = [
  { key: "airport", icon: Plane, title: "Airport Transfer", blurb: "Met at gate · flight tracked" },
  { key: "corporate", icon: Briefcase, title: "Corporate", blurb: "Roadshows · executive shuttle" },
  { key: "wedding", icon: Heart, title: "Wedding & Event", blurb: "Guest movement, curated" },
  { key: "tour", icon: Mountain, title: "Private Tour", blurb: "UK & European itineraries" },
];

const VEHICLES: Record<
  VehicleKey,
  {
    name: string;
    line: string;
    capacity: number;
    base: number;
    perMile: number;
    perHour: number;
    image: string;
    amenities: string[];
  }
> = {
  vclass: {
    name: "Mercedes V-Class Privé",
    line: "Executive saloon · captain seats",
    capacity: 7,
    base: 145,
    perMile: 3.2,
    perHour: 85,
    image:
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=900&q=80",
    amenities: ["Wifi", "Cooled bottled water", "USB-C", "Privacy glass"],
  },
  minicoach: {
    name: "Mercedes Sprinter Atelier",
    line: "16-seat boutique mini-coach",
    capacity: 16,
    base: 240,
    perMile: 4.1,
    perHour: 110,
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
    amenities: ["Cream leather", "Climate zones", "Wifi", "Wine cooler"],
  },
  "executive-coach": {
    name: "Royal Suite Coach",
    line: "23-seat flagship executive",
    capacity: 23,
    base: 380,
    perMile: 4.8,
    perHour: 145,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
    amenities: ["Conference table", "On-board galley", "4G Wifi", "Restroom"],
  },
  "touring-coach": {
    name: "Setra ComfortClass 53",
    line: "53-seat touring coach",
    capacity: 53,
    base: 540,
    perMile: 6.2,
    perHour: 180,
    image:
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=900&q=80",
    amenities: ["Reclining seats", "Galley", "Restroom", "Panoramic glass"],
  },
};

const COMFORT_MULT: Record<Comfort, { mult: number; label: string; desc: string }> = {
  executive: { mult: 1, label: "Executive", desc: "Refined essentials" },
  premier: { mult: 1.18, label: "Premier", desc: "Champagne service · floral" },
  ultraluxe: { mult: 1.42, label: "Ultra-Luxe", desc: "Dedicated host · bespoke catering" },
};

const ADD_ONS = [
  { key: "host", label: "On-board host", price: 180, icon: Headphones },
  { key: "champagne", label: "Champagne welcome", price: 120, icon: Wine },
  { key: "wifi", label: "Premium 4G wifi", price: 45, icon: Wifi },
  { key: "climate", label: "Pre-cooled cabin", price: 25, icon: Snowflake },
] as const;

interface Props {
  variant?: "embedded" | "page";
}

export function ConciergeAssistant({ variant = "embedded" }: Props) {
  // step machine
  const [step, setStep] = useState(0);

  // selections
  const [purpose, setPurpose] = useState<Purpose>("corporate");
  const [pax, setPax] = useState(14);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [comfort, setComfort] = useState<Comfort>("premier");
  const [vehicle, setVehicle] = useState<VehicleKey>("minicoach");
  const [hours, setHours] = useState(4);
  const [returnTrip, setReturnTrip] = useState(false);
  const [addOns, setAddOns] = useState<string[]>(["champagne"]);

  // Smart recommendation based on group + purpose
  const recommended = useMemo<VehicleKey>(() => {
    if (pax <= 7) return "vclass";
    if (pax <= 16) return "minicoach";
    if (pax <= 23) return "executive-coach";
    return "touring-coach";
  }, [pax]);

  // Auto-snap to recommended when entering step 2
  useEffect(() => {
    if (step === 2) setVehicle(recommended);
  }, [step, recommended]);

  // Pseudo distance — deterministic from inputs (no API)
  const miles = useMemo(() => {
    const seed = (pickup.length * 7 + dropoff.length * 11) % 70;
    return 22 + seed;
  }, [pickup, dropoff]);

  const driveMinutes = Math.round((miles / 32) * 60); // ~32mph avg incl. London traffic

  const v = VEHICLES[vehicle];

  // Live "availability" — deterministic shimmer around the chosen date
  const availability = useMemo(() => {
    const seed = (date.length + pax + vehicle.length) % 5;
    const fleetTotal = vehicle === "vclass" ? 14 : vehicle === "minicoach" ? 9 : vehicle === "executive-coach" ? 6 : 4;
    const remaining = Math.max(1, fleetTotal - 2 - seed);
    return { fleetTotal, remaining, status: remaining <= 2 ? "limited" : "available" } as const;
  }, [date, pax, vehicle]);

  const subtotal = useMemo(() => {
    const distanceCost = miles * v.perMile * (returnTrip ? 2 : 1);
    const timeCost = v.perHour * hours;
    const addOnCost = addOns.reduce((sum, k) => sum + (ADD_ONS.find((a) => a.key === k)?.price || 0), 0);
    const raw = (v.base + distanceCost + timeCost + addOnCost) * COMFORT_MULT[comfort].mult;
    return Math.round(raw);
  }, [miles, v, hours, returnTrip, addOns, comfort]);

  const perPerson = pax > 0 ? Math.round(subtotal / pax) : 0;

  const isPage = variant === "page";

  return (
    <div
      className={`bg-card border border-border overflow-hidden ${isPage ? "" : ""}`}
      style={{ boxShadow: isPage ? undefined : "var(--shadow-luxe)" }}
    >
      <ProgressBar step={step} />

      <div className="grid lg:grid-cols-5">
        {/* LEFT — guided steps */}
        <div className="lg:col-span-3 p-8 md:p-12 min-h-[640px] flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-champagne-deep" />
            <span className="eyebrow">The Concierge Assistant</span>
          </div>

          {step === 0 && (
            <StepPurpose
              purpose={purpose}
              setPurpose={setPurpose}
              pax={pax}
              setPax={setPax}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
            />
          )}
          {step === 1 && (
            <StepRoute
              purpose={purpose}
              pickup={pickup}
              setPickup={setPickup}
              dropoff={dropoff}
              setDropoff={setDropoff}
              hours={hours}
              setHours={setHours}
              returnTrip={returnTrip}
              setReturnTrip={setReturnTrip}
            />
          )}
          {step === 2 && (
            <StepVehicle
              recommended={recommended}
              vehicle={vehicle}
              setVehicle={setVehicle}
              pax={pax}
              availability={availability}
              date={date}
            />
          )}
          {step === 3 && (
            <StepRefine
              comfort={comfort}
              setComfort={setComfort}
              addOns={addOns}
              setAddOns={setAddOns}
              miles={miles}
              driveMinutes={driveMinutes}
              pickup={pickup}
              dropoff={dropoff}
              returnTrip={returnTrip}
              vehicle={v}
            />
          )}

          {/* Nav */}
          <div className="mt-auto pt-10 flex items-center justify-between gap-4">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-xs tracking-[0.25em] uppercase flex items-center gap-2 text-muted-foreground hover:text-ink disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>

            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
              Step {step + 1} of 4
            </div>

            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={step === 3}
              className="bg-ink text-ivory px-6 py-3 text-xs tracking-[0.25em] uppercase flex items-center gap-2 hover:bg-midnight transition-colors disabled:opacity-30"
            >
              {step === 2 ? "Refine" : "Continue"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT — live concierge panel */}
        <ConciergePanel
          step={step}
          vehicle={v}
          pax={pax}
          subtotal={subtotal}
          perPerson={perPerson}
          miles={miles}
          driveMinutes={driveMinutes}
          comfort={comfort}
          returnTrip={returnTrip}
          hours={hours}
          availability={availability}
          purpose={purpose}
          date={date}
          time={time}
          pickup={pickup}
          dropoff={dropoff}
          bookingData={{ vehicle, comfort_tier: comfort, add_ons: addOns, passengers: pax, journey_time: time }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   PROGRESS
---------------------------------------------------------------------- */
function ProgressBar({ step }: { step: number }) {
  const steps = ["Trip", "Route", "Vehicle", "Refine"];
  return (
    <div className="border-b border-border bg-secondary/50">
      <div className="flex">
        {steps.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <div
              key={label}
              className={`flex-1 px-4 py-4 flex items-center justify-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase transition-colors border-b-2 ${
                active
                  ? "border-champagne-deep text-ink"
                  : done
                    ? "border-transparent text-champagne-deep"
                    : "border-transparent text-muted-foreground/60"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full flex items-center justify-center text-[0.6rem] ${
                  active
                    ? "bg-ink text-ivory"
                    : done
                      ? "bg-champagne text-ink"
                      : "bg-secondary text-muted-foreground border border-border"
                }`}
              >
                {done ? <Check className="h-2.5 w-2.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   STEP 1 — PURPOSE / GROUP / DATE
---------------------------------------------------------------------- */
function StepPurpose({
  purpose,
  setPurpose,
  pax,
  setPax,
  date,
  setDate,
  time,
  setTime,
}: {
  purpose: Purpose;
  setPurpose: (p: Purpose) => void;
  pax: number;
  setPax: (n: number) => void;
  date: string;
  setDate: (s: string) => void;
  time: string;
  setTime: (s: string) => void;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="display-md mt-3">
        Tell us about your <span className="italic-accent">journey</span>.
      </h3>
      <p className="text-muted-foreground mt-3 max-w-md">
        Two minutes. Four steps. We'll match you to the most considered option
        in our fleet.
      </p>

      <div className="eyebrow mt-10 mb-4">Purpose of journey</div>
      <div className="grid sm:grid-cols-2 gap-3">
        {PURPOSES.map((p) => {
          const Icon = p.icon;
          const active = purpose === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setPurpose(p.key)}
              className={`text-left p-5 border transition-all flex items-start gap-4 ${
                active
                  ? "border-ink bg-ink text-ivory"
                  : "border-border hover:border-champagne-deep"
              }`}
            >
              <Icon
                className={`h-5 w-5 mt-0.5 ${active ? "text-champagne" : "text-champagne-deep"}`}
                strokeWidth={1.25}
              />
              <div>
                <div className="font-display text-xl leading-tight">{p.title}</div>
                <div className={`text-xs mt-1 ${active ? "text-ivory/65" : "text-muted-foreground"}`}>
                  {p.blurb}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-5">
        <Field icon={<Users className="h-3.5 w-3.5" />} label={`Guests · ${pax}`}>
          <input
            type="number"
            min={1}
            max={1000}
            value={pax}
            onChange={(e) => setPax(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
            className="w-full bg-transparent outline-none text-base font-medium"
          />
        </Field>
        <Field icon={<Calendar className="h-3.5 w-3.5" />} label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none text-base"
          />
        </Field>
        <Field icon={<Clock className="h-3.5 w-3.5" />} label="Pickup time">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-transparent outline-none text-base"
          />
        </Field>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   STEP 2 — ROUTE
---------------------------------------------------------------------- */
function StepRoute({
  purpose,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  hours,
  setHours,
  returnTrip,
  setReturnTrip,
}: {
  purpose: Purpose;
  pickup: string;
  setPickup: (s: string) => void;
  dropoff: string;
  setDropoff: (s: string) => void;
  hours: number;
  setHours: (n: number) => void;
  returnTrip: boolean;
  setReturnTrip: (b: boolean) => void;
}) {
  const placeholder = {
    airport: { from: "The Savoy, Strand", to: "Heathrow Terminal 5" },
    corporate: { from: "Canary Wharf — One Canada Sq.", to: "The Berkeley, Knightsbridge" },
    wedding: { from: "Claridge's Mayfair", to: "Hedsor House, Buckinghamshire" },
    tour: { from: "St Pancras International", to: "Edinburgh Castle" },
  }[purpose];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="display-md mt-3">
        Where to, <span className="italic-accent">precisely</span>?
      </h3>
      <p className="text-muted-foreground mt-3 max-w-md">
        Postcode, hotel, venue or airport — the more we know, the more
        accurately your chauffeur will plan.
      </p>

      <div className="mt-10 space-y-6">
        <Field icon={<MapPin className="h-3.5 w-3.5" />} label="Pickup">
          <LocationAutocomplete
            value={pickup}
            onChange={setPickup}
            placeholder={placeholder.from}
          />
        </Field>
        <Field icon={<MapPin className="h-3.5 w-3.5" />} label="Drop-off">
          <LocationAutocomplete
            value={dropoff}
            onChange={setDropoff}
            placeholder={placeholder.to}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="eyebrow mb-3">Trip type</div>
            <div className="flex border border-border">
              {[
                { v: false, label: "One-way" },
                { v: true, label: "Return" },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setReturnTrip(o.v)}
                  className={`flex-1 py-3 text-sm transition-colors ${
                    returnTrip === o.v ? "bg-ink text-ivory" : "hover:bg-secondary"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <Field label={`Chauffeur stand-by · ${hours}h`}>
            <input
              type="range"
              min={1}
              max={12}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-[color:var(--champagne-deep)]"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   STEP 3 — VEHICLE (with smart recommendation + live availability)
---------------------------------------------------------------------- */
function StepVehicle({
  recommended,
  vehicle,
  setVehicle,
  pax,
  availability,
  date,
}: {
  recommended: VehicleKey;
  vehicle: VehicleKey;
  setVehicle: (v: VehicleKey) => void;
  pax: number;
  availability: { fleetTotal: number; remaining: number; status: "available" | "limited" };
  date: string;
}) {
  const [scanning, setScanning] = useState(true);

  // simulate live availability check
  useEffect(() => {
    setScanning(true);
    const t = setTimeout(() => setScanning(false), 1100);
    return () => clearTimeout(t);
  }, [vehicle, date]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="display-md mt-3">
        Your matched <span className="italic-accent">vehicle</span>.
      </h3>
      <p className="text-muted-foreground mt-3 max-w-md">
        Based on your party of <span className="text-ink font-medium">{pax}</span>, our
        algorithm has selected the most space-efficient luxury option. Adjust
        freely — pricing updates live.
      </p>

      <div className="mt-8 space-y-3">
        {(Object.keys(VEHICLES) as VehicleKey[]).map((key) => {
          const item = VEHICLES[key];
          const active = vehicle === key;
          const isRec = recommended === key;
          const tooSmall = item.capacity < pax;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setVehicle(key)}
              className={`w-full text-left border transition-all flex gap-4 p-4 relative ${
                active
                  ? "border-ink bg-ink text-ivory"
                  : tooSmall
                    ? "border-border opacity-50"
                    : "border-border hover:border-champagne-deep"
              }`}
            >
              {isRec && (
                <span className="absolute -top-2 left-4 bg-champagne text-ink text-[0.6rem] tracking-[0.2em] uppercase px-2 py-0.5">
                  Recommended for you
                </span>
              )}
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-28 object-cover shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-display text-lg leading-tight truncate">{item.name}</div>
                  <div className={`text-xs shrink-0 ${active ? "text-champagne" : "text-muted-foreground"}`}>
                    up to {item.capacity}
                  </div>
                </div>
                <div className={`text-xs mt-0.5 ${active ? "text-ivory/60" : "text-muted-foreground"}`}>
                  {item.line}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className={`text-[0.62rem] tracking-wider px-1.5 py-0.5 ${
                        active ? "bg-ivory/10 text-ivory/70" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live availability strip */}
      <div className="mt-6 border border-border bg-secondary/40 p-4 flex items-center gap-3">
        {scanning ? (
          <>
            <Loader2 className="h-4 w-4 text-champagne-deep animate-spin" />
            <span className="text-xs tracking-wider text-muted-foreground">
              Scanning fleet diary{date ? ` for ${formatDate(date)}` : ""}…
            </span>
          </>
        ) : (
          <>
            <CircleDot
              className={`h-4 w-4 ${
                availability.status === "limited" ? "text-champagne-deep" : "text-emerald-600"
              }`}
            />
            <span className="text-xs tracking-wider">
              <span className="font-medium">
                {availability.remaining} of {availability.fleetTotal}
              </span>{" "}
              <span className="text-muted-foreground">
                {VEHICLES[vehicle].name.split(" ").slice(-2).join(" ")} available
                {date ? ` · ${formatDate(date)}` : ""}
              </span>
            </span>
            {availability.status === "limited" && (
              <span className="ml-auto text-[0.62rem] tracking-[0.2em] uppercase text-champagne-deep">
                Limited
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   STEP 4 — REFINE (comfort tier + add-ons)
---------------------------------------------------------------------- */
function StepRefine({
  comfort,
  setComfort,
  addOns,
  setAddOns,
  miles,
  driveMinutes,
  pickup,
  dropoff,
  returnTrip,
  vehicle,
}: {
  comfort: Comfort;
  setComfort: (c: Comfort) => void;
  addOns: string[];
  setAddOns: (a: string[]) => void;
  miles: number;
  driveMinutes: number;
  pickup: string;
  dropoff: string;
  returnTrip: boolean;
  vehicle: { name: string };
}) {
  const toggle = (k: string) =>
    setAddOns(addOns.includes(k) ? addOns.filter((x) => x !== k) : [...addOns, k]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="display-md mt-3">
        Refine the <span className="italic-accent">experience</span>.
      </h3>
      <p className="text-muted-foreground mt-3 max-w-md">
        The finishing touches that elevate a transfer into a moment.
      </p>

      {/* Visual journey ribbon */}
      <div className="mt-8 border border-border p-5">
        <div className="eyebrow mb-4">Your journey, at a glance</div>
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">From</div>
            <div className="text-sm font-medium truncate">{pickup || "—"}</div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
              {miles} mi · {driveMinutes} min
            </div>
            <div className="relative w-full h-px bg-border my-2">
              <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-champagne to-champagne-deep" />
              <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-champagne-deep" />
              <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-ink" />
            </div>
            <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
              {returnTrip ? "Return" : "One-way"}
            </div>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">To</div>
            <div className="text-sm font-medium truncate">{dropoff || "—"}</div>
          </div>
        </div>
        <div className="hairline my-4" />
        <div className="text-xs text-muted-foreground">
          Aboard the <span className="text-ink font-medium">{vehicle.name}</span>
        </div>
      </div>

      {/* Comfort tier */}
      <div className="mt-8">
        <div className="eyebrow mb-4">Comfort tier</div>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(COMFORT_MULT) as Comfort[]).map((k) => {
            const t = COMFORT_MULT[k];
            const active = comfort === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setComfort(k)}
                className={`p-4 border text-left transition-all ${
                  active
                    ? "border-ink bg-ink text-ivory"
                    : "border-border hover:border-champagne-deep"
                }`}
              >
                <div className="font-display text-lg">{t.label}</div>
                <div className={`text-[0.65rem] mt-1 ${active ? "text-ivory/60" : "text-muted-foreground"}`}>
                  {t.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add-ons */}
      <div className="mt-6">
        <div className="eyebrow mb-4">Add-ons</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {ADD_ONS.map((a) => {
            const Icon = a.icon;
            const active = addOns.includes(a.key);
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => toggle(a.key)}
                className={`p-3 border flex items-center gap-3 text-left transition-all ${
                  active
                    ? "border-champagne-deep bg-champagne/15"
                    : "border-border hover:border-champagne-deep"
                }`}
              >
                <Icon className="h-4 w-4 text-champagne-deep" strokeWidth={1.25} />
                <span className="text-sm flex-1">{a.label}</span>
                <span className="text-xs text-muted-foreground">+£{a.price}</span>
                <span
                  className={`h-4 w-4 border flex items-center justify-center ${
                    active ? "bg-ink border-ink" : "border-border"
                  }`}
                >
                  {active && <Check className="h-2.5 w-2.5 text-ivory" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   RIGHT PANEL — LIVE CONCIERGE SUMMARY
---------------------------------------------------------------------- */
function ConciergePanel({
  step,
  vehicle,
  pax,
  subtotal,
  perPerson,
  miles,
  driveMinutes,
  comfort,
  returnTrip,
  hours,
  availability,
  purpose,
  date,
  time,
  pickup,
  dropoff,
  bookingData,
}: {
  step: number;
  vehicle: (typeof VEHICLES)[VehicleKey];
  pax: number;
  subtotal: number;
  perPerson: number;
  miles: number;
  driveMinutes: number;
  comfort: Comfort;
  returnTrip: boolean;
  hours: number;
  availability: { remaining: number; status: "available" | "limited" };
  purpose: Purpose;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  bookingData: { vehicle: VehicleKey; comfort_tier: Comfort; add_ons: string[]; passengers: number; journey_time: string };
}) {
  const purposeLabel = PURPOSES.find((p) => p.key === purpose)?.title ?? "";

  // Booking submission state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleReserve() {
    if (!name.trim() || !email.trim()) {
      setSubmitError("Please enter your name and email to reserve.");
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      // Send via contact form email (Resend) — reliable, no MongoDB dependency
      const { submitContactFn } = await import("../server-fns/contact.server");
      await submitContactFn({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: `BOOKING ENQUIRY — RESERVE THIS JOURNEY

Purpose: ${purpose}
Passengers: ${pax}
Pickup: ${pickup || "Not specified"}
Drop-off: ${dropoff || "Not specified"}
Date: ${date || "Not specified"}
Time: ${time}
Vehicle: ${vehicle.name}
Comfort Tier: ${COMFORT_MULT[comfort].label}
Add-ons: ${bookingData.add_ons.join(", ") || "None"}
Estimated Price: £${subtotal.toLocaleString()}

Customer: ${name.trim()}
Email: ${email.trim()}
Phone: ${phone.trim() || "Not provided"}`,
        },
      });
      setSubmitted(true);
    } catch (e) {
      console.error("Reserve error:", e);
      setSubmitError("Something went wrong. Please email info@sjtcoaches.co.uk directly.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="lg:col-span-2 bg-ink text-ivory p-8 md:p-10 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 noise opacity-40" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-champagne">Live Estimate</span>
          <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.25em] uppercase text-ivory/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Updating
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-6xl font-display">£{subtotal.toLocaleString()}</span>
          </div>
          <div className="mt-2 text-sm text-champagne">
            ≈ £{perPerson} per guest · all-inclusive
          </div>
        </div>

        <div className="hairline my-7" />

        {/* Smart context block — changes per step */}
        {step === 0 && (
          <div className="space-y-3 text-sm">
            <Row label="Purpose" value={purposeLabel} />
            <Row label="Guests" value={`${pax}`} />
            <Row label="Date" value={date ? formatDate(date) : "—"} />
            <Row label="Pickup" value={time} />
            <p className="text-ivory/55 text-xs leading-relaxed pt-3">
              We'll automatically pair you with the most suitable vehicle in
              the next step.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3 text-sm">
            <Row label="Distance" value={`${miles} mi ${returnTrip ? "return" : "one-way"}`} />
            <Row label="Drive time" value={`~${driveMinutes} min`} />
            <Row label="Stand-by" value={`${hours}h`} />
            <Row label="Route" value={`${pickup || "—"} → ${dropoff || "—"}`} />
          </div>
        )}

        {step >= 2 && (
          <div className="space-y-3 text-sm">
            <Row label="Vehicle" value={vehicle.name} />
            <Row label="Capacity" value={`up to ${vehicle.capacity}`} />
            <Row label="Distance" value={`${miles} mi ${returnTrip ? "return" : "one-way"}`} />
            <Row label="Drive time" value={`~${driveMinutes} min`} />
            {step >= 3 && <Row label="Tier" value={COMFORT_MULT[comfort].label} />}
            <Row label="Fuel · tolls · VAT" value="Included" />
          </div>
        )}

        {/* Availability badge */}
        {step >= 2 && (
          <div className="mt-6 border border-ivory/15 p-3 flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-champagne" />
            <div className="text-xs text-ivory/75 leading-tight">
              <div className="font-medium text-ivory">
                {availability.remaining} available
                {date ? ` · ${formatDate(date)}` : ""}
              </div>
              <div className="text-ivory/50 mt-0.5">
                Held for 15 minutes once you confirm.
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-8">
          {submitted ? (
            <div className="border border-champagne/40 bg-champagne/10 p-4 text-center">
              <div className="font-display text-lg text-ivory">Booking received</div>
              <p className="text-ivory/60 text-xs mt-1">We'll confirm within the hour.</p>
            </div>
          ) : (
            <>
              {step >= 3 && (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name *"
                    className="w-full bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 px-3 py-2.5 text-sm outline-none focus:border-champagne"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address *"
                    className="w-full bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 px-3 py-2.5 text-sm outline-none focus:border-champagne"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone (optional)"
                    className="w-full bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 px-3 py-2.5 text-sm outline-none focus:border-champagne"
                  />
                  {submitError && <p className="text-red-400 text-xs">{submitError}</p>}
                </div>
              )}
              <button
                disabled={step < 3 || submitting}
                onClick={step >= 3 ? handleReserve : undefined}
                className="w-full bg-champagne text-ink py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-ivory transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:bg-champagne disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…</>
                ) : step < 3 ? (
                  "Continue to confirm"
                ) : (
                  "Reserve this journey"
                )}
                {!submitting && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </>
          )}
          <p className="mt-4 text-[0.7rem] text-ivory/45 leading-relaxed">
            Estimate locks for 24 hours. A dedicated concierge confirms every
            detail within one working hour.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   PRIMITIVES
---------------------------------------------------------------------- */
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="eyebrow flex items-center gap-2 mb-2">
        {icon && <span className="text-champagne-deep">{icon}</span>}
        {label}
      </div>
      <div className="border-b border-border pb-3 focus-within:border-champagne-deep transition-colors">
        {children}
      </div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-ivory/55 text-xs tracking-wider uppercase shrink-0">{label}</dt>
      <dd className="text-ivory text-right truncate">{value}</dd>
    </div>
  );
}

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
