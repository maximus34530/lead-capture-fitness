import LegalLayout from "../components/LegalLayout";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-4"
        style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-zinc-300 text-base leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="May 25, 2026"
    >
      <p className="text-zinc-300 text-lg leading-relaxed">
        This Privacy Policy describes how Multifit Gym and Jokko Centeno (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collect, use, and protect your personal
        information when you visit our website or apply for online coaching services.
      </p>

      <Section title="1. Information We Collect">
        <p>
          When you submit an application or contact form on this website, we collect the
          following information:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
          <li>First and last name</li>
          <li>Email address</li>
          <li>WhatsApp / phone number and country code</li>
          <li>
            Any additional information you voluntarily provide about your goals, training
            history, or lifestyle
          </li>
        </ul>
        <p>
          We may also automatically collect limited technical information such as your browser
          type, device type, and general location for analytics and security purposes.
        </p>
      </Section>

      <Section title="2. How We Use Your Information">
        <p>We use the information you provide solely to:</p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
          <li>Review your coaching application and respond to your inquiry</li>
          <li>Contact you directly via WhatsApp, email, or phone</li>
          <li>Build and deliver your personalized coaching program if you become a client</li>
          <li>Improve the performance and security of our website</li>
        </ul>
        <p>
          We do <span className="text-[#b5e22e] font-semibold">not</span> sell, rent, or trade
          your personal information to third parties for marketing purposes.
        </p>
      </Section>

      <Section title="3. How We Share Your Information">
        <p>
          We only share your personal information with trusted service providers that help us
          operate our business — for example, secure email and messaging platforms (such as
          WhatsApp), cloud hosting, or analytics tools. These providers are bound by
          confidentiality and data protection obligations.
        </p>
        <p>
          We may also disclose information if required by law, court order, or to protect our
          legal rights.
        </p>
      </Section>

      <Section title="4. Data Retention">
        <p>
          We retain your personal information only for as long as necessary to provide our
          services and respond to your inquiries, or as required by applicable law. You may
          request deletion of your data at any time by contacting us (see Section 9).
        </p>
      </Section>

      <Section title="5. Cookies and Analytics">
        <p>
          Our website may use cookies and similar technologies to remember your preferences,
          analyze traffic, and improve user experience. You can control cookies through your
          browser settings. Disabling cookies may affect certain functionality.
        </p>
      </Section>

      <Section title="6. Data Security">
        <p>
          We use industry-standard technical and organizational measures to protect your
          personal information against unauthorized access, alteration, disclosure, or
          destruction. However, no method of transmission over the internet is 100% secure, and
          we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="7. Your Rights">
        <p>Depending on your country of residence, you may have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to or restrict certain processing of your data</li>
          <li>Withdraw consent at any time, where processing is based on consent</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details in Section 9.
        </p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>
          Our services are intended for adults aged 18 and over. We do not knowingly collect
          personal information from anyone under 18. If you believe a minor has provided us with
          personal information, please contact us so we can promptly remove it.
        </p>
      </Section>

      <Section title="9. Contact Us">
        <p>
          If you have any questions about this Privacy Policy or how we handle your information,
          you can reach us at:
        </p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5 mt-2">
          <p className="text-white font-semibold">Multifit Gym · Jokko Centeno</p>
          <p className="text-zinc-400 text-sm mt-1">
            Veterans Avenue, Daro, Dumaguete City, 6200 Negros Oriental, Philippines
          </p>
          <p className="text-zinc-400 text-sm mt-2">
            Phone / WhatsApp:{" "}
            <a
              href="tel:+639679365597"
              className="text-[#b5e22e] hover:text-[#c8f03a] transition-colors"
            >
              +63 967 936 5597
            </a>
          </p>
        </div>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our
          practices or for legal reasons. The &ldquo;Last updated&rdquo; date at the top of this
          page reflects the most recent revision. We encourage you to review this page
          periodically.
        </p>
      </Section>
    </LegalLayout>
  );
}
