import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — The People Behind SJT Coaches" },
      { name: "description", content: "Meet the drivers, coordinators and support staff behind SJT Coaches — trusted coach hire in London." },
      { property: "og:title", content: "Our Team — SJT Coaches" },
      { property: "og:description", content: "The people behind SJT Coaches — professional drivers, coordinators and support team." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-40 pb-16">
        <div className="container-luxe max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">Our Team</span>
            <h1 className="font-display text-5xl md:text-6xl mt-6 font-normal">
              The people behind <span className="italic-accent">SJT Coaches</span>.
            </h1>
          </div>
          <p className="text-muted-foreground text-lg mt-8 leading-relaxed">
            At SJT Coaches, every journey begins long before the coach arrives. It starts with a team of dedicated professionals who take genuine pride in what they do — people who understand that when you are moving a group of people, the details matter enormously. From the first enquiry to the final drop-off, our team is present, attentive and committed to making your experience seamless.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            We have built SJT Coaches around a simple belief: that executive group travel should feel effortless. That means hiring drivers who are not just qualified, but genuinely professional. It means employing coordinators who listen carefully and plan meticulously. And it means having a support team available around the clock, because journeys do not always follow a nine-to-five schedule.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Our team brings together decades of combined experience across private hire, corporate travel, events logistics and luxury hospitality. Many of our drivers have worked with high-profile clients, diplomatic missions and major event organisers — and they bring that same level of discretion and care to every booking, regardless of size or occasion.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Behind the wheel and behind the scenes, the people of SJT Coaches share one standard: yours.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-luxe max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl mt-4">Professional drivers you can rely on</h2>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Our drivers are fully licensed, CRB-checked and hold the Certificate of Professional Competence required for passenger-carrying vehicles. Every member of our driving team undergoes a rigorous induction programme covering advanced road safety, passenger care, emergency procedures and client confidentiality — standards drawn directly from the executive transport and diplomatic sectors.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Beyond qualifications, we select for character. Our drivers are calm under pressure, impeccably presented and trained to anticipate the needs of their passengers without being intrusive. They understand that for many clients, the journey itself is part of the experience — and they conduct themselves accordingly. Whether navigating central London at rush hour or managing a multi-stop countryside itinerary, they bring the same composure and precision to every mile.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            All drivers receive ongoing training and are assessed annually against SJT Coaches's internal performance standards. Client feedback is reviewed after every journey, and we act on it. The result is a driving team that consistently earns five-star ratings and repeat bookings from some of the most discerning clients in the country.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-luxe max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl">Journey planning and coordination</h2>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Behind every smooth departure is a team of operations specialists who have already thought of everything. Our coordinators build detailed run sheets for each booking, accounting for traffic patterns, parking restrictions, passenger boarding times and contingency routes. Nothing is left to chance, and nothing is assumed.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            For complex itineraries — multi-day tours, multi-vehicle convoys, airport transfers with tight connection windows — our planning team works directly with clients to map out every stage in advance. We liaise with venues, hotels, event organisers and airport ground handlers so that your group moves through each transition without friction. When circumstances change, as they sometimes do, our coordinators respond immediately and keep every party informed.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            This depth of operational expertise is what separates SJT Coaches from standard coach hire. We do not simply dispatch a vehicle — we manage a journey, end to end, with the same attention to detail you would expect from a five-star concierge.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-luxe max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl">Built around your convenience</h2>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            We know that arranging group travel can feel like a lot to manage, so we have built our entire service model around removing that burden from you. From the moment you make your first enquiry, you are assigned a dedicated account coordinator who takes ownership of your booking and remains your single point of contact throughout. No call centres, no automated responses — just a knowledgeable professional who knows your requirements and is empowered to act on them.
          </p>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Every aspect of the booking process has been designed with your time in mind. Quotes are provided promptly and in plain language. Confirmations are clear and comprehensive. Amendments are handled without fuss. And on the day of travel, your coordinator is reachable directly — not through a queue.
          </p>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="text-champagne-deep font-display text-xl leading-none mt-1">01</span>
              <div>
                <h3 className="font-display text-xl">Quick, no-obligation quotes</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Tell us where, when and how many — we reply with a clear, all-inclusive price. No hidden fees, no pressure.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-champagne-deep font-display text-xl leading-none mt-1">02</span>
              <div>
                <h3 className="font-display text-xl">Flexible pick-up and drop-off</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  We collect your group from the address that suits you best, whether that is a school, office, hotel or private venue, and return you to the same point on time.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-champagne-deep font-display text-xl leading-none mt-1">03</span>
              <div>
                <h3 className="font-display text-xl">A single point of contact</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  One coordinator manages your booking from start to finish, so you always know who to call and never have to repeat yourself.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-champagne-deep font-display text-xl leading-none mt-1">04</span>
              <div>
                <h3 className="font-display text-xl">24/7 support on the day</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Our team is reachable around the clock during your journey. If plans change last minute, we adapt — adjusting routes, timings or stops to keep things running smoothly.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-champagne-deep font-display text-xl leading-none mt-1">05</span>
              <div>
                <h3 className="font-display text-xl">Tailored to your group</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  From child seats and wheelchair access to onboard refreshments and multi-stop itineraries, we shape the journey around what your passengers need.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-luxe max-w-3xl border-t border-border pt-16">
          <span className="eyebrow">Speak to our team</span>
          <h2 className="font-display text-3xl md:text-4xl mt-6">Have questions or ready to book?</h2>
          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
            Our team is here to help.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center bg-ink text-ivory px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-midnight transition-colors"
            >
              Contact us
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center border border-ink text-ink px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-ink hover:text-ivory transition-colors"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
