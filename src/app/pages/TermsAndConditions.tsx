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

export default function TermsAndConditions() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated="May 25, 2026"
    >
      <p className="text-zinc-300 text-lg leading-relaxed">
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the Multifit Gym
        × Jokko Centeno website and online coaching services. By accessing this website or
        submitting an application, you agree to be bound by these Terms.
      </p>

      <Section title="1. Acceptance of Terms">
        <p>
          By using this website, submitting any form, or engaging Jokko Centeno (&ldquo;the
          Coach&rdquo;) for online coaching services, you confirm that you are at least 18
          years old and that you have read, understood, and agree to these Terms in full. If
          you do not agree, you must not use this website or our services.
        </p>
      </Section>

      <Section title="2. Nature of Coaching Services">
        <p>
          Online coaching provided by Jokko Centeno includes personalized training programs,
          nutrition frameworks, recovery protocols, and ongoing communication via WhatsApp,
          Voxer, or other approved channels. Coaching is delivered remotely and is
          asynchronous unless otherwise agreed.
        </p>
        <p>
          The Coach reserves the right to accept or decline any coaching application at his
          sole discretion.
        </p>
      </Section>

      <Section title="3. Medical Disclaimer">
        <p>
          The information, programs, and services provided by Jokko Centeno are for general
          fitness and educational purposes only and are{" "}
          <span className="text-[#b5e22e] font-semibold">not medical advice</span>. The Coach
          is not a licensed physician, registered dietitian, or medical professional.
        </p>
        <p>
          Before beginning any training, nutrition, or supplementation program, you must
          consult with a qualified medical professional, particularly if you have any
          pre-existing health condition, injury, are pregnant, or are taking any medication.
        </p>
        <p>
          You acknowledge that physical training carries inherent risks, including but not
          limited to muscle strain, joint injury, and cardiovascular stress. You participate
          entirely at your own risk.
        </p>
      </Section>

      <Section title="4. Client Responsibilities">
        <p>As a client, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
          <li>
            Provide accurate, complete, and current information about your health, training
            history, injuries, and lifestyle
          </li>
          <li>Follow the prescribed program at your own pace and within your own limits</li>
          <li>
            Stop training immediately and seek medical advice if you experience pain,
            dizziness, shortness of breath, or any other warning sign
          </li>
          <li>Communicate openly and honestly with the Coach throughout your program</li>
          <li>
            Respect the Coach&apos;s time and reasonable communication windows when sending
            check-ins or questions
          </li>
        </ul>
      </Section>

      <Section title="5. Payment, Refunds & Cancellation">
        <p>
          Coaching fees, billing cycles, and contract length will be communicated to you in
          writing before any program begins. By paying for a program, you accept the agreed
          pricing and minimum commitment period.
        </p>
        <p>
          Unless required by law, coaching fees are{" "}
          <span className="text-[#b5e22e] font-semibold">non-refundable</span> once a program
          has commenced, as the Coach allocates dedicated time and customized programming to
          each client. Cancellation policies for ongoing subscriptions will be detailed in
          your individual coaching agreement.
        </p>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          All training programs, nutrition plans, written materials, videos, branding, and
          content provided through this website or your coaching program are the exclusive
          intellectual property of Jokko Centeno and Multifit Gym.
        </p>
        <p>You may not, without prior written consent:</p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
          <li>Resell, redistribute, or republish any coaching content</li>
          <li>Share your personal coaching program with non-clients</li>
          <li>Use any Multifit or Jokko Centeno branding for your own commercial purposes</li>
        </ul>
      </Section>

      <Section title="7. Results Disclaimer">
        <p>
          Testimonials and transformation stories shown on this website reflect the
          experiences of individual clients. Fitness, body composition, and performance
          results vary significantly based on genetics, consistency, lifestyle, sleep,
          nutrition, and many other factors.
        </p>
        <p>
          We make no guarantee that you will achieve the same or similar results. Your success
          ultimately depends on your own effort, discipline, and adherence to the program.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Jokko Centeno, Multifit Gym, and any of
          their representatives shall not be liable for any direct, indirect, incidental,
          consequential, or special damages arising from your use of this website or our
          coaching services, including but not limited to personal injury, illness, loss of
          income, or emotional distress.
        </p>
        <p>
          You expressly release and discharge the Coach and Multifit Gym from any and all
          claims arising out of your participation in any training program.
        </p>
      </Section>

      <Section title="9. Third-Party Links & Services">
        <p>
          This website and our coaching services may reference or link to third-party tools
          (such as WhatsApp, Voxer, or training apps). We are not responsible for the content,
          policies, or practices of those third parties. Your use of them is governed by their
          own terms.
        </p>
      </Section>

      <Section title="10. Privacy">
        <p>
          Your use of this website and our services is also governed by our{" "}
          <a
            href="/privacy"
            className="text-[#b5e22e] hover:text-[#c8f03a] underline underline-offset-4 transition-colors"
          >
            Privacy Policy
          </a>
          , which explains how we collect and protect your personal information.
        </p>
      </Section>

      <Section title="11. Governing Law">
        <p>
          These Terms are governed by and construed in accordance with the laws of the
          Republic of the Philippines, without regard to its conflict-of-law principles. Any
          dispute arising out of or relating to these Terms shall be subject to the exclusive
          jurisdiction of the courts of Dumaguete City, Negros Oriental, Philippines.
        </p>
      </Section>

      <Section title="12. Changes to These Terms">
        <p>
          We may revise these Terms from time to time. The &ldquo;Last updated&rdquo; date at
          the top of this page indicates when the latest changes were made. Continued use of
          this website or our services after any update constitutes acceptance of the revised
          Terms.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          For any questions about these Terms, please contact:
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
    </LegalLayout>
  );
}
