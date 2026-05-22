import { useState, useRef } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Accordion ───────────────────────────────────────────────────────────────

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-zinc-900 transition-colors duration-200"
      >
        <span className="text-white font-semibold text-base pr-4">{question}</span>
        <ChevronDown
          className={`text-[#b5e22e] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function App() {
  const [heroPhone, setHeroPhone] = useState("");
  const [heroCountry, setHeroCountry] = useState("+63");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCountry, setFormCountry] = useState("+63");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSubmitted(true);
    setTimeout(() => scrollToForm(), 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      question: "How does coaching work across different time zones?",
      answer:
        "Coach Jokko operates on a fully asynchronous model built for global professionals. All programming, check-ins, and feedback are delivered via app and Voxer/WhatsApp — designed to work perfectly across US, UK, European, and Southeast Asian time zones. You never need to align calendars for a live call unless you book a dedicated monthly review.",
    },
    {
      question: "What happens after I submit the application form?",
      answer:
        "Coach Jokko personally reviews every application and will text you directly on WhatsApp within 12–24 hours of submission. No automated funnel. No sales team. Just a direct message from him to understand your goals and confirm whether you're a strong fit for the program.",
    },
    {
      question: "Do I need specific equipment or a gym membership?",
      answer:
        "No. Every program is fully adapted to your available setup — whether that's a full commercial gym, a hotel gym, or a basic set of dumbbells at home. Coach Jokko's methodology forged at Multifit is equipment-agnostic by design, built for athletes who travel, relocate, or have unpredictable access.",
    },
    {
      question: "Is this templated programming or fully personalized coaching?",
      answer:
        "This is fully dynamic, human-led coaching — not a static PDF dropped in a shared folder. You receive weekly updated training blocks, video form analysis and real-time technique corrections, and monthly 1-on-1 performance dashboards. The Executive and Football tiers additionally include daily WhatsApp check-ins with Coach Jokko himself.",
    },
  ];

  const countryCodes = ["+63", "+1", "+44", "+61", "+65", "+971", "+49", "+33"];

  return (
    <div
      className="min-h-screen bg-[#09090b] text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ── STICKY HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-[#b5e22e] font-black text-lg tracking-tight uppercase">
              MULTIFIT
            </span>
            <span className="text-zinc-500 font-light text-lg">×</span>
            <span className="text-white font-black text-lg tracking-tight uppercase">JOKKO</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#programs"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              Programs
            </a>
            <a
              href="#about"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              About
            </a>
            <a
              href="#gym"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              Our Gym
            </a>
          </nav>
          <button
            onClick={scrollToForm}
            className="bg-[#b5e22e] text-black text-sm font-bold px-5 py-2.5 rounded-sm uppercase tracking-wider hover:bg-[#c8f03a] transition-colors duration-200"
          >
            Apply for Coaching
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1000&fit=crop&auto=format"
            alt="Elite gym training"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-[#09090b]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
        </div>

        {/* Neon accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#b5e22e] to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#b5e22e]" />
              <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                Multifit Gym · Dumaguete City, Philippines
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight uppercase mb-6"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              <span className="block text-white">Engineered</span>
              <span className="block text-white">at Multifit.</span>
              <span className="block text-[#b5e22e]">Delivered</span>
              <span className="block text-white">Worldwide.</span>
            </h1>

            <p className="text-zinc-300 text-lg leading-relaxed mb-10 max-w-xl">
              Elite online coaching for busy professionals, hybrid athletes, and competitors — built
              on real methodology from a real facility.
            </p>

            {/* Hero Lead Capture */}
            <div className="bg-zinc-900/80 border border-zinc-700/60 rounded-sm p-6 max-w-lg backdrop-blur-sm">
              {heroSubmitted ? (
                <div className="flex items-center gap-3 py-3">
                  <CheckCircle className="text-[#b5e22e]" size={22} />
                  <div>
                    <p className="text-white font-semibold">Slot request received.</p>
                    <p className="text-zinc-400 text-sm">Complete your application below.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    Secure Your Coaching Slot
                  </p>
                  <form onSubmit={handleHeroSubmit} className="flex gap-2">
                    <div className="flex flex-1 border border-zinc-700 rounded-sm overflow-hidden bg-zinc-800/60 focus-within:border-[#b5e22e] transition-colors">
                      <select
                        value={heroCountry}
                        onChange={(e) => setHeroCountry(e.target.value)}
                        className="bg-transparent text-zinc-300 text-sm px-2 py-3 outline-none border-r border-zinc-700"
                      >
                        {countryCodes.map((c) => (
                          <option key={c} value={c} className="bg-zinc-900">
                            {c}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={heroPhone}
                        onChange={(e) => setHeroPhone(e.target.value)}
                        placeholder="WhatsApp / Phone"
                        required
                        className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-sm px-3 py-3 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#b5e22e] text-black font-bold text-sm px-5 py-3 rounded-sm hover:bg-[#c8f03a] transition-colors uppercase tracking-wide shrink-0"
                    >
                      Secure Slot
                    </button>
                  </form>
                  <p className="text-zinc-600 text-xs mt-3">
                    No spam. Coach Jokko texts you directly on WhatsApp within 24 hrs.
                  </p>
                </>
              )}
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6 mt-8">
              {[
                { icon: Globe, text: "Coaching in 12+ Countries" },
                { icon: Shield, text: "Real Gym. Real Coach." },
                { icon: TrendingUp, text: "High-Ticket Results" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={14} className="text-[#b5e22e]" />
                  <span className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHYSICAL BASE PROOF ── */}
      <section id="gym" className="py-24 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#b5e22e]" />
                <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                  Physical Base
                </span>
              </div>
              <h2
                className="text-4xl lg:text-5xl font-black uppercase leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
              >
                <span className="text-white">The Gym Where</span>
                <br />
                <span className="text-[#b5e22e]">The Methods</span>
                <br />
                <span className="text-white">Were Forged.</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Most online coaches sell you a PDF and a login. Jokko&apos;s programming is
                developed, tested, and refined daily inside a real facility — Multifit Gym in
                Dumaguete City. Every protocol you receive online has been proven on real athletes
                in person first.
              </p>
              <div className="space-y-3">
                {[
                  "Full commercial strength & conditioning floor",
                  "Home of elite local and expatriate athletes",
                  "Daily in-person sessions informing online methodology",
                  "Flagship training environment since founding",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#b5e22e] shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                <MapPin size={16} className="text-[#b5e22e] shrink-0" />
                <span className="text-zinc-300 text-sm">
                  Veterans Avenue, Daro, Dumaguete City, 6200 Negros Oriental, Philippines
                </span>
              </div>
            </div>

            {/* Right: Facility Visual */}
            <div className="relative">
              <div className="relative rounded-sm overflow-hidden bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&auto=format"
                  alt="Multifit Gym training floor"
                  className="w-full h-80 lg:h-96 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                {/* Grid overlay accent */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(181,226,46,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(181,226,46,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 border border-[#b5e22e]/30 rounded-sm px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#b5e22e] text-xs font-bold uppercase tracking-widest">
                          Multifit Gym
                        </p>
                        <p className="text-zinc-300 text-xs mt-0.5">Dumaguete City · Est. 2018</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="text-[#b5e22e] fill-[#b5e22e]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -top-4 -right-4 bg-[#b5e22e] text-black rounded-sm px-4 py-3 font-black">
                <p className="text-2xl leading-none">6+</p>
                <p className="text-xs font-bold uppercase tracking-wide">Yrs Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-24 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#b5e22e]" />
              <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                Programs
              </span>
              <div className="h-px w-8 bg-[#b5e22e]" />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              Choose Your Track
            </h2>
            <p className="text-zinc-400 mt-3 max-w-lg mx-auto">
              Every tier is built on real-world methodology. Pick the one that fits your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Hybrid Blueprint */}
            <div className="border border-zinc-800 rounded-sm p-6 bg-zinc-900/40 hover:border-zinc-600 transition-all duration-300 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} className="text-[#b5e22e]" />
                  <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-widest">
                    Foundation
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                  The Multifit Hybrid Blueprint
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Online adaptation of functional strength, bodybuilding, and conditioning
                  methodologies forged directly in his flagship facility.
                </p>
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl font-black text-white"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  $149
                </span>
                <span className="text-zinc-500 text-sm ml-2">/ month</span>
              </div>

              <p className="text-zinc-500 text-xs uppercase tracking-wide mb-4 font-semibold">
                Best for local & international fitness enthusiasts
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Custom Strength & Conditioning Blocks (updated weekly)",
                  "Multifit Gym Signature Hybrid Mobility Routine",
                  "Video Form Analysis & Technique Corrections via app",
                  "Monthly 1-on-1 Performance Review Dashboards",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#b5e22e] shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToForm}
                className="w-full border border-[#b5e22e] text-[#b5e22e] font-bold text-sm py-3 rounded-sm hover:bg-[#b5e22e] hover:text-black transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Apply for a Slot <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 2 — Executive (Most Popular) */}
            <div className="border-2 border-[#b5e22e] rounded-sm p-6 bg-zinc-900/70 relative flex flex-col shadow-[0_0_40px_rgba(181,226,46,0.12)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#b5e22e] text-black text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={14} className="text-[#b5e22e] fill-[#b5e22e]" />
                  <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-widest">
                    Premium
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                  The Executive Transformation
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  High-touch coaching built specifically for busy remote workers, entrepreneurs, and
                  global expats who refuse to let a demanding career kill their physique.
                </p>
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl font-black text-[#b5e22e]"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  $299
                </span>
                <span className="text-zinc-500 text-sm ml-2">/ month</span>
              </div>

              <p className="text-zinc-500 text-xs uppercase tracking-wide mb-4 font-semibold">
                Premium high-touch for busy professionals & expats
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Turnkey 15-to-45 Min Time-Efficient Workouts (Home or Gym)",
                  "Bespoke Macro & Nutrition Blueprint (Expat/Travel-friendly)",
                  "Daily Voxer/WhatsApp Accountability & Mindset Check-ins",
                  "Travel & Jet-Lag Routine Adjustments",
                  "Custom Habit Tracking System (Sleep, Stress, Hydration)",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#b5e22e] shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToForm}
                className="w-full bg-[#b5e22e] text-black font-bold text-sm py-3 rounded-sm hover:bg-[#c8f03a] transition-colors duration-200 uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Apply for a Slot <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3 — Football */}
            <div className="border border-zinc-800 rounded-sm p-6 bg-zinc-900/40 hover:border-zinc-600 transition-all duration-300 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-[#b5e22e]" />
                  <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-widest">
                    Sport-Specific
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                  Elite Football Conditioning
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Specialized training for recreational and competitive football players looking to
                  dominate speed, agility, and game-day stamina.
                </p>
              </div>

              <div className="mb-6">
                <span
                  className="text-4xl font-black text-white"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  $199
                </span>
                <span className="text-zinc-500 text-sm ml-2">/ month</span>
              </div>

              <p className="text-zinc-500 text-xs uppercase tracking-wide mb-4 font-semibold">
                For recreational & competitive pitch players
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Pitch-Specific Agility, Acceleration & Stamina Cycles",
                  "Lower-Limb Injury Prevention & Prehab Programming",
                  "Match-Day Nutrition & Hydration Protocols",
                  "Post-Game Active Recovery Workouts",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#b5e22e] shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToForm}
                className="w-full border border-[#b5e22e] text-[#b5e22e] font-bold text-sm py-3 rounded-sm hover:bg-[#b5e22e] hover:text-black transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Apply for a Slot <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#b5e22e]" />
              <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                Client Results
              </span>
              <div className="h-px w-8 bg-[#b5e22e]" />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              Transformations That Speak
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors duration-300">
              <div className="mb-4">
                <span
                  className="text-3xl font-black text-[#b5e22e] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  −13kg Fat Loss
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                "I was skeptical about remote coaching — I travel 3 weeks a month and thought
                consistency was impossible. Jokko built me a system around my life, not the other
                way around. 13kg down in 5 months, without a single missed week. The fact that he
                trains people in an actual gym every day makes a massive difference — this
                isn&apos;t theory."
              </p>
              <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">David K.</p>
                  <p className="text-zinc-500 text-xs">Remote Tech Director</p>
                </div>
                <span className="text-zinc-600 text-xs uppercase tracking-wide">
                  🇬🇧 London, UK
                </span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors duration-300">
              <div className="mb-4">
                <span
                  className="text-3xl font-black text-[#b5e22e] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  +35kg Squat Power
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                "I play recreational football on weekends and always wanted to improve my
                acceleration and reduce injury risk. Coach Jokko&apos;s football conditioning
                program is insane. The prehab work alone changed how I move on the pitch. My
                explosive pace in the last 20 minutes of a match is now my biggest weapon. Plus 35
                kilos on my squat in 3 months."
              </p>
              <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">Miggy P.</p>
                  <p className="text-zinc-500 text-xs">Football Athlete</p>
                </div>
                <span className="text-zinc-600 text-xs uppercase tracking-wide">
                  🇵🇭 Cebu, Philippines
                </span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors duration-300">
              <div className="mb-4">
                <span
                  className="text-3xl font-black text-[#b5e22e] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  8% Body Fat Dropped
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                "As an expat executive juggling global meetings and constant relocations, I had zero
                margin for a complicated fitness routine. The Executive Transformation is exactly
                what the name says — every workout is 30–45 mins max, the macro plan travels with
                me across cuisines and countries, and Jokko&apos;s daily WhatsApp check-ins keep me
                accountable on days I would have otherwise quit."
              </p>
              <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">Elena R.</p>
                  <p className="text-zinc-500 text-xs">Expat Executive</p>
                </div>
                <span className="text-zinc-600 text-xs uppercase tracking-wide">
                  🇦🇪 Dubai, UAE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=700&h=800&fit=crop&auto=format&face"
                alt="Coach Jokko Centeno at Multifit Gym"
                className="w-full h-[480px] object-cover rounded-sm opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent rounded-sm" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "200+", label: "Athletes Coached" },
                    { val: "12+", label: "Countries" },
                    { val: "6+", label: "Years" },
                  ].map(({ val, label }) => (
                    <div key={label} className="bg-black/70 border border-zinc-800 rounded-sm p-3 text-center backdrop-blur-sm">
                      <p
                        className="text-[#b5e22e] text-xl font-black"
                        style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                      >
                        {val}
                      </p>
                      <p className="text-zinc-400 text-xs uppercase tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#b5e22e]" />
                <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                  The Coach
                </span>
              </div>
              <h2
                className="text-4xl lg:text-5xl font-black uppercase leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
              >
                <span className="text-white">Jokko Centeno</span>
                <br />
                <span className="text-[#b5e22e]">Hybrid Fitness</span>
                <br />
                <span className="text-white">Expert & Gym Owner</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Coach Jokko built Multifit Gym from the ground up in Dumaguete City — a fully
                operational commercial training facility that serves elite local athletes and
                expatriate professionals daily. His programming philosophy isn&apos;t drawn from
                certification textbooks. It&apos;s drawn from years of live coaching on a real gym
                floor.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                His online coaching extends that same methodology globally — adapted for time zones,
                travel schedules, and the realities of a demanding professional life. If you want
                coaching built on real-world evidence, not algorithm-generated templates, this is
                it.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#b5e22e]" />
                  <span className="text-zinc-300 text-sm font-medium">Hybrid Fitness Expert</span>
                </div>
                <div className="w-px h-4 bg-zinc-700" />
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#b5e22e]" />
                  <span className="text-zinc-300 text-sm font-medium">Dumaguete City, PH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 border-t border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#b5e22e]" />
              <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                FAQ
              </span>
              <div className="h-px w-8 bg-[#b5e22e]" />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-sm">
              Everything you need to know before securing your coaching slot.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM ── */}
      <section ref={formRef} className="py-24 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#b5e22e]" />
              <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                Apply Now
              </span>
              <div className="h-px w-8 bg-[#b5e22e]" />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              Secure Your Slot
            </h2>
            <p className="text-zinc-400 text-sm">
              Limited coaching slots available. Coach Jokko personally reviews every application.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-sm p-8">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#b5e22e]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="text-[#b5e22e]" size={32} />
                </div>
                <h3 className="text-white text-xl font-black uppercase mb-2">
                  Application Received
                </h3>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                  Coach Jokko will text you directly on WhatsApp within 12–24 hours to discuss your
                  goals and confirm your fit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your first name"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-[#b5e22e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-[#b5e22e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="flex border border-zinc-700 rounded-sm overflow-hidden bg-zinc-800 focus-within:border-[#b5e22e] transition-colors duration-200">
                    <select
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="bg-zinc-700 text-zinc-300 text-sm px-3 py-3 outline-none border-r border-zinc-600"
                    >
                      {countryCodes.map((c) => (
                        <option key={c} value={c} className="bg-zinc-900">
                          {c}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Your WhatsApp number"
                      required
                      className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-sm px-4 py-3 outline-none"
                    />
                  </div>
                  <p className="text-zinc-600 text-xs mt-2">
                    Coach Jokko will contact you directly via WhatsApp.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#b5e22e] text-black font-black text-sm py-4 rounded-sm hover:bg-[#c8f03a] transition-colors duration-200 uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
                >
                  Submit My Application <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/60 bg-[#09090b] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Col 1 — Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#b5e22e] font-black text-lg tracking-tight uppercase">
                  MULTIFIT
                </span>
                <span className="text-zinc-600 font-light">×</span>
                <span className="text-white font-black text-lg tracking-tight uppercase">
                  ONLINE
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                Global remote coaching grounded in a real facility. Elite programming for
                professionals, hybrid athletes, and competitors worldwide.
              </p>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#b5e22e] mt-0.5 shrink-0" />
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Veterans Avenue, Daro,
                  <br />
                  Dumaguete City, 6200
                  <br />
                  Negros Oriental, Philippines
                </p>
              </div>
            </div>

            {/* Col 2 — Gym Hours */}
            <div>
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-5">
                Multifit Gym Hours
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#b5e22e]" />
                  <div>
                    <p className="text-zinc-300 text-sm font-medium">Monday – Saturday</p>
                    <p className="text-zinc-500 text-xs">6:00 AM – 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-zinc-600" />
                  <div>
                    <p className="text-zinc-300 text-sm font-medium">Sunday</p>
                    <p className="text-zinc-500 text-xs">9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 — Contact */}
            <div>
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-5">
                Quick Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#b5e22e]" />
                  <a
                    href="tel:+639679365597"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    +63 967 936 5597
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram size={13} className="text-[#b5e22e]" />
                  <a
                    href="#"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    @bossjoko09
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Facebook size={13} className="text-[#b5e22e]" />
                  <a
                    href="#"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    Multifit Gym
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-xs">
              © {new Date().getFullYear()} Multifit Gym · Jokko Centeno. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                Privacy Policy
              </a>
              <span className="text-zinc-800 text-xs px-3 py-1 border border-zinc-800 rounded-full">
                Powered by Next.js & Supabase
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
