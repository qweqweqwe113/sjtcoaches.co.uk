import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { citySlug } from "@/data/hire-cities";
import logo from "@/assets/Logo/Logo.png";
import { SOCIALS } from "@/data/socials";

const nav = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
] as const;

const servicesNav = [
  { to: "/services", hash: "private-charter", label: "Private Charter Bus Hire" },
  { to: "/services", hash: "day-trips", label: "Day Trips & Tours" },
  { to: "/services", hash: "school", label: "School Coach Hire" },
  { to: "/services", hash: "airport", label: "Airport Transfers" },
  { to: "/services", hash: "corporate", label: "Corporate Coach Hire" },
  { to: "/services", hash: "wedding", label: "Wedding Coach Hire" },
  { to: "/services", hash: "minibus", label: "Minibus Hire" },
  { to: "/services", hash: "wheelchair", label: "Wheelchair Accessible Coach Hire" },
  { to: "/services", hash: "festival", label: "Festival Coach Hire" },
  { to: "/services", hash: "funeral", label: "Funeral Coach Hire" },
] as const;

const hireNav = [
  { label: "Belfast" },
  { label: "Birmingham" },
  { label: "Bradford" },
  { label: "Bristol" },
  { label: "Cardiff" },
  { label: "Edinburgh" },
  { label: "Glasgow" },
  { label: "Leeds" },
  { label: "Liverpool" },
  { label: "London" },
  { label: "Manchester" },
  { label: "Newcastle" },
  { label: "Sheffield" },
  { label: "UK Inbound Tours" },
  { label: "Other Locations" },
] as const;

const aboutNav = [
  { to: "/team", label: "Our team" },
  { to: "/reviews", label: "Customer Reviews" },
  { to: "/conditions", label: "Conditions" },
  { to: "/blog", label: "Blog" },
] as const;

export function SiteHeader({ dark = false }: { dark?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeServicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeHireTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (hireRef.current && !hireRef.current.contains(e.target as Node)) setHireOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onDark = true;

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAboutOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setAboutOpen(false), 150);
  };

  const openServices = () => {
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    closeServicesTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const openHire = () => {
    if (closeHireTimer.current) clearTimeout(closeHireTimer.current);
    setHireOpen(true);
  };
  const scheduleCloseHire = () => {
    if (closeHireTimer.current) clearTimeout(closeHireTimer.current);
    closeHireTimer.current = setTimeout(() => setHireOpen(false), 150);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-midnight/90 backdrop-blur-md border-b border-ivory/10"
          : "bg-midnight/70 backdrop-blur-sm border-b border-ivory/10"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center group ml-2">
          <img src={logo} alt="SJT Coaches" className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10 mr-0">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-base font-bold tracking-wide transition-colors relative ${
                onDark ? "text-ivory/75 hover:text-ivory" : "text-foreground/80 hover:text-foreground"
              }`}
              activeProps={{
                className: `${onDark ? "text-ivory" : "text-foreground"} after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-champagne-deep`,
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((o) => !o)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 text-base font-bold tracking-wide transition-colors ${
                onDark ? "text-ivory/75 hover:text-ivory" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`absolute left-0 top-full pt-4 min-w-[260px] transition-all duration-200 ${
                servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="bg-midnight border border-ivory/10 shadow-xl py-2">
                {servicesNav.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    hash={s.hash}
                    onClick={() => setServicesOpen(false)}
                    className="block px-5 py-2.5 text-sm text-ivory/75 hover:text-ivory hover:bg-ivory/5 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Hire dropdown — hidden from nav, pages kept for SEO */}
          {/* Location pages at /hire/[city] remain live and indexed */}

          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setAboutOpen((o) => !o)}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 text-base font-bold tracking-wide transition-colors ${
                onDark ? "text-ivory/75 hover:text-ivory" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              About us
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`absolute right-0 top-full pt-4 min-w-[220px] transition-all duration-200 ${
                aboutOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="bg-midnight border border-ivory/10 shadow-xl py-2">
                {aboutNav.map((a) => (
                  <Link
                    key={a.to}
                    to={a.to}
                    onClick={() => setAboutOpen(false)}
                    className="block px-5 py-3 text-sm text-ivory/75 hover:text-ivory hover:bg-ivory/5 transition-colors"
                    activeProps={{ className: "block px-5 py-3 text-sm text-champagne-deep bg-ivory/5" }}
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className={`text-base font-bold tracking-wide transition-colors relative ${
              onDark ? "text-ivory/75 hover:text-ivory" : "text-foreground/80 hover:text-foreground"
            }`}
            activeProps={{
              className: `${onDark ? "text-ivory" : "text-foreground"} after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-champagne-deep`,
            }}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4 mr-0">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-ivory/60 hover:text-ivory transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
          <div className="w-px h-4 bg-ivory/20" />
          <a
            href="https://wa.me/447892832617?text=Hi%20SJT%20Coaches%2C%20I%27d%20like%20to%20enquire%20about%20a%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-ivory/75 hover:text-ivory"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#25D366]" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
            </svg>
            07892 832617
          </a>
          <a
            href="tel:02071676648"
            className={`flex items-center gap-2 text-sm ${
              onDark ? "text-ivory/75 hover:text-ivory" : "text-foreground/80 hover:text-foreground"
            }`}
          >
            <Phone className="h-3.5 w-3.5 text-champagne-deep" />
            020 7167 6648
          </a>
          <Link
            to="/quote"
            className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors ${
              onDark ? "bg-champagne-deep text-midnight hover:bg-champagne" : "bg-ink text-ivory hover:bg-midnight"
            }`}
          >
            Instant Quote
          </Link>
        </div>

        <button
          aria-label="Menu"
          className={`lg:hidden p-2 ${onDark ? "text-ivory" : ""}`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-ivory border-b border-border ${
          open ? "max-h-[90vh]" : "max-h-0"
        }`}
      >
        <div className="container-luxe py-8 flex flex-col gap-5">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-3xl">
              {n.label}
            </Link>
          ))}
          <div className="hairline my-2" />
          <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">Services</div>
          {servicesNav.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              hash={s.hash}
              onClick={() => setOpen(false)}
              className="font-display text-xl pl-3"
            >
              {s.label}
            </Link>
          ))}
          <div className="hairline my-2" />
          <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep">About us</div>
          {aboutNav.map((a) => (
            <Link key={a.to} to={a.to} onClick={() => setOpen(false)} className="font-display text-2xl pl-3">
              {a.label}
            </Link>
          ))}
          <div className="hairline my-2" />
          <Link to="/contact" onClick={() => setOpen(false)} className="font-display text-3xl">
            Contact
          </Link>
          <Link
            to="/quote"
            onClick={() => setOpen(false)}
            className="bg-ink text-ivory px-6 py-4 text-xs tracking-[0.2em] uppercase text-center mt-2"
          >
            Instant Quote
          </Link>
          <a href="tel:02071676648" className="text-sm text-foreground/80">
            020 7167 6648
          </a>
        </div>
      </div>
    </header>
  );
}
