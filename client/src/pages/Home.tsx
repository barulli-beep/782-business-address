import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Building2,
  MailOpen,
  Bell,
  ShieldCheck,
  Zap,
  MapPin,
  ArrowRight,
  Phone,
} from "lucide-react";
import PlanCard from "@/components/PlanCard";
import { PLANS } from "../../../shared/plans";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const services = [
  {
    icon: Building2,
    title: "Endereço Fiscal Virtual",
    description:
      "Use nosso endereço na Rua Conde de Linhares para registrar sua empresa no CNPJ, contratos e documentos oficiais. Totalmente legal e reconhecido pela Receita Federal.",
  },
  {
    icon: MailOpen,
    title: "Caixa de Correio Exclusiva",
    description:
      "Receba cartas, notificações e correspondências oficiais em uma caixa de correio numerada e exclusiva para a sua empresa.",
  },
  {
    icon: Bell,
    title: "Notificação em Tempo Real",
    description:
      "Quando uma correspondência chega, você é notificado imediatamente via interfone no seu celular e pode liberar o acesso remotamente.",
  },
];

const differentials = [
  {
    icon: Zap,
    title: "100% Online",
    description: "Contrate, pague e comece a usar em minutos, sem burocracia.",
  },
  {
    icon: ShieldCheck,
    title: "Endereço Reconhecido",
    description: "Endereço aceito pela Receita Federal e cartórios de BH.",
  },
  {
    icon: MapPin,
    title: "Belo Horizonte",
    description: "Localização privilegiada na Rua Conde de Linhares, BH.",
  },
  {
    icon: Phone,
    title: "Acesso Remoto",
    description: "Interfone inteligente: libere o acesso pelo celular de qualquer lugar.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.03 240) 0%, oklch(0.20 0.05 240) 60%, oklch(0.18 0.04 240) 100%)",
        }}
      >
        {/* Decorative gold accent */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.12 75) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.12 75) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="container relative z-10 pt-24 pb-16 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col items-center gap-6 max-w-3xl mx-auto"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{
                background: "oklch(0.72 0.12 75 / 0.15)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                color: "oklch(0.85 0.09 75)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <MapPin className="w-3 h-3" />
              Belo Horizonte – MG
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            >
              Tenha um endereço fiscal em{" "}
              <span style={{ color: "oklch(0.72 0.12 75)" }}>
                Belo Horizonte
              </span>{" "}
              em poucos minutos
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg text-white/70 leading-relaxed max-w-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Escolha seu plano, pague online e comece a usar imediatamente.
              Endereço fiscal, caixa de correio e notificação por interfone —
              tudo em um só lugar.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
              <Link href="/planos">
                <Button
                  size="lg"
                  className="px-8 py-3 text-base font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.14 75))",
                    color: "oklch(0.15 0.03 75)",
                    border: "none",
                  }}
                >
                  Escolher Plano
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-base font-medium"
                  style={{
                    borderColor: "oklch(1 0 0 / 0.25)",
                    color: "white",
                    background: "transparent",
                  }}
                >
                  Falar com Alguém
                </Button>
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              className="flex items-center gap-6 mt-4"
            >
              {["Sem fidelidade", "Ativação imediata", "Suporte humano"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-white/50"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "oklch(0.72 0.12 75)" }}
                    />
                    {item}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-12 md:h-16"
            style={{ fill: "oklch(0.985 0.003 240)" }}
          >
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "Inter, sans-serif" }}
            >
              Nossos Serviços
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-semibold text-foreground"
            >
              Tudo que sua empresa precisa
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col gap-4 p-7 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.22 0.055 240 / 0.07)" }}
                >
                  <service.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.22 0.055 240)" }}
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIALS ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.15 0.04 240)" }}
      >
        <div className="container">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-semibold text-white"
            >
              Por que escolher a 782 Business Address?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-3 p-6 rounded-xl"
                style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  />
                </div>
                <h4
                  className="font-medium text-white text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-xs text-white/55 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANS PREVIEW ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "Inter, sans-serif" }}
            >
              Planos e Preços
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            >
              Escolha o plano ideal
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-sm max-w-md mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Sem taxa de adesão. Cancele quando quiser.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/planos">
              <Button
                variant="outline"
                className="text-sm font-medium"
                style={{ borderColor: "oklch(0.72 0.12 75)", color: "oklch(0.72 0.12 75)" }}
              >
                Ver todos os detalhes dos planos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.97 0.005 240)" }}
      >
        <div className="container">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-semibold text-foreground"
            >
              Como funciona
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Escolha o plano", desc: "Selecione o plano que melhor atende às necessidades da sua empresa." },
              { step: "02", title: "Preencha seus dados", desc: "Informe nome, CPF/CNPJ, razão social e dados de contato." },
              { step: "03", title: "Pague online", desc: "Pague via PIX ou cartão de crédito de forma segura." },
              { step: "04", title: "Comece a usar", desc: "Receba o e-mail de confirmação e já utilize o endereço." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-3 text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto font-serif font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.22 0.055 240), oklch(0.15 0.04 240))",
                    color: "white",
                  }}
                >
                  {item.step}
                </div>
                <h4 className="font-serif font-semibold text-foreground text-base">
                  {item.title}
                </h4>
                <p
                  className="text-xs text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, oklch(0.13 0.03 240) 0%, oklch(0.20 0.05 240) 100%)",
        }}
      >
        <div className="container text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Pronto para profissionalizar sua empresa?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm mb-8 max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Registre sua empresa com um endereço fiscal em Belo Horizonte hoje mesmo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/planos">
              <Button
                size="lg"
                className="px-10 py-3 text-base font-semibold"
                style={{
                  background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.14 75))",
                  color: "oklch(0.15 0.03 75)",
                  border: "none",
                }}
              >
                Contratar Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-3 text-base font-medium"
                style={{
                  borderColor: "oklch(1 0 0 / 0.25)",
                  color: "white",
                  background: "transparent",
                }}
              >
                Prefiro que me liguem
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
