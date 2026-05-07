import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SJT Coaches" },
      { name: "description", content: "How SJT Coaches collects, uses, and safeguards your personal information across our luxury coach hire services." },
      { property: "og:title", content: "Privacy Policy — SJT Coaches" },
      { property: "og:description", content: "How we collect, use, and protect your personal data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your privacy is fundamental to the trust we build with every client. This policy explains what data we collect, why we collect it, and the rights you hold over your information."
      updated="January 2026"
    >
      <LegalSection title="1. Who we are">
        <p>
          SJT Coaches Ltd ("SJT Coaches", "we", "us") is a private coach hire company registered in England and Wales (Company No. 09483721) with its registered office at 12 Berkeley Square, Mayfair, London W1J 6BR. We act as the data controller for personal information processed through our website, concierge service and booking platform.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>We collect information that you provide directly when booking a journey or contacting us, including your name, email address, phone number, billing address, travel itineraries, passenger details, and any special service requirements you share with our concierge team.</p>
        <p>We also collect technical information automatically, such as IP address, browser type, device identifiers, and pages visited, in order to operate the website securely and improve your experience.</p>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <p>Your data is used to deliver the services you request, communicate with you about bookings, process payments, comply with our legal obligations, prevent fraud, and — with your consent — share occasional updates about new routes and members-only experiences.</p>
      </LegalSection>

      <LegalSection title="4. Lawful basis">
        <p>We process personal data under the lawful bases of contract performance, legitimate interest, legal obligation, and consent, as defined under the UK GDPR and the Data Protection Act 2018.</p>
      </LegalSection>

      <LegalSection title="5. Data sharing">
        <p>We never sell your data. We share it only with carefully selected partners who help us deliver your journey — such as chauffeurs, payment processors, and IT providers — all of whom are bound by strict confidentiality agreements.</p>
      </LegalSection>

      <LegalSection title="6. Data retention">
        <p>We retain personal information only for as long as necessary to fulfil the purposes set out in this policy, typically up to seven years for booking and accounting records, in line with HMRC requirements.</p>
      </LegalSection>

      <LegalSection title="7. Your rights">
        <p>You have the right to access, correct, delete, restrict, or port your personal data, and to object to certain processing. To exercise these rights, contact our Data Protection Officer at <a href="mailto:dpo@sjtcoaches.co.uk" className="text-champagne-deep underline">dpo@sjtcoaches.co.uk</a>.</p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>For any privacy-related enquiry, write to us at 12 Berkeley Square, Mayfair, London W1J 6BR, or email <a href="mailto:dpo@sjtcoaches.co.uk" className="text-champagne-deep underline">dpo@sjtcoaches.co.uk</a>. You may also lodge a complaint with the UK Information Commissioner's Office (ICO).</p>
      </LegalSection>
    </LegalPage>
  );
}
