import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/planos", label: "Planos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.22 0.055 240), oklch(0.15 0.04 240))" }}
              >
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={`font-serif font-semibold text-base tracking-tight transition-colors ${
                    scrolled || !isHome ? "text-foreground" : "text-white"
                  }`}
                >
                  782 Business
                </span>
                <span
                  className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${
                    scrolled || !isHome ? "text-[var(--gold)]" : "text-[var(--gold-light)]"
                  }`}
                >
                  Address
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer hover:text-[var(--gold)] ${
                    location === link.href
                      ? "text-[var(--gold)]"
                      : scrolled || !isHome
                      ? "text-foreground"
                      : "text-white/90"
                  }`}
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
                className="text-sm font-medium px-5"
                style={{
                  background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.14 75))",
                  color: "oklch(0.15 0.03 75)",
                  border: "none",
                }}
              >
                Contratar Agora
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded transition-colors ${
              scrolled || !isHome ? "text-foreground" : "text-white"
            }`}
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
                    className={`block py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                      location === link.href ? "text-[var(--gold)]" : "text-foreground hover:text-[var(--gold)]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/planos">
                <Button
                  className="mt-3 w-full text-sm font-medium"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.14 75))",
                    color: "oklch(0.15 0.03 75)",
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
