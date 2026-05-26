import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { ArrowLeft, MapPin, Phone, Instagram, Facebook } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, eyebrow, lastUpdated, children }: LegalLayoutProps) {
  const { pathname } = useLocation();

  // Reset scroll when navigating into a legal page (react-router doesn't do this by default)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div
      className="min-h-screen bg-[#09090b] text-white flex flex-col"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[#b5e22e] font-black text-lg tracking-tight uppercase">
              MULTIFIT
            </span>
            <span className="text-zinc-500 font-light text-lg">×</span>
            <span className="text-white font-black text-lg tracking-tight uppercase">JOKKO</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* ── PAGE HEADER ── */}
      <section className="border-b border-zinc-800/60 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#b5e22e]" />
            <span className="text-[#b5e22e] text-xs font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif" }}
          >
            {title}
          </h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-medium">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="prose-legal text-zinc-300 leading-relaxed space-y-10">
            {children}
          </article>

          <div className="mt-16 pt-10 border-t border-zinc-800/60">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#b5e22e] hover:text-[#c8f03a] text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Multifit × Jokko
            </Link>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/60 bg-[#09090b] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Col 1 — Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#b5e22e] font-black text-lg tracking-tight uppercase">
                  MULTIFIT
                </span>
                <span className="text-zinc-600 font-light">×</span>
                <span className="text-white font-black text-lg tracking-tight uppercase">
                  JOKKO
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                Elite online coaching for busy professionals — built at Multifit Gym, Dumaguete
                City, Philippines.
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

            {/* Col 2 — Legal */}
            <div>
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-5">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-zinc-400 text-sm hover:text-[#b5e22e] transition-colors"
                  >
                    Home
                  </Link>
                </li>
              </ul>
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

          <div className="border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-xs">
              © {new Date().getFullYear()} Multifit Gym · Jokko Centeno. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
