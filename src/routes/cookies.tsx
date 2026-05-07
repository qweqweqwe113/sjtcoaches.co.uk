import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — SJT Coaches" },
      { name: "description", content: "Details of the cookies and tracking technologies used on the SJT Coaches website and how to manage your preferences." },
      { property: "og:title", content: "Cookie Policy — SJT Coaches" },
      { property: "og:description", content: "How we use cookies and how you can manage your preferences." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="This Cookie Policy explains what cookies are, how we use them, and the choices available to you when visiting our website."
      updated="January 2026"
    >
      <LegalSection title="1. What are cookies?">
        <p>Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, understand how it is being used, and provide a smoother experience on subsequent visits.</p>
      </LegalSection>

      <LegalSection title="2. Categories of cookies we use">
        <p><strong className="text-ink">Strictly necessary cookies</strong> — required for the website to function, including security and session management. These cannot be disabled.</p>
        <p><strong className="text-ink">Performance cookies</strong> — collect anonymous information about how visitors use the site, allowing us to improve its performance.</p>
        <p><strong className="text-ink">Functional cookies</strong> — remember choices you make, such as language and region, to deliver a more personalised experience.</p>
        <p><strong className="text-ink">Marketing cookies</strong> — used to deliver relevant advertising on third-party platforms. Set only with your explicit consent.</p>
      </LegalSection>

      <LegalSection title="3. Managing your preferences">
        <p>You can accept or decline non-essential cookies via the consent banner displayed on your first visit. You may also clear or block cookies at any time through your browser settings; please note that disabling certain cookies may affect site functionality.</p>
      </LegalSection>

      <LegalSection title="4. Third-party services">
        <p>Some cookies are placed by trusted third-party services we use, such as analytics, mapping providers, and payment processors. Each operates under its own privacy policy.</p>
      </LegalSection>

      <LegalSection title="5. Updates to this policy">
        <p>We may update this Cookie Policy from time to time. The "Last updated" date at the top reflects the most recent revision.</p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>For questions about our use of cookies, contact us at <a href="mailto:privacy@sjtcoaches.co.uk" className="text-champagne-deep underline">privacy@sjtcoaches.co.uk</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
