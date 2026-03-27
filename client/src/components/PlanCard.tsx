import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { Plan } from "../../../shared/plans";

interface PlanCardProps {
  plan: Plan;
  index?: number;
}

export default function PlanCard({ plan, index = 0 }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl overflow-hidden ${
        plan.highlight
          ? "shadow-2xl ring-2 ring-[var(--gold)] scale-[1.02]"
          : "shadow-md border border-border"
      }`}
      style={{ background: plan.highlight ? "oklch(0.25 0.07 240)" : "white" }}
    >
      {plan.badge && (
        <div
          className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "linear-gradient(135deg, oklch(0.65 0.14 145), oklch(0.55 0.14 145))",
            color: "white",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {plan.badge}
        </div>
      )}

      <div className={`flex flex-col flex-1 p-7 ${plan.badge ? "pt-10" : ""}`}>
        {/* Header */}
        <div className="mb-5">
          <h3
            className={`font-serif text-2xl font-semibold mb-1 ${
              plan.highlight ? "text-white" : "text-foreground"
            }`}
          >
            {plan.name}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              plan.highlight ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-serif text-4xl font-bold ${
                plan.highlight ? "text-[var(--gold)]" : "text-foreground"
              }`}
            >
              {plan.priceLabel}
            </span>
            <span
              className={`text-sm ${
                plan.highlight ? "text-white/50" : "text-muted-foreground"
              }`}
            >
              /mês
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: plan.highlight
                    ? "oklch(0.72 0.12 75 / 0.2)"
                    : "oklch(0.22 0.055 240 / 0.08)",
                }}
              >
                <Check
                  className="w-2.5 h-2.5"
                  style={{ color: plan.highlight ? "oklch(0.65 0.14 145)" : "oklch(0.38 0.10 240)" }}
                />
              </div>
              <span
                className={`text-sm leading-relaxed ${
                  plan.highlight ? "text-white/80" : "text-foreground/80"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href={`/checkout?plan=${plan.id}`}>
          <Button
            className="w-full py-3 text-sm font-semibold tracking-wide"
            style={
              plan.highlight
                ? {
                    background: "linear-gradient(135deg, oklch(0.65 0.14 145), oklch(0.55 0.14 145))",
                    color: "white",
                    border: "none",
                  }
                : {
                    background: "oklch(0.38 0.10 240)",
                    color: "white",
                    border: "none",
                  }
            }
          >
            Contratar {plan.name}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
