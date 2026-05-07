import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function Success() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id") || "";

  const { data: order } = trpc.orders.getBySession.useQuery(
    { sessionId },
    { enabled: !!sessionId }
  );

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "oklch(0.985 0.003 240)" }}>
      <div className="container max-w-2xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-border shadow-md p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "oklch(0.72 0.12 75)" }} />
          </motion.div>

          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Pagamento confirmado!
          </h1>
          <p
            className="text-muted-foreground text-sm mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Seu plano foi ativado com sucesso. Verifique seu e-mail para os próximos passos.
          </p>

          {order && (
            <div
              className="rounded-xl p-6 mb-8 text-left"
              style={{ background: "oklch(0.15 0.04 240)" }}
            >
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "Inter, sans-serif" }}
              >
                Detalhes do Contrato
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>Plano</span>
                  <span className="text-sm text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{order.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>Titular</span>
                  <span className="text-sm text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{order.fullName}</span>
                </div>
                {order.companyName && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>Empresa</span>
                    <span className="text-sm text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{order.companyName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>Valor mensal</span>
                  <span className="text-sm font-bold" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "Inter, sans-serif" }}>
                    R$ {Number(order.planPrice).toFixed(2).replace(".", ",")}
                  </span>
                </div>
                {order.roomNumber && (
                  <div className="flex justify-between">
                    <span className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>Sala Atribuída</span>
                    <span className="text-sm text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Sl {String(order.roomNumber).padStart(2, "0")}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mb-8">
            <div
              className="flex items-start gap-3 p-4 rounded-xl text-left"
              style={{ background: "oklch(0.97 0.005 240)", border: "1px solid oklch(0.88 0.01 240)" }}
            >
              <Mail className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.055 240)" }} />
              <div>
                <p className="text-sm font-medium text-foreground">Verifique seu e-mail</p>
                <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Enviamos as instruções completas de uso e o endereço formatado para o seu e-mail.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-3 p-4 rounded-xl text-left"
              style={{ background: "oklch(0.97 0.005 240)", border: "1px solid oklch(0.88 0.01 240)" }}
            >
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "oklch(0.22 0.055 240)" }} />
              <div>
                <p className="text-sm font-medium text-foreground">Seu endereço fiscal</p>
                <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Rua Conde de Linhares, 782{order?.roomNumber ? ` — Sl ${String(order.roomNumber).padStart(2, "0")}` : ""} — Belo Horizonte/MG
                </p>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button
              size="lg"
              className="px-8 font-semibold"
              style={{
                background: "linear-gradient(135deg, oklch(0.22 0.055 240), oklch(0.15 0.04 240))",
                color: "white",
                border: "none",
              }}
            >
              Voltar ao início
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
