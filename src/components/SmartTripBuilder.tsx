import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { ArrowRight, ArrowLeft, MapPin, Calendar, Users, Plane, Briefcase, Sparkles, Crown, Wifi, Snowflake, Coffee, ShieldCheck, Loader2, Check } from "lucide-react";

type JourneyType = "airport" | "corporate" | "event" | "private";

// ─── Location autocomplete ────────────────────────────────────────────────────

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
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

function shortenAddress(full: string): string {
  // Take first 3 comma-separated parts to keep it readable
  const parts = full.split(",").map((p) => p.trim());
  return parts.slice(0, 3).join(", ");
}

function LocationInput({
  value,
  onChange,
  onSelect,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (display: string, lat: number, lon: number) => void;
  placeholder: string;
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
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full bg-transparent text-ink font-medium outline-none placeholder:text-ink/40 text-ellipsis"
        autoComplete="off"
        title={value}
      />
      {showDropdown && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-[320px] bg-white border border-border shadow-xl z-[500] max-h-64 overflow-y-auto">
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
                onSelect(shortenAddress(s.display_name), parseFloat(s.lat), parseFloat(s.lon));
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

const JOURNEY_TYPES: { id: JourneyType; label: string; icon: typeof Plane; tag: string }[] = [
  { id: "airport", label: "Airport", icon: Plane, tag: "Transfer" },
  { id: "corporate", label: "Corporate", icon: Briefcase, tag: "Business" },
  { id: "event", label: "Event", icon: Sparkles, tag: "Occasion" },
  { id: "private", label: "Private", icon: Crown, tag: "Bespoke" },
];

interface VehicleMatch {
  name: string;
  capacity: string;
  tag: string;
  perks: { icon: typeof Wifi; label: string }[];
  basePerKm: number;
}

function recommendVehicle(passengers: number, journey: JourneyType): VehicleMatch {
  if (passengers <= 8) {
    return {
      name: "Executive Minibus",
      capacity: "Up to 8 guests",
      tag: journey === "corporate" ? "Executive" : "Privé",
      perks: [
        { icon: Wifi, label: "5G WiFi" },
        { icon: Snowflake, label: "Climate" },
        { icon: Coffee, label: "Refreshments" },
      ],
      basePerKm: 4.2,
    };
  }
  if (passengers <= 23) {
    return {
      name: "Executive Coach",
      capacity: "Up to 23 guests",
      tag: "Flagship",
      perks: [
        { icon: Wifi, label: "5G WiFi" },
        { icon: Snowflake, label: "Climate" },
        { icon: Coffee, label: "Bar service" },
        { icon: ShieldCheck, label: "Licensed" },
      ],
      basePerKm: 5.8,
    };
  }
  if (passengers <= 55) {
    return {
      name: "Standard Coach",
      capacity: "Up to 55 guests",
      tag: "Touring",
      perks: [
        { icon: Wifi, label: "5G WiFi" },
        { icon: Snowflake, label: "Climate" },
        { icon: Coffee, label: "Refreshments" },
      ],
      basePerKm: 3.6,
    };
  }
  return {
    name: "Multiple Coaches",
    capacity: `${passengers} guests — fleet allocation`,
    tag: "Fleet",
    perks: [
      { icon: Wifi, label: "5G WiFi" },
      { icon: Snowflake, label: "Climate" },
      { icon: Coffee, label: "Refreshments" },
      { icon: ShieldCheck, label: "Coordinated" },
    ],
    basePerKm: 3.2,
  };
}

async function geocode(address: string): Promise<[number, number] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data && data[0]) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch {}
  return null;
}

function haversine([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface SmartTripBuilderProps {
  variant?: "hero" | "page";
}

export function SmartTripBuilder({ variant = "hero" }: SmartTripBuilderProps) {
  const [step, setStep] = useState(0);
  const [journey, setJourney] = useState<JourneyType | null>(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoord, setPickupCoord] = useState<[number, number] | null>(null);
  const [dropoffCoord, setDropoffCoord] = useState<[number, number] | null>(null);
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(8);
  const [returnJourney, setReturnJourney] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [distanceKm, setDistanceKm] = useState(0);
  const [geoError, setGeoError] = useState("");

  // Booking state
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    if (!date) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      setDate(d.toISOString().slice(0, 10));
    }
  }, [date]);

  const vehicle = useMemo(
    () => recommendVehicle(passengers, journey ?? "private"),
    [passengers, journey],
  );

  const priceLow = distanceKm > 0 ? Math.round((distanceKm * vehicle.basePerKm + 180) / 10) * 10 : 0;
  const priceHigh = distanceKm > 0 ? Math.round((priceLow * 1.35) / 10) * 10 : 0;
  const travelMinutes = distanceKm > 0 ? Math.max(20, Math.round(distanceKm / 0.95)) : 0;

  const next = async () => {
    if (step === 1) {
      if (!pickup.trim() || !dropoff.trim()) {
        setGeoError("Please enter both pickup and destination.");
        return;
      }
      setGeoError("");
      setCalculating(true);
      let fromCoord = pickupCoord;
      let toCoord = dropoffCoord;
      // Geocode any field that wasn't selected from suggestions
      if (!fromCoord) {
        const r = await geocode(pickup);
        fromCoord = r;
      }
      if (!toCoord) {
        const r = await geocode(dropoff);
        toCoord = r;
      }
      if (fromCoord && toCoord) {
        setDistanceKm(haversine(fromCoord, toCoord));
      } else {
        setDistanceKm(80);
      }
      setTimeout(() => { setCalculating(false); setStep(2); }, 600);
      return;
    }
    setStep((s) => Math.min(2, s + 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const isHero = variant === "hero";
  const wrapperClass = isHero
    ? "glass-light text-ink rounded-sm shadow-luxe overflow-hidden"
    : "bg-card border border-border shadow-card overflow-hidden";

  return (
    <div className={wrapperClass}>
      <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 border-b border-border/60">
        <span className="eyebrow text-champagne-deep">Smart Trip Builder</span>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-[2px] transition-all duration-500 ${
                i <= step ? "w-8 bg-champagne-deep" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {step === 0 && (
          <div className="fade-up">
            <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
              What type of journey is this?
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Tell us the occasion — we'll tailor everything to it.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {JOURNEY_TYPES.map((j) => {
                const Icon = j.icon;
                const active = journey === j.id;
                return (
                  <button
                    key={j.id}
                    onClick={() => setJourney(j.id)}
                    className={`group flex flex-col items-start gap-3 p-5 border text-left transition-all ${
                      active
                        ? "border-champagne-deep bg-champagne/15"
                        : "border-border hover:border-champagne hover:bg-champagne/5"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? "text-champagne-deep" : "text-ink/70"}`} strokeWidth={1.4} />
                    <div>
                      <div className="font-display text-lg text-ink">{j.label}</div>
                      <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mt-1">{j.tag}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="fade-up">
            <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">Your journey, briefly.</h3>
            <p className="text-muted-foreground text-sm mt-2">
              Enter any address, postcode or landmark — anywhere in the UK.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <Field label="Pickup location" icon={MapPin}>
                <LocationInput
                  value={pickup}
                  onChange={(v) => { setPickup(v); setPickupCoord(null); }}
                  onSelect={(name, lat, lon) => { setPickup(name); setPickupCoord([lat, lon]); }}
                  placeholder="e.g. Heathrow Airport, TW6 1EW"
                />
              </Field>
              <Field label="Destination" icon={MapPin}>
                <LocationInput
                  value={dropoff}
                  onChange={(v) => { setDropoff(v); setDropoffCoord(null); }}
                  onSelect={(name, lat, lon) => { setDropoff(name); setDropoffCoord([lat, lon]); }}
                  placeholder="e.g. Manchester City Centre"
                />
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
              <Field label="Date" icon={Calendar}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-ink font-medium outline-none"
                />
              </Field>
              <Field label="Passengers" icon={Users}>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
                  className="w-full bg-transparent text-ink font-medium outline-none"
                />
              </Field>
              </div>

              {/* Return journey toggle */}
              <div className="flex items-center gap-3 p-4 border border-border bg-background/60">
                <button
                  type="button"
                  onClick={() => setReturnJourney((r) => !r)}
                  className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                    returnJourney ? "bg-champagne-deep" : "bg-border"
                  }`}
                >
                  <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    returnJourney ? "translate-x-6" : "translate-x-1"
                  }`} />
                </button>
                <span className="text-sm font-medium text-ink">Return journey</span>
                {returnJourney && (
                  <span className="text-xs text-muted-foreground ml-auto">Select return date →</span>
                )}
              </div>

              {/* Return date — shown when return journey is on */}
              {returnJourney && (
                <Field label="Return date" icon={Calendar}>
                  <input
                    type="date"
                    value={returnDate}
                    min={date}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-ink font-medium outline-none"
                  />
                </Field>
              )}
            </div>
            {geoError && <p className="mt-3 text-sm text-red-500">{geoError}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="fade-up">
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-champagne-deep">
              Recommended · {vehicle.tag}
            </div>
            <h4 className="font-display text-3xl md:text-4xl text-ink mt-2 leading-tight">{vehicle.name}</h4>
            <div className="text-sm text-muted-foreground mt-1">{vehicle.capacity}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {vehicle.perks.map((p) => {
                const Icon = p.icon;
                return (
                  <span key={p.label} className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1 border border-border text-ink/75">
                    <Icon className="h-3 w-3 text-champagne-deep" strokeWidth={1.5} />
                    {p.label}
                  </span>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-border pt-5">
              <div>
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">Route</div>
                <div className="text-sm text-ink mt-1 font-medium truncate">{pickup}</div>
                <div className="text-xs text-muted-foreground">→ {dropoff}</div>
                {returnJourney && (
                  <div className="text-xs text-champagne-deep mt-1">↩ Return: {returnDate || "date TBC"}</div>
                )}
              </div>
              <div>
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">Estimated price</div>
                <div className="font-display text-2xl md:text-3xl text-ink mt-1">
                  {distanceKm > 0 ? `£${priceLow.toLocaleString()} — £${priceHigh.toLocaleString()}` : "On request"}
                </div>
              </div>
              <div>
                <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">Est. travel time</div>
                <div className="font-display text-2xl md:text-3xl text-ink mt-1">
                  {travelMinutes > 0
                    ? `${Math.floor(travelMinutes / 60) > 0 ? `${Math.floor(travelMinutes / 60)}h ` : ""}${travelMinutes % 60}m`
                    : "—"}
                </div>
              </div>
            </div>
            {distanceKm > 0 && (
              <div className="text-xs text-muted-foreground mt-3">
                ~{distanceKm.toFixed(0)} km · indicative range; exact quote within 30 seconds.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between gap-4">
        <button
          onClick={prev}
          disabled={step === 0 || calculating}
          className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        {step < 2 ? (
          <button
            onClick={next}
            disabled={(step === 0 && !journey) || calculating}
            className="group flex items-center gap-3 bg-ink text-ivory px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-midnight disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {calculating ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" />Calculating route…</>
            ) : step === 0 ? (
              <>Continue<ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></>
            ) : (
              <>Get estimate<ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {!sent ? (
              <>
                <div className="grid sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Your name *"
                    className="border border-border px-3 py-2.5 text-sm outline-none focus:border-champagne-deep bg-background"
                  />
                  <input
                    type="email"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="Email address *"
                    className="border border-border px-3 py-2.5 text-sm outline-none focus:border-champagne-deep bg-background"
                  />
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="Phone (optional)"
                    className="border border-border px-3 py-2.5 text-sm outline-none focus:border-champagne-deep bg-background"
                  />
                </div>
                {sendError && <p className="text-xs text-red-500">{sendError}</p>}
                <button
                  onClick={async () => {
                    if (!bookingName.trim() || !bookingEmail.trim()) {
                      setSendError("Please enter your name and email.");
                      return;
                    }
                    setSendError("");
                    setSending(true);
                    try {
                      const { submitContactFn } = await import("../server-fns/contact.server");
                      await submitContactFn({
                        data: {
                          name: bookingName.trim(),
                          email: bookingEmail.trim(),
                          phone: bookingPhone.trim() || undefined,
                          message: `SMART TRIP BUILDER BOOKING

Journey type: ${journey}
Passengers: ${passengers}
Pickup: ${pickup}
Destination: ${dropoff}
Date: ${date}
Return journey: ${returnJourney ? `Yes — return date: ${returnDate || "not specified"}` : "No"}
Vehicle recommended: ${vehicle.name} (${vehicle.capacity})
Distance: ~${distanceKm.toFixed(0)} km
Estimated price: £${priceLow.toLocaleString()} — £${priceHigh.toLocaleString()}
Est. travel time: ${travelMinutes > 0 ? `${Math.floor(travelMinutes / 60) > 0 ? `${Math.floor(travelMinutes / 60)}h ` : ""}${travelMinutes % 60}m` : "—"}`,
                        },
                      });
                      setSent(true);
                    } catch {
                      setSendError("Something went wrong. Please email info@sjtcoaches.co.uk directly.");
                    } finally {
                      setSending(false);
                    }
                  }}
                  disabled={sending}
                  className="group flex items-center justify-center gap-3 gold-gradient text-ink px-7 py-4 text-xs tracking-[0.25em] uppercase hover:brightness-105 transition-all shadow-luxe disabled:opacity-50"
                >
                  {sending ? (
                    <><Loader2 className="h-3.5 w-3.5 animate-spin" />Sending…</>
                  ) : (
                    <>Reserve this journey <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 gold-gradient text-ink px-7 py-4 text-xs tracking-[0.25em] uppercase shadow-luxe">
                <Check className="h-4 w-4 shrink-0" />
                Booking received — we'll confirm within the hour
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <label className="group flex flex-col gap-1.5 p-4 border border-border bg-background/60 hover:border-champagne-deep/60 transition-colors cursor-pointer min-w-0">
      <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground shrink-0">
        <Icon className="h-3 w-3 text-champagne-deep" strokeWidth={1.5} />
        {label}
      </div>
      <div className="min-w-0 w-full">
        {children}
      </div>
    </label>
  );
}
