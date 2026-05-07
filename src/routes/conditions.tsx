import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "Conditions of Hire — SJT Coaches" },
      { name: "description", content: "Standard conditions of hire for SJT Coaches coach charter services." },
      { property: "og:title", content: "Conditions of Hire — SJT Coaches" },
      { property: "og:description", content: "Standard conditions of hire for our coach charter services." },
    ],
  }),
  component: ConditionsPage,
});

const SECTIONS = [
  { h: "1. Bookings & Confirmation", p: "All bookings are provisional until written confirmation is issued by our concierge desk. A signed quotation or accepted email constitutes a binding contract under English law." },
  { h: "2. Quotations", p: "Quotations remain valid for thirty (30) days from issue. Prices are inclusive of VAT, driver hours within the agreed itinerary, fuel, and standard tolls. Additional waiting time, parking surcharges and congestion levies are billed at cost." },
  { h: "3. Deposits & Payment", p: "A 25% deposit secures your booking. The balance is due fourteen (14) days before the journey date. For bookings placed within fourteen days, full payment is required at confirmation." },
  { h: "4. Cancellation", p: "Cancellations made more than 28 days before departure: deposit refunded less an administration fee of £75. 14–28 days: 50% of the total fare retained. Less than 14 days: 100% retained. We strongly recommend travel insurance." },
  { h: "5. Driver Hours", p: "Drivers operate under EU Drivers' Hours Regulations and the Working Time Directive. Maximum 9 hours driving per day, 56 hours per week. Itineraries exceeding these limits require a relief driver, billed separately." },
  { h: "6. Conduct & Damage", p: "The hirer is responsible for the conduct of all passengers. Smoking, vaping and the consumption of hot food are prohibited on board. Damage caused by passengers is chargeable at the cost of repair plus loss-of-use." },
  { h: "7. Delays & Force Majeure", p: "We accept no liability for delays caused by traffic, weather, mechanical failure, or events beyond reasonable control. Where a vehicle becomes unserviceable, a comparable replacement will be despatched as quickly as practicable." },
  { h: "8. Luggage & Lost Property", p: "Luggage is carried at the owner's risk. Items left on board are held for 30 days; return postage is at the owner's expense. We accept no liability for loss or damage to personal property." },
  { h: "9. Insurance", p: "All vehicles carry comprehensive public liability insurance to £10,000,000. Personal effects are not insured by the carrier." },
  { h: "10. Governing Law", p: "These conditions are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts." },
];

function ConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-40 pb-16">
        <div className="container-luxe max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl mt-6 font-normal">Conditions of <span className="italic-accent">hire</span>.</h1>
          </div>
          <p className="text-muted-foreground text-lg mt-6">The terms below govern every booking with SJT Coaches. Please read them carefully — by confirming a booking you accept them in full.</p>
        </div>
      </section>
      <section className="pb-32">
        <div className="container-luxe max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl">{s.h}</h2>
              <div className="hairline my-4" />
              <p className="text-muted-foreground leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
