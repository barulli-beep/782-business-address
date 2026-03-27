import { Link } from "wouter";
import { MapPin, Mail, Phone } from "lucide-react";

const GREEN = "oklch(0.65 0.14 145)";
const BLUE = "oklch(0.38 0.10 240)";

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.18 0.06 240)" }} className="text-white/80">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${BLUE}, oklch(0.25 0.07 240))` }}
              >
                {/* Infinity icon */}
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 7C3 4.24 5.24 2 8 2C9.66 2 11.14 2.84 12 4.12M17 7C17 9.76 14.76 12 12 12C10.34 12 8.86 11.16 8 9.88"
                    stroke="white" strokeWidth="1.8" strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-bold text-base" style={{ color: GREEN, fontFamily: "Inter, sans-serif" }}>EVO</span>
                  <span className="font-bold text-base text-white" style={{ fontFamily: "Inter, sans-serif" }}>HUB</span>
                </div>
                <span className="text-[9px] font-medium tracking-widest uppercase text-white/50">
                  Business Address
                </span>
              </div>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              Endereço fiscal e caixas de correio para empresas em Belo Horizonte.
              Profissionalismo e praticidade para o seu negócio.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
              Navegação
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Início" },
                { href: "/planos", label: "Planos e Preços" },
                { href: "/faq", label: "Perguntas Frequentes" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-sm text-white/55 transition-colors cursor-pointer hover:text-white"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GREEN }} />
                <span className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  Rua Conde de Linhares, 782<br />
                  Belo Horizonte – MG
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
                <a
                  href="mailto:contato@hubevolua.com"
                  className="text-sm text-white/55 hover:text-white transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  contato@hubevolua.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
                <a
                  href="tel:+5531993933934"
                  className="text-sm text-white/55 hover:text-white transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  (31) 9 9393-3934
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
            © {new Date().getFullYear()} Hub Evolua — 782 Business Address. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
            CNPJ: 59.267.954/0001-08
          </p>
        </div>
      </div>
    </footer>
  );
}
