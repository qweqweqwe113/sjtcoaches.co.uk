import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SJT Coaches" },
      { name: "description", content: "The terms and conditions governing bookings and services provided by SJT Coaches across the United Kingdom." },
      { property: "og:title", content: "Terms of Service — SJT Coaches" },
      { property: "og:description", content: "The terms governing your use of our luxury coach hire services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms set out the agreement between you and SJT Coaches when you book or use any of our chauffeur and coach services. Please read them carefully."
      updated="January 2026"
    >
      <LegalSection title="1. Acceptance of terms">
        <p>By requesting a quote, confirming a booking, or using any service offered by SJT Coaches, you agree to be bound by these Terms of Service together with our Privacy Policy and Cookie Policy.</p>
      </LegalSection>

      <LegalSection title="2. Bookings and quotations">
        <p>All quotations are valid for 14 days from the date of issue. A booking is confirmed only once we have received written acceptance from you and the agreed deposit has cleared. We reserve the right to decline any booking at our discretion.</p>
      </LegalSection>

      <LegalSection title="3. Pricing and payment">
        <p>Prices are quoted in pounds sterling and inclusive of VAT where applicable. Unless otherwise agreed, full payment is due no later than 72 hours before the journey. Late payments may incur interest at 4% above the Bank of England base rate.</p>
      </LegalSection>

      <LegalSection title="4. Cancellations and amendments">
        <p>Cancellations made more than 14 days before the journey are refunded in full. Within 14 to 72 hours, a 50% charge applies. Within 72 hours, the booking is non-refundable. Amendments are accommodated wherever possible, subject to availability.</p>
      </LegalSection>

      <LegalSection title="5. Conduct on board">
        <p>For the comfort and safety of all passengers, smoking, vaping, and the consumption of food are prohibited on board unless expressly arranged in advance. Any damage caused to the vehicle by passengers will be charged at cost.</p>
      </LegalSection>

      <LegalSection title="6. Liability">
        <p>SJT Coaches maintains comprehensive insurance in accordance with UK PSV regulations. Our liability for any loss or damage is limited to the value of the booking, save for liability that cannot be excluded by law.</p>
      </LegalSection>

      <LegalSection title="7. Force majeure">
        <p>We shall not be liable for any failure or delay in performance caused by events outside our reasonable control, including severe weather, industrial action, or governmental restrictions.</p>
      </LegalSection>

      <LegalSection title="8. Governing law">
        <p>These terms are governed by the laws of England and Wales. Any dispute shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
      </LegalSection>
    </LegalPage>
  );
}
