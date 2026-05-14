import { Link } from "@tanstack/react-router";
import { SOCIALS } from "@/data/socials";
import logo from "@/assets/Logo/Logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-midnight text-ivory">
      <div className="container-luxe pt-15 pb-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-2 flex items-center -mt-16">
            <img src={logo} alt="SJT Coaches" className="h-[108px] w-auto" />
          </div>

          <div className="md:col-span-3">
            <p className="text-ivory/70 leading-relaxed">
              The standard for executive group transport across the United
              Kingdom. Crafted journeys, immaculate fleet, chauffeurs trained
              to the highest professional standards.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-[0.65rem] tracking-[0.25em] uppercase text-ivory/50">
              <span>VOSA Approved</span>
              <span className="text-champagne">·</span>
              <span>ISO 9001:2015</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-champagne mb-5">Explore</div>
            <ul className="space-y-3 text-sm text-ivory/75">
              <li><Link to="/" className="hover:text-champagne">Home</Link></li>
              <li><Link to="/fleet" className="hover:text-champagne">Fleet</Link></li>
              <li><Link to="/services" className="hover:text-champagne">Services</Link></li>
              <li><Link to="/team" className="hover:text-champagne">Our Team</Link></li>
              <li><Link to="/reviews" className="hover:text-champagne">Reviews</Link></li>
              <li><Link to="/conditions" className="hover:text-champagne">Conditions</Link></li>
              <li><Link to="/blog" className="hover:text-champagne">Blog</Link></li>
              <li><Link to="/quote" className="hover:text-champagne">Get a Quote</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-champagne mb-5">Services</div>
            <ul className="space-y-3 text-sm text-ivory/75">
              <li>Airport Transfers</li>
              <li>Corporate Travel</li>
              <li>Wedding & Events</li>
              <li>Private Tours</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-champagne mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-ivory/75">
              <li>
                <a href="tel:02071676648" className="hover:text-champagne flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-champagne-deep" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/></svg>
                  Phone: 020 7167 6648
                </a>
              </li>
              <li>
                <a href="mailto:info@sjtcoaches.co.uk" className="hover:text-champagne flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-champagne-deep" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  info@sjtcoaches.co.uk
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447892832617?text=Hi%20SJT%20Coaches%2C%20I%27d%20like%20to%20enquire%20about%20a%20booking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-champagne flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#25D366]" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/></svg>
                  WhatsApp: 07892 832617
                </a>
              </li>
              <li className="pt-2 text-ivory/55 text-xs leading-relaxed">
                SJT Coaches<br />
                Kingcup Farm, Denham<br />
                UB9 4HE
              </li>
              <li className="pt-4">
                <div className="flex gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 hover:border-champagne hover:text-champagne transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-ivory/10 flex flex-col items-center gap-4 text-xs text-ivory/50">
          <div>© {new Date().getFullYear()} SJT Coaches Ltd. All rights reserved.</div>
          <div className="flex gap-12">
            <Link to="/privacy" className="hover:text-champagne">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-champagne">Terms & Conditions</Link>
            <Link to="/cookies" className="hover:text-champagne">Cookies</Link>
            <Link to="/gdpr" className="hover:text-champagne">GDPR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
