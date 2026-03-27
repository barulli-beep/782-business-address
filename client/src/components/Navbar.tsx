import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/planos", label: "Planos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

// EvoHub brand colors
const BLUE = "oklch(0.38 0.10 240)";
const BLUE_DEEP = "oklch(0.25 0.07 240)";
const GREEN = "oklch(0.65 0.14 145)";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isHome = location === "/";
  const lightBg = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        lightBg
          ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              {/* Infinity symbol icon matching EvoHub logo */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP})` }}
              >
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.5 7C5.5 5.07 7.07 3.5 9 3.5C10.1 3.5 11.08 4.01 11.72 4.82L13.28 6.5L11.72 8.18C11.08 8.99 10.1 9.5 9 9.5C7.07 9.5 5.5 7.93 5.5 6V7ZM14.5 7C14.5 8.93 12.93 10.5 11 10.5C9.9 10.5 8.92 9.99 8.28 9.18L6.72 7.5L8.28 5.82C8.92 5.01 9.9 4.5 11 4.5C12.93 4.5 14.5 6.07 14.5 8V7Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7C3 4.24 5.24 2 8 2C9.66 2 11.14 2.84 12 4.12M17 7C17 9.76 14.76 12 12 12C10.34 12 8.86 11.16 8 9.88"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-0.5">
                  <span
                    className="font-bold text-base tracking-tight transition-colors"
                    style={{ color: lightBg ? GREEN : "oklch(0.80 0.10 145)", fontFamily: "Inter, sans-serif" }}
                  >
                    EVO
                  </span>
                  <span
                    className="font-bold text-base tracking-tight transition-colors"
                    style={{ color: lightBg ? BLUE : "white", fontFamily: "Inter, sans-serif" }}
                  >
                    HUB
                  </span>
                </div>
                <span
                  className="text-[9px] font-medium tracking-widest uppercase transition-colors"
                  style={{ color: lightBg ? "oklch(0.52 0.04 240)" : "rgba(255,255,255,0.6)" }}
                >
                  Business Address
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-sm font-medium transition-colors cursor-pointer"
                  style={{
                    color: location === link.href
                      ? GREEN
                      : lightBg
                      ? BLUE
                      : "rgba(255,255,255,0.85)",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/planos">
              <Button
                size="sm"
                className="text-sm font-semibold px-5"
                style={{
                  background: `linear-gradient(135deg, ${GREEN}, oklch(0.55 0.14 145))`,
                  color: "white",
                  border: "none",
                }}
              >
                Contratar Agora
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded transition-colors"
            style={{ color: lightBg ? BLUE : "white" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: location === link.href ? GREEN : BLUE }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/planos">
                <Button
                  className="mt-3 w-full text-sm font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${GREEN}, oklch(0.55 0.14 145))`,
                    color: "white",
                    border: "none",
                  }}
                >
                  Contratar Agora
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
