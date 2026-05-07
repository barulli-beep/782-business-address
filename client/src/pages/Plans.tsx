import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import PlanCard from "@/components/PlanCard";
import { PLANS } from "../../../shared/plans";

const comparison = [
  { feature: "Endereço fiscal para CNPJ", basico: true, premium: true, empresarial: true },
  { feature: "Uso em contratos e documentos", basico: true, premium: true, empresarial: true },
  { feature: "Recebimento de correspondências", basico: true, premium: true, empresarial: true },
  { feature: "Notificação por e-mail", basico: true, premium: true, empresarial: true },
  { feature: "Caixa de correio exclusiva", basico: false, premium: true, empresarial: true },
  { feature: "Notificação via interfone", basico: false, premium: true, empresarial: true },
  { feature: "Abertura remota pelo celular", basico: false, premium: true, empresarial: true },
  { feature: "Múltiplas caixas (até 3)", basico: false, premium: false, empresarial: true },
  { feature: "Múltiplos usuários no interfone", basico: false, premium: false, empresarial: true },
  { feature: "Relatório mensal", basico: false, premium: false, empresarial: true },
  { feature: "Suporte via WhatsApp", basico: false, premium: false, empresarial: true },
  { feature: "Consultoria para abertura de empresa", basico: false, premium: false, empresarial: true },
];

export default function Plans() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: "linear-gradient(135deg, oklch(0.13 0.03 240) 0%, oklch(0.20 0.05 240) 100%)" }}
      >
        <div className="container">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.72 0.12 75)", fontFamily: "Inter, sans-serif" }}
          >
            Planos e Preços
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Escolha o plano ideal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-sm max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Sem taxa de adesão. Sem fidelidade. Cancele quando quiser.
          </motion.p>
        </div>
      </section>

      {/* Plans grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.97 0.005 240)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold text-foreground">
              Comparativo completo
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              <thead>
                <tr style={{ background: "oklch(0.15 0.04 240)" }}>
                  <th className="text-left py-4 px-6 text-white/70 font-medium">Recurso</th>
                  {PLANS.map((plan) => (
                    <th key={plan.id} className="py-4 px-6 text-center">
                      <span className={`font-semibold ${plan.highlight ? "text-[var(--gold)]" : "text-white"}`}>
                        {plan.name}
                      </span>
                      <div className="text-white/50 text-xs font-normal mt-0.5">{plan.priceLabel}/mês</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className="border-t border-border"
                    style={{ background: i % 2 === 0 ? "white" : "oklch(0.985 0.003 240)" }}
                  >
                    <td className="py-3.5 px-6 text-foreground/80">{row.feature}</td>
                    {[row.basico, row.premium, row.empresarial].map((val, j) => (
                      <td key={j} className="py-3.5 px-6 text-center">
                        {val ? (
                          <Check className="w-4 h-4 mx-auto" style={{ color: "oklch(0.22 0.055 240)" }} />
                        ) : (
                          <span className="text-muted-foreground text-base">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 text-center">
        <div className="container">
          <HelpCircle className="w-8 h-8 mx-auto mb-4" style={{ color: "oklch(0.72 0.12 75)" }} />
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Ainda tem dúvidas?
          </h3>
          <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Confira nossas perguntas frequentes ou entre em contato com a nossa equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/faq">
              <button
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: "oklch(0.22 0.055 240)",
                  color: "white",
                  border: "none",
                }}
              >
                Ver FAQ
              </button>
            </Link>
            <Link href="/contato">
              <button
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border"
                style={{ borderColor: "oklch(0.88 0.01 240)", color: "oklch(0.22 0.055 240)" }}
              >
                Falar com alguém
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
