import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Play,
} from "lucide-react";
import {
  heroImage,
  facilityImage,
  coachImage,
  galleryImages,
  coachIntroVideo,
} from "../gym-images";
import { supabase } from "../../lib/supabase";

// ─── Scroll Reveal ──────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-[800ms] ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Parallax ───────────────────────────────────────────────────────────────

function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const sectionMid = rect.top + rect.height / 2;
      const offset = (sectionMid - vh / 2) * speed * -1;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return ref;
}

// ─── Smooth Scroll (eased, header-aware) ────────────────────────────────────

const HEADER_OFFSET = 80;

function smoothScrollTo(targetY: number, duration = 1100) {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.scrollTo(0, targetY);
    return;
  }
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 4) return;
  const startTime = performance.now();
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  const targetY =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  smoothScrollTo(targetY);
}

// ─── Coach Video Player ──────────────────────────────────────────────────────

function CoachVideoPlayer({ src, poster }: { src: string; poster: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        controls
        playsInline
        className="w-full h-[480px] object-cover rounded-sm bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play coach intro video"
      className="group relative w-full h-[480px] rounded-sm overflow-hidden block cursor-pointer"
    >
      <img
        src={poster}
        alt="Coach Jokko Centeno at Multifit Gym"
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#b5e22e] text-black rounded-full p-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(181,226,46,0.45)]">
          <Play size={28} fill="currentColor" className="ml-1" />
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <span className="text-[#b5e22e] text-[10px] font-bold uppercase tracking-widest bg-black/70 border border-[#b5e22e]/30 px-2.5 py-1 rounded-sm backdrop-blur-sm">
          ▶ Watch · Meet Coach Jokko
        </span>
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LandingPage() {
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCountry, setFormCountry] = useState("PH");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useParallax<HTMLImageElement>(0.14);
  const facilityBgRef = useParallax<HTMLImageElement>(0.08);

  const scrollToForm = () => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const targetY =
      rect.top +
      window.scrollY -
      (window.innerHeight - rect.height) / 2;
    smoothScrollTo(Math.max(targetY, 0));
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitting) return;
    setFormSubmitting(true);
    setFormError(null);

    const country = countries.find((c) => c.code === formCountry);
    if (!country) {
      setFormError("Please select a country.");
      setFormSubmitting(false);
      return;
    }

    const { error } = await supabase.from("leads").insert({
      source: "main",
      first_name: formFirstName.trim(),
      last_name: formLastName.trim(),
      email: formEmail.trim().toLowerCase(),
      country_code: formCountry,
      dial_code: country.dial,
      phone: formPhone.trim(),
    });

    if (error) {
      console.error("Main lead insert failed:", error);
      setFormError("Couldn't submit your application. Please try again.");
      setFormSubmitting(false);
      return;
    }

    setFormSubmitted(true);
    setFormSubmitting(false);
  };

  const countries = [
    { code: "PH", flag: "🇵🇭", name: "Philippines", dial: "+63" },
    { code: "US", flag: "🇺🇸", name: "United States", dial: "+1" },
    { code: "CA", flag: "🇨🇦", name: "Canada", dial: "+1" },
    { code: "GB", flag: "🇬🇧", name: "United Kingdom", dial: "+44" },
    { code: "AU", flag: "🇦🇺", name: "Australia", dial: "+61" },
    { code: "SG", flag: "🇸🇬", name: "Singapore", dial: "+65" },
    { code: "MY", flag: "🇲🇾", name: "Malaysia", dial: "+60" },
    { code: "HK", flag: "🇭🇰", name: "Hong Kong", dial: "+852" },
    { code: "JP", flag: "🇯🇵", name: "Japan", dial: "+81" },
    { code: "AE", flag: "🇦🇪", name: "UAE", dial: "+971" },
    { code: "SA", flag: "🇸🇦", name: "Saudi Arabia", dial: "+966" },
    { code: "DE", flag: "🇩🇪", name: "Germany", dial: "+49" },
    { code: "FR", flag: "🇫🇷", name: "France", dial: "+33" },
    { code: "ES", flag: "🇪🇸", name: "Spain", dial: "+34" },
    { code: "IT", flag: "🇮🇹", name: "Italy", dial: "+39" },
    { code: "NL", flag: "🇳🇱", name: "Netherlands", dial: "+31" },
  ];

  const formDial = countries.find((c) => c.code === formCountry)?.dial ?? "";

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
              onClick={(e) => handleNavClick(e, "#programs")}
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              Programs
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              About
            </a>
            <a
              href="#gym"
              onClick={(e) => handleNavClick(e, "#gym")}
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors tracking-wide uppercase"
            >
              Our Gym
            </a>
          </nav>
          <button
            onClick={scrollToForm}
            className="bg-[#b5e22e] text-black text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-sm uppercase tracking-wider hover:bg-[#c8f03a] transition-colors duration-200 whitespace-nowrap"
          >
            <span className="sm:hidden">Apply</span>
            <span className="hidden sm:inline">Apply for Coaching</span>
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={heroBgRef}
            src={heroImage}
            alt="Elite gym training"
            className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover opacity-20 will-change-transform"
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
              <div className="h-px w-8 bg-[#b5e22e] shrink-0" />
              <span className="text-[#b5e22e] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                Multifit Gym · Dumaguete City, Philippines
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight uppercase mb-6"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              <span className="block text-white">Engineered</span>
              <span className="block text-white">at Multifit.</span>
              <span className="block text-[#b5e22e]">Delivered</span>
              <span className="block text-white">Worldwide.</span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              Jokko Centeno — International Fitness Expert & Gym Owner. Elite online coaching for
              busy professionals. Built at Multifit Gym, Dumaguete City.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-lg">
              <button
                type="button"
                onClick={scrollToForm}
                className="group bg-[#b5e22e] text-black font-black text-sm sm:text-base px-7 py-4 rounded-sm hover:bg-[#c8f03a] transition-all duration-200 uppercase tracking-widest inline-flex items-center justify-center gap-2 shadow-[0_0_32px_rgba(181,226,46,0.25)] hover:shadow-[0_0_44px_rgba(181,226,46,0.4)]"
              >
                Apply for Coaching
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
              <p className="text-zinc-500 text-xs leading-relaxed">
                No spam. Coach Jokko texts you directly on WhatsApp within 24 hrs.
              </p>
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
            <Reveal>
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
                  "Real rooftop gym floor — not a home-workout PDF shop",
                  "International credibility from a licensed hybrid performance facility",
                  "Systems built for busy professionals — not weekend hobbyists",
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
            </Reveal>

            {/* Right: Facility Visual */}
            <Reveal delay={140} className="relative">
              <div className="relative rounded-sm overflow-hidden bg-zinc-900 h-80 lg:h-96">
                <img
                  ref={facilityBgRef}
                  src={facilityImage}
                  alt="Multifit Gym training floor"
                  className="absolute inset-x-0 -top-[10%] w-full h-[120%] object-cover opacity-80 will-change-transform"
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
                        <p className="text-zinc-300 text-xs mt-0.5">Dumaguete City · Est. 2022</p>
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
                <p className="text-2xl leading-none">4</p>
                <p className="text-xs font-bold uppercase tracking-wide">Yrs Experience</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── INSIDE MULTIFIT — auto-rendered photo gallery ── */}
      {galleryImages.length > 0 && (
        <section className="py-24 border-t border-zinc-800/60 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-8 bg-[#b5e22e]" />
                    <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                      Inside Multifit
                    </span>
                  </div>
                  <h2
                    className="text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight"
                    style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                  >
                    <span className="text-white">The Floor.</span>{" "}
                    <span className="text-[#b5e22e]">The Iron.</span>{" "}
                    <span className="text-white">The Standard.</span>
                  </h2>
                </div>
                <p className="text-zinc-400 text-sm max-w-md">
                  A look inside the facility where every program is built, tested, and refined
                  daily — Dumaguete City, Philippines.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {galleryImages.map((src, i) => (
                <Reveal
                  key={src}
                  delay={Math.min(i * 60, 360)}
                  className={`group relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 ${
                    i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Multifit Gym interior ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[#b5e22e] text-[10px] font-bold uppercase tracking-widest">
                      Multifit · Dumaguete
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-24 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#b5e22e]" />
                <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                  The Blueprint
                </span>
                <div className="h-px w-8 bg-[#b5e22e]" />
              </div>
              <h2
                className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
              >
                When You Train <span className="text-[#b5e22e]">Under Jokko</span>
              </h2>
              <p className="text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
                From the day you apply to the day you don&apos;t recognize the man (or woman) in
                the mirror — this is the exact path Jokko walks every client down.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical timeline accent */}
              <div className="absolute left-[31px] top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-[#b5e22e]/30 to-transparent hidden md:block" />

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "The Intake",
                    description:
                      "After your application, Jokko personally reviews your goals, lifestyle, training history, injuries, and time constraints. No assistants. No templates. The first conversation that shapes everything that follows.",
                    bullets: [
                      "Personal WhatsApp message from Jokko within 12–24 hours",
                      "Full audit: lifestyle, training history, injuries, time, goals",
                      "Honest fit assessment — he turns clients away when it isn't right",
                    ],
                  },
                  {
                    num: "02",
                    title: "The Blueprint",
                    description:
                      "Jokko architects your custom 90-day training, nutrition, and recovery system — engineered around your gym access, travel schedule, and the realities of your life. Not a template sold to a thousand people. Yours.",
                    bullets: [
                      "Personalized 90-day training arc with weekly progression",
                      "Nutrition framework built for your cuisine, country, and travel",
                      "Recovery, sleep, and stress protocols tuned to your load",
                    ],
                  },
                  {
                    num: "03",
                    title: "The Execution",
                    description:
                      "You train. Jokko coaches. Every rep, every meal, every check-in tracked. Daily Voxer/WhatsApp accountability so you never train alone and never have to figure anything out by yourself.",
                    bullets: [
                      "Daily WhatsApp / Voxer check-ins with Jokko himself",
                      "Video form analysis on every key lift",
                      "Real-time programming adjustments — not week-late corrections",
                    ],
                  },
                  {
                    num: "04",
                    title: "The Review",
                    description:
                      "Every 30 days: a full 1-on-1 performance review. Strength numbers, body composition, sleep, energy, mood. We look at what's working, what isn't, and recalibrate the next block.",
                    bullets: [
                      "Monthly 1-on-1 performance dashboard",
                      "Data-driven adjustments — no guessing, no vibes",
                      "Recalibrated next 30 days based on what your body actually did",
                    ],
                  },
                  {
                    num: "05",
                    title: "The Transformation",
                    description:
                      "By month three, you're not on a program. You're a different person. Stronger. Leaner. Sharper. The body, energy, and presence that match the next chapter of your life.",
                    bullets: [
                      "Visible, measurable physical transformation",
                      "The discipline and identity that outlast the coaching itself",
                      "Methodology you've internalized — yours for life",
                    ],
                  },
                ].map((step, idx) => (
                  <Reveal
                    key={step.num}
                    delay={idx * 90}
                    className="relative grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6 items-start"
                  >
                    {/* Numbered marker */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 bg-[#09090b] border-2 border-[#b5e22e] rounded-sm flex items-center justify-center shadow-[0_0_24px_rgba(181,226,46,0.18)]">
                        <span
                          className="text-[#b5e22e] text-2xl font-black"
                          style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                        >
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Step content */}
                    <div className="border border-zinc-800 rounded-sm p-6 bg-zinc-900/40 hover:border-zinc-700 transition-colors duration-300">
                      <p className="text-[#b5e22e] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                        Step {step.num}
                      </p>
                      <h3
                        className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-3 leading-tight"
                        style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                        {step.description}
                      </p>
                      <ul className="space-y-2.5">
                        {step.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <CheckCircle
                              size={14}
                              className="text-[#b5e22e] shrink-0 mt-0.5"
                            />
                            <span className="text-zinc-300 text-sm leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <Reveal className="text-center mt-14">
              <p className="text-zinc-400 text-sm mb-5 max-w-md mx-auto">
                Every transformation Jokko has guided started exactly the same way — with Step 01.
              </p>
              <button
                onClick={scrollToForm}
                className="bg-[#b5e22e] text-black font-black text-sm px-8 py-4 rounded-sm hover:bg-[#c8f03a] transition-colors duration-200 uppercase tracking-widest inline-flex items-center justify-center gap-2"
              >
                Start at Step 01 <ArrowRight size={16} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
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
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 — Didn't know how to lift */}
            <Reveal
              delay={0}
              className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors duration-300"
            >
              <div className="mb-4">
                <span
                  className="text-3xl font-black text-[#b5e22e] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  From Zero To Confident
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                "Never lifted before in my life. Coach Jokko walked me through every basic movement
                on WhatsApp and fixed my form rep by rep. 4 months in and I actually look forward
                to gym days now."
              </p>
              <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">Carlo M.</p>
                  <p className="text-zinc-500 text-xs">Software Engineer</p>
                </div>
                <span className="text-zinc-600 text-xs uppercase tracking-wide">
                  🇵🇭 Cebu City, PH
                </span>
              </div>
            </Reveal>

            {/* Testimonial 2 — Accountability */}
            <Reveal
              delay={120}
              className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors duration-300"
            >
              <div className="mb-4">
                <span
                  className="text-3xl font-black text-[#b5e22e] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  −12kg, 5x A Week
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                "Every January I&apos;d sign up, by February tapos na. Coach Jokko texts me every
                morning — &lsquo;Bro, anong oras gym today?&rsquo; Yun lang. 7 months straight, 12
                kilos down."
              </p>
              <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">Joey R.</p>
                  <p className="text-zinc-500 text-xs">Sales Manager</p>
                </div>
                <span className="text-zinc-600 text-xs uppercase tracking-wide">
                  🇵🇭 Dumaguete City, PH
                </span>
              </div>
            </Reveal>

            {/* Testimonial 3 — Didn't know what to eat */}
            <Reveal
              delay={240}
              className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors duration-300"
            >
              <div className="mb-4">
                <span
                  className="text-3xl font-black text-[#b5e22e] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
                >
                  −14kg Eating Filipino Food
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                "Thought I had to give up rice and adobo forever. Coach built me a plan around
                actual Filipino food. Down 14 kilos in 6 months and it never felt like a diet."
              </p>
              <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">Mariel V.</p>
                  <p className="text-zinc-500 text-xs">Nurse</p>
                </div>
                <span className="text-zinc-600 text-xs uppercase tracking-wide">
                  🇵🇭 Iloilo City, PH
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="relative">
              {coachIntroVideo ? (
                <>
                  <CoachVideoPlayer src={coachIntroVideo} poster={coachImage} />
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { val: "200+", label: "Athletes Coached" },
                      { val: "12+", label: "Countries" },
                      { val: "4+", label: "Years" },
                    ].map(({ val, label }) => (
                      <div
                        key={label}
                        className="bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-center"
                      >
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
                </>
              ) : (
                <>
                  <img
                    src={coachImage}
                    alt="Coach Jokko Centeno at Multifit Gym"
                    className="w-full h-[480px] object-cover rounded-sm opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent rounded-sm" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: "200+", label: "Athletes Coached" },
                        { val: "12+", label: "Countries" },
                        { val: "4+", label: "Years" },
                      ].map(({ val, label }) => (
                        <div
                          key={label}
                          className="bg-black/70 border border-zinc-800 rounded-sm p-3 text-center backdrop-blur-sm"
                        >
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
                </>
              )}
            </Reveal>
            <Reveal delay={140}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOCIAL — Verify the coach is real ── */}
      <section className="py-16 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="bg-zinc-900/60 border border-zinc-800 rounded-sm p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#b5e22e]" />
              <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
                See The Daily Work
              </span>
              <div className="h-px w-8 bg-[#b5e22e]" />
            </div>
            <h3
              className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
            >
              Real Gym. Real Athletes. <span className="text-[#b5e22e]">Real Daily Proof.</span>
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              Follow Multifit Gym on social to see live training sessions, athlete progress, and
              behind-the-scenes from the floor — updated daily.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="https://www.instagram.com/multifit.gym/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Multifit Gym on Instagram"
                className="group flex items-center gap-2.5 bg-zinc-800 border border-zinc-700 hover:border-[#b5e22e] hover:bg-zinc-800/80 rounded-sm px-5 py-3 transition-all duration-200"
              >
                <Instagram size={18} className="text-[#b5e22e]" />
                <span className="text-white text-sm font-bold uppercase tracking-wider">
                  Instagram
                </span>
                <span className="text-zinc-500 text-xs group-hover:text-zinc-300 transition-colors">
                  @multifit.gym
                </span>
              </a>
              <a
                href="https://www.facebook.com/MultiFitGymPh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Multifit Gym on Facebook"
                className="group flex items-center gap-2.5 bg-zinc-800 border border-zinc-700 hover:border-[#b5e22e] hover:bg-zinc-800/80 rounded-sm px-5 py-3 transition-all duration-200"
              >
                <Facebook size={18} className="text-[#b5e22e]" />
                <span className="text-white text-sm font-bold uppercase tracking-wider">
                  Facebook
                </span>
                <span className="text-zinc-500 text-xs group-hover:text-zinc-300 transition-colors">
                  Multifit Gym
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM ── */}
      <section ref={formRef} className="py-24 border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
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
          </Reveal>

          <Reveal delay={120} className="bg-zinc-900 border border-zinc-700 rounded-sm p-8">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formFirstName}
                      onChange={(e) => setFormFirstName(e.target.value)}
                      placeholder="Your first name"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-[#b5e22e] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formLastName}
                      onChange={(e) => setFormLastName(e.target.value)}
                      placeholder="Your last name"
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-[#b5e22e] transition-colors duration-200"
                    />
                  </div>
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
                      aria-label="Country"
                      className="bg-zinc-700 text-zinc-200 text-sm pl-3 pr-2 py-3 outline-none border-r border-zinc-600 w-[96px] sm:w-[160px] shrink-0"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code} className="bg-zinc-900">
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                    <span className="flex items-center text-zinc-400 text-sm px-2 sm:px-3 select-none border-r border-zinc-600 whitespace-nowrap shrink-0">
                      {formDial}
                    </span>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="WhatsApp number"
                      required
                      className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-sm px-3 sm:px-4 py-3 outline-none min-w-0 w-full"
                    />
                  </div>
                  <p className="text-zinc-600 text-xs mt-2">
                    Coach Jokko will contact you directly via WhatsApp.
                  </p>
                </div>

                {formError && (
                  <p
                    className="text-red-400 text-sm border border-red-400/40 bg-red-400/5 rounded-sm px-3 py-2"
                    role="alert"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-[#b5e22e] text-black font-black text-sm py-4 rounded-sm hover:bg-[#c8f03a] transition-colors duration-200 uppercase tracking-widest flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit My Application <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/60 bg-[#09090b] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Col 1 — Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#b5e22e] font-black text-lg tracking-tight uppercase">
                  MULTIFIT
                </span>
                <span className="text-zinc-600 font-light">×</span>
                <span className="text-white font-black text-lg tracking-tight uppercase">
                  ONLINE
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-md">
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
                    href="https://www.instagram.com/multifit.gym/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    @multifit.gym
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Facebook size={13} className="text-[#b5e22e]" />
                  <a
                    href="https://www.facebook.com/MultiFitGymPh"
                    target="_blank"
                    rel="noopener noreferrer"
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
            <div className="flex items-center gap-5 flex-wrap justify-center">
              <Link
                to="/privacy"
                className="text-zinc-500 hover:text-[#b5e22e] text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-zinc-800 text-xs">·</span>
              <Link
                to="/terms"
                className="text-zinc-500 hover:text-[#b5e22e] text-xs transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              <span className="text-zinc-800 text-xs px-3 py-1 border border-zinc-800 rounded-full">
                Powered by Next.js &amp; Supabase
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
