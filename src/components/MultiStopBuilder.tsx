import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus, Trash2, ArrowRight, ArrowDown, Calendar, Clock,
  MapPin, Users, Loader2, GripVertical, ChevronDown, ChevronUp
} from "lucide-react";

/* ======================================================================
   MULTI-STOP / MULTI-DAY TRIP BUILDER
   Supports: multiple pickups, multi-city routing, multi-day itineraries,
   per-leg times, live distance/duration/price totals, reorder/remove stops.
   ====================================================================== */

// ─── Types ────────────────────────────────────────────────────────────────────

interface Leg {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  distanceKm: number;
  durationMin: number;
}

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function haversine(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number]
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocode(address: string): Promise<[number, number] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=gb`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data?.[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {}
  return null;
}

function shortenAddress(full: string): string {
  return full.split(",").map((p) => p.trim()).slice(0, 3).join(", ");
}

function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function pricePerKm(passengers: number): number {
  if (passengers <= 8) return 4.2;
  if (passengers <= 23) return 5.8;
  if (passengers <= 55) return 3.6;
  return 3.2;
}

// ─── Location autocomplete input ──────────────────────────────────────────────

function useLocationSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.length < 3) { setSuggestions([]); return; }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=gb`,
          { headers: { "Accept-Language": "en" } }
        );
        setSuggestions(await res.json());
      } catch { setSuggestions([]); }
      finally { setLoading(false); }
    }, 350);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [query]);

  return { suggestions, loading };
}

function LocationInput({
  value, onChange, onSelect, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (display: string, lat: number, lon: number) => void;
  placeholder: string;
}) {
  const { suggestions, loading } = useLocationSuggestions(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full bg-transparent outline-none text-sm font-medium placeholder:text-ink/30"
      />
      {open && (suggestions.length > 0 || loading) && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-[280px] bg-white border border-border shadow-xl z-[600] max-h-52 overflow-y-auto">
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

// ─── Leg card ─────────────────────────────────────────────────────────────────

function LegCard({
  leg, index, total, passengers,
  onChange, onRemove, onMoveUp, onMoveDown,
}: {
  leg: Leg;
  index: number;
  total: number;
  passengers: number;
  onChange: (id: string, updates: Partial<Leg>) => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  const [fromCoord, setFromCoord] = useState<[number, number] | null>(null);
  const [toCoord, setToCoord] = useState<[number, number] | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calcDistance = useCallback(async (
    from: [number, number] | null,
    to: [number, number] | null,
    fromText: string,
    toText: string
  ) => {
    let f = from, t = to;
    if (!f && fromText.length > 3) f = await geocode(fromText);
    if (!t && toText.length > 3) t = await geocode(toText);
    if (f && t) {
      const km = haversine(f, t);
      const min = Math.max(15, Math.round(km / 0.95));
      onChange(leg.id, { distanceKm: Math.round(km), durationMin: min });
    }
  }, [leg.id, onChange]);

  const handleFromSelect = (display: string, lat: number, lon: number) => {
    const coord: [number, number] = [lat, lon];
    setFromCoord(coord);
    onChange(leg.id, { from: display });
    if (toCoord) calcDistance(coord, toCoord, display, leg.to);
  };

  const handleToSelect = (display: string, lat: number, lon: number) => {
    const coord: [number, number] = [lat, lon];
    setToCoord(coord);
    onChange(leg.id, { to: display });
    if (fromCoord) calcDistance(fromCoord, coord, leg.from, display);
  };

  const priceLow = leg.distanceKm > 0
    ? Math.round((leg.distanceKm * pricePerKm(passengers) + 80) / 10) * 10
    : 0;

  return (
    <div className="border border-border bg-card p-5 relative group">
      {/* Leg header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-champagne-deep text-ivory text-[0.6rem] font-bold shrink-0">
            {index + 1}
          </span>
          <span className="text-[0.6rem] tracking-[0.25em] uppercase text-champagne-deep font-medium">
            Leg {index + 1}
          </span>
          {leg.distanceKm > 0 && (
            <span className="text-[0.6rem] text-muted-foreground ml-2">
              {leg.distanceKm} km · {formatDuration(leg.durationMin)}
              {priceLow > 0 && ` · ~£${priceLow.toLocaleString()}`}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMoveUp(leg.id)}
            disabled={index === 0}
            className="p-1 text-muted-foreground hover:text-ink disabled:opacity-20"
            title="Move up"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMoveDown(leg.id)}
            disabled={index === total - 1}
            className="p-1 text-muted-foreground hover:text-ink disabled:opacity-20"
            title="Move down"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {total > 1 && (
            <button
              type="button"
              onClick={() => onRemove(leg.id)}
              className="p-1 text-muted-foreground hover:text-red-500 ml-1"
              title="Remove leg"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Date & time */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
          <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
            <Calendar className="h-3 w-3 text-champagne-deep" /> Date
          </div>
          <input
            type="date"
            value={leg.date}
            onChange={(e) => onChange(leg.id, { date: e.target.value })}
            className="bg-transparent outline-none text-sm font-medium"
          />
        </label>
        <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
          <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
            <Clock className="h-3 w-3 text-champagne-deep" /> Departure time
          </div>
          <input
            type="time"
            value={leg.time}
            onChange={(e) => onChange(leg.id, { time: e.target.value })}
            className="bg-transparent outline-none text-sm font-medium"
          />
        </label>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 gap-3">
        <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
          <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
            <MapPin className="h-3 w-3 text-champagne-deep" /> Pickup
          </div>
          <LocationInput
            value={leg.from}
            onChange={(v) => { setFromCoord(null); onChange(leg.id, { from: v, distanceKm: 0, durationMin: 0 }); }}
            onSelect={handleFromSelect}
            placeholder="Enter pickup address or postcode"
          />
        </label>
        <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
          <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
            <MapPin className="h-3 w-3 text-champagne-deep" /> Drop-off / Next stop
          </div>
          <LocationInput
            value={leg.to}
            onChange={(v) => { setToCoord(null); onChange(leg.id, { to: v, distanceKm: 0, durationMin: 0 }); }}
            onSelect={handleToSelect}
            placeholder="Enter destination address or postcode"
          />
        </label>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function defaultLeg(date = ""): Leg {
  return { id: uid(), date, time: "09:00", from: "", to: "", distanceKm: 0, durationMin: 0 };
}

export function MultiStopBuilder() {
  const today = new Date().toISOString().slice(0, 10);
  const [legs, setLegs] = useState<Leg[]>([defaultLeg(today)]);
  const [passengers, setPassengers] = useState(20);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const updateLeg = useCallback((id: string, updates: Partial<Leg>) => {
    setLegs((prev) => prev.map((l) => l.id === id ? { ...l, ...updates } : l));
  }, []);

  const removeLeg = (id: string) => setLegs((prev) => prev.filter((l) => l.id !== id));

  const addLeg = () => {
    const lastDate = legs[legs.length - 1]?.date ?? today;
    setLegs((prev) => [...prev, defaultLeg(lastDate)]);
  };

  const moveUp = (id: string) => {
    setLegs((prev) => {
      const i = prev.findIndex((l) => l.id === id);
      if (i <= 0) return prev;
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  };

  const moveDown = (id: string) => {
    setLegs((prev) => {
      const i = prev.findIndex((l) => l.id === id);
      if (i >= prev.length - 1) return prev;
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  };

  const totalKm = legs.reduce((s, l) => s + l.distanceKm, 0);
  const totalMin = legs.reduce((s, l) => s + l.durationMin, 0);
  const rate = pricePerKm(passengers);
  const totalPriceLow = totalKm > 0
    ? Math.round((totalKm * rate + 80 * legs.length) / 10) * 10
    : 0;
  const totalPriceHigh = totalPriceLow > 0
    ? Math.round((totalPriceLow * 1.35) / 10) * 10
    : 0;

  const isMultiDay = new Set(legs.map((l) => l.date).filter(Boolean)).size > 1;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const itinerary = legs.map((l, i) =>
        `Leg ${i + 1}: ${l.date} ${l.time} — ${l.from} → ${l.to} (${l.distanceKm} km, ${formatDuration(l.durationMin)})`
      ).join("\n");

      const body = {
        name,
        email,
        phone: phone || undefined,
        message: `MULTI-STOP BOOKING ENQUIRY\n\nPassengers: ${passengers}\nLegs: ${legs.length}\nMulti-day: ${isMultiDay ? "Yes" : "No"}\n\nItinerary:\n${itinerary}\n\nTotal distance: ${totalKm} km\nTotal duration: ${formatDuration(totalMin)}\nEstimated price: £${totalPriceLow.toLocaleString()} — £${totalPriceHigh.toLocaleString()}\n\nNotes: ${notes || "None"}`,
      };

      const res = await fetch("/_server/submitContactFn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: body }),
      });

      setSent(true);
    } catch {
      setError("Something went wrong. Please email us directly at info@sjtcoaches.co.uk");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-champagne-deep bg-champagne/10 p-8 text-center">
        <div className="font-display text-2xl text-ink">Enquiry received</div>
        <p className="text-muted-foreground mt-2 text-sm">
          We'll review your itinerary and come back to you within the hour.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 border-b border-border/60">
        <div>
          <span className="eyebrow text-champagne-deep">Multi-Stop Journey Builder</span>
          <p className="text-xs text-muted-foreground mt-1">
            Multiple pickups · Multi-city routing · Multi-day itineraries
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {isMultiDay && (
            <span className="px-2 py-1 bg-champagne/20 text-champagne-deep text-[0.6rem] tracking-[0.2em] uppercase">
              Multi-day
            </span>
          )}
          <span>{legs.length} leg{legs.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4">
        {/* Passengers */}
        <div className="flex items-center gap-4 p-4 border border-border bg-background/60">
          <Users className="h-4 w-4 text-champagne-deep shrink-0" />
          <div className="flex-1">
            <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-1">Total passengers</div>
            <input
              type="number"
              min={1}
              max={1000}
              value={passengers}
              onChange={(e) => setPassengers(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
              className="bg-transparent outline-none text-sm font-medium w-24"
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {passengers <= 8 ? "Executive Minibus" : passengers <= 23 ? "Executive Coach" : passengers <= 55 ? "Standard Coach" : "Multiple Coaches"}
          </div>
        </div>

        {/* Legs */}
        <div className="space-y-3">
          {legs.map((leg, i) => (
            <LegCard
              key={leg.id}
              leg={leg}
              index={i}
              total={legs.length}
              passengers={passengers}
              onChange={updateLeg}
              onRemove={removeLeg}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
            />
          ))}
        </div>

        {/* Add leg */}
        <button
          type="button"
          onClick={addLeg}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-champagne-deep/50 py-3 text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep hover:bg-champagne/10 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add another leg
        </button>

        {/* Totals — prominent price panel */}
        {totalKm > 0 && (
          <div className="bg-ink text-ivory p-6 border border-champagne/30">
            <div className="text-[0.6rem] tracking-[0.25em] uppercase text-champagne mb-4">Journey estimate</div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-ivory/50 mb-1">Total distance</div>
                <div className="font-display text-3xl text-ivory">{totalKm} km</div>
              </div>
              <div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-ivory/50 mb-1">Total duration</div>
                <div className="font-display text-3xl text-ivory">{formatDuration(totalMin)}</div>
              </div>
              <div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-ivory/50 mb-1">Estimated price</div>
                <div className="font-display text-3xl text-champagne">
                  £{totalPriceLow.toLocaleString()} — £{totalPriceHigh.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-ivory/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-ivory/60">
              <div><span className="text-ivory/40">Legs:</span> {legs.length}</div>
              <div><span className="text-ivory/40">Passengers:</span> {passengers}</div>
              <div><span className="text-ivory/40">Vehicle:</span> {passengers <= 8 ? "Executive Minibus" : passengers <= 23 ? "Executive Coach" : passengers <= 55 ? "Standard Coach" : "Multiple Coaches"}</div>
              <div><span className="text-ivory/40">Type:</span> {isMultiDay ? "Multi-day" : "Same day"}</div>
            </div>
            <p className="mt-3 text-[0.65rem] text-ivory/40">
              Indicative estimate only. Final price confirmed by our team within the hour.
            </p>
          </div>
        )}

        {/* Itinerary summary */}
        {legs.some((l) => l.from && l.to) && (
          <div className="border border-border bg-secondary/50 p-4 space-y-2">
            <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-3">Journey summary</div>
            {legs.map((l, i) => (
              <div key={l.id} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne-deep text-ivory text-[0.55rem] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-muted-foreground text-xs">{l.date} {l.time}</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium truncate">{l.from || "—"}</span>
                    <ArrowRight className="h-3 w-3 text-champagne-deep shrink-0" />
                    <span className="font-medium truncate">{l.to || "—"}</span>
                  </div>
                  {l.distanceKm > 0 && (
                    <span className="text-xs text-muted-foreground">{l.distanceKm} km · {formatDuration(l.durationMin)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact form */}
        <div className="border-t border-border pt-6 space-y-4">
          <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">Your details</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Full name *</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="bg-transparent outline-none text-sm font-medium placeholder:text-ink/30"
              />
            </label>
            <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Email *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="bg-transparent outline-none text-sm font-medium placeholder:text-ink/30"
              />
            </label>
            <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 000000"
                className="bg-transparent outline-none text-sm font-medium placeholder:text-ink/30"
              />
            </label>
            <label className="flex flex-col gap-1 p-3 border border-border bg-background/60">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Notes / requirements</span>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Wheelchair access, luggage, etc."
                className="bg-transparent outline-none text-sm font-medium placeholder:text-ink/30"
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit as any}
            disabled={sending || !name || !email}
            className="w-full flex items-center justify-center gap-3 bg-ink text-ivory py-4 text-xs tracking-[0.25em] uppercase hover:bg-midnight disabled:opacity-40 transition-colors"
          >
            {sending ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending enquiry…</>
            ) : (
              <>Send multi-stop enquiry <ArrowRight className="h-3.5 w-3.5" /></>
            )}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            We'll review your itinerary and respond within the hour.
          </p>
        </div>
      </div>
    </div>
  );
}
