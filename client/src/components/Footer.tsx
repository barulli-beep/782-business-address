import { Link } from "wouter";
import { Building2, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.13 0.03 240)" }} className="text-white/80">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.14 75))" }}
              >
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-semibold text-base tracking-tight text-white">
                  782 Business
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--gold)]">
                  Address
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Endereço fiscal e caixas de correio para empresas em Belo Horizonte. 
              Profissionalismo e praticidade para o seu negócio.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium text-sm tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
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
                  <span className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium text-sm tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  Rua Conde de Linhares, 782<br />
                  Belo Horizonte – MG
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a
                  href="mailto:contato@782businessaddress.com.br"
                  className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
                >
                  contato@782businessaddress.com.br
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a
                  href="tel:+5531999999999"
                  className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
                >
                  (31) 9 9999-9999
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} 782 Business Address. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/40">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
}
