import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/gdpr")({
  head: () => ({
    meta: [
      { title: "GDPR Compliance — SJT Coaches" },
      { name: "description", content: "Our commitment to UK GDPR compliance and the rights you hold as a data subject when engaging with SJT Coaches." },
      { property: "og:title", content: "GDPR Compliance — SJT Coaches" },
      { property: "og:description", content: "Our commitment to GDPR and your data subject rights." },
    ],
  }),
  component: GdprPage,
});

function GdprPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="GDPR Compliance"
      intro="SJT Coaches is fully committed to compliance with the UK General Data Protection Regulation (UK GDPR) and the EU GDPR. This page summarises the rights afforded to you and the safeguards we have in place."
      updated="January 2026"
    >
      <LegalSection title="1. Our commitment">
        <p>We treat the protection of personal data as integral to the trust placed in us by our clients. Our processes, partners and infrastructure are aligned with the principles of lawfulness, fairness, transparency, data minimisation, accuracy, storage limitation, integrity and accountability.</p>
      </LegalSection>

      <LegalSection title="2. Your rights as a data subject">
        <p><strong className="text-ink">Right of access</strong> — you can request a copy of the personal data we hold about you.</p>
        <p><strong className="text-ink">Right to rectification</strong> — you can ask us to correct inaccurate or incomplete information.</p>
        <p><strong className="text-ink">Right to erasure</strong> — also known as the right to be forgotten, subject to legal retention obligations.</p>
        <p><strong className="text-ink">Right to restriction</strong> — you can ask us to limit the processing of your data in certain circumstances.</p>
        <p><strong className="text-ink">Right to data portability</strong> — you can receive your data in a structured, machine-readable format.</p>
        <p><strong className="text-ink">Right to object</strong> — you can object to processing based on our legitimate interests or for direct marketing.</p>
        <p><strong className="text-ink">Rights related to automated decision-making</strong> — we do not make decisions about you based solely on automated processing.</p>
      </LegalSection>

      <LegalSection title="3. International transfers">
        <p>Where personal data is transferred outside the United Kingdom or European Economic Area, we rely on adequacy decisions or Standard Contractual Clauses to ensure equivalent protection.</p>
      </LegalSection>

      <LegalSection title="4. Security measures">
        <p>We employ encryption in transit and at rest, role-based access control, regular penetration testing, and ongoing staff training to safeguard personal data against unauthorised access, alteration or loss.</p>
      </LegalSection>

      <LegalSection title="5. Data breach procedures">
        <p>In the unlikely event of a personal data breach likely to result in a risk to your rights and freedoms, we will notify the Information Commissioner's Office within 72 hours and inform affected individuals without undue delay.</p>
      </LegalSection>

      <LegalSection title="6. Data Protection Officer">
        <p>Our Data Protection Officer can be reached at <a href="mailto:dpo@sjtcoaches.co.uk" className="text-champagne-deep underline">dpo@sjtcoaches.co.uk</a> or by post at 12 Berkeley Square, Mayfair, London W1J 6BR.</p>
      </LegalSection>

      <LegalSection title="7. Supervisory authority">
        <p>You have the right to lodge a complaint with the UK Information Commissioner's Office at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-champagne-deep underline">ico.org.uk</a> if you believe we have not handled your data in accordance with the law.</p>
      </LegalSection>
    </LegalPage>
  );
}
