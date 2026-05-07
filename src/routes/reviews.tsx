import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — SJT Coaches" },
      { name: "description", content: "What clients say about SJT Coaches. Verified five-star reviews from corporate, wedding and private commissions." },
      { property: "og:title", content: "Customer Reviews — SJT Coaches" },
      { property: "og:description", content: "Verified five-star reviews from our clients." },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Graham Slaney", role: "Corporate, London", text: "Faultless from first call to final mile. The chauffeur arrived early, the coach was immaculate, and a last-minute itinerary change was handled without a flicker.", stars: 5 },
  { name: "Eleanor Whitcombe", role: "Wedding, Cotswolds", text: "Our guests still talk about the journey. The coach felt more like a private lounge than transport.", stars: 5 },
  { name: "Marcus Pendelton", role: "Private Tour, Edinburgh", text: "Five days, three cities, one extraordinary driver. SJT Coaches set a standard I didn't know existed for group travel.", stars: 5 },
  { name: "Aisha Rahman", role: "Conference, Birmingham", text: "Punctual, professional, and quietly luxurious. Our delegates were genuinely impressed.", stars: 5 },
  { name: "Henry Ashcroft", role: "School Trip, Devon", text: "Safety-first without losing warmth. The driver was a credit to the company and our students adored him.", stars: 5 },
  { name: "Sophia Lindqvist", role: "Hen Weekend, Bath", text: "Booked late, treated like long-standing clients. The concierge desk is something else entirely.", stars: 5 },
  { name: "Oliver Carmichael", role: "Airport Transfer, Heathrow", text: "Seamless meet-and-greet, spotless vehicle, and a driver who anticipated every need. Worth every penny.", stars: 5 },
  { name: "Priya Devereaux", role: "Family Celebration, Surrey", text: "From booking to drop-off, every detail was considered. Three generations travelled in absolute comfort.", stars: 5 },
  { name: "James Whitfield", role: "Corporate Roadshow, Manchester", text: "We moved 60 senior partners across four venues in a single day. Not one delay, not one complaint. SJT Coaches made us look exceptional.", stars: 5 },
  { name: "Camille Beaumont", role: "Fashion Week, London", text: "The precision was extraordinary. Fourteen movements over four days and every single one ran to the second.", stars: 5 },
  { name: "Rupert Hale-Norris", role: "Shooting Party, Yorkshire", text: "The Heritage coach was a talking point before we even arrived. Immaculate, warm, and the driver knew the Dales better than we did.", stars: 5 },
  { name: "Natasha Okonkwo", role: "Gala Dinner, Mayfair", text: "Our board members were collected from four different hotels and arrived together, relaxed and on time. SJT Coaches made the impossible look effortless.", stars: 5 },
  { name: "David Forsythe", role: "Stadium Transfer, Wembley", text: "150 supporters, one coach, zero stress. The driver kept spirits high and got everyone home safely. Already rebooked for next season.", stars: 5 },
  { name: "Isabella Thornton", role: "Honeymoon Transfer, Heathrow", text: "A small ribbon on the door and chilled champagne waiting inside. Nobody asked for that — they just did it. That is SJT Coaches.", stars: 5 },
  { name: "Tariq Mansoor", role: "Film Production, Various UK", text: "Twelve weeks, six counties, not a single call-time missed. The production team were unanimous — best ground operator we have ever used.", stars: 5 },
  { name: "Fiona Drummond", role: "Highland Retreat, Inverness", text: "The scenery was spectacular but the journey itself was the highlight. Smooth, silent, and utterly refined.", stars: 5 },
  { name: "Charles Pemberton", role: "Private Charter, Lake District", text: "I have used many operators over the years. SJT Coaches is in a different category entirely. The attention to detail is simply unmatched.", stars: 5 },
  { name: "Yuki Tanaka", role: "Incentive Trip, London & Oxford", text: "Our Tokyo clients were expecting good. They got extraordinary. Several asked for SJT Coaches's details before we had even returned to the hotel.", stars: 5 },
  { name: "Rachel Goldstein", role: "Bar Mitzvah, Hertfordshire", text: "200 guests, multiple pick-up points, a very precise schedule. SJT Coaches coordinated everything with grace and delivered without a single hiccup.", stars: 5 },
  { name: "Benedict Harlow", role: "University Reunion, Cambridge", text: "Forty years on and the standard of the evening was set the moment the coach arrived. Pristine, punctual, and driven with quiet pride.", stars: 5 },
];

function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-40 pb-16">
        <div className="container-luxe text-center">
          <span className="eyebrow">Verified Reviews</span>
          <h1 className="font-display text-5xl md:text-6xl mt-6 font-normal">In our clients' <span className="italic-accent">words</span>.</h1>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-champagne-deep text-champagne-deep" />)}</div>
            <span className="text-muted-foreground text-sm">412 five-star reviews · independently verified</span>
          </div>
        </div>
      </section>
      <section className="pb-32">
        <div className="container-luxe grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((r) => (
            <article key={r.name} className="bg-secondary p-6 relative">
              <Quote className="h-6 w-6 text-champagne-deep" strokeWidth={1} />
              <p className="font-display text-base leading-relaxed mt-4">"{r.text}"</p>
              <div className="hairline my-6" />
              <div className="flex justify-between items-end">
                <div>
                  <div className="font-display text-lg">{r.name}</div>
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-champagne-deep mt-1">{r.role}</div>
                </div>
                <div className="flex">{Array.from({ length: r.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-champagne-deep text-champagne-deep" />)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
