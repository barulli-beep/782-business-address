import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CreditCard, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { PLANS } from "../../../shared/plans";
import { toast } from "sonner";

const schema = z.object({
  fullName: z.string().min(3, "Nome completo obrigatório"),
  cpfCnpj: z.string().min(11, "CPF ou CNPJ inválido").max(18),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  companyName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function formatCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export default function Checkout() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const planId = params.get("plan") || "premium";
  const plan = PLANS.find((p) => p.id === planId) || PLANS[1];

  const [cpfCnpjValue, setCpfCnpjValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const createSession = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data: { url: string }) => {
      window.location.href = data.url;
    },
    onError: (err: { message: string }) => {
      toast.error("Erro ao iniciar pagamento: " + err.message);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    createSession.mutate({
      planId: plan.id,
      fullName: data.fullName,
      cpfCnpj: data.cpfCnpj,
      phone: data.phone,
      email: data.email,
      companyName: data.companyName || "",
      origin: window.location.origin,
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "oklch(0.985 0.003 240)" }}>
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/planos">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar aos planos
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
              <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
                Seus dados
              </h1>
              <p
                className="text-sm text-muted-foreground mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Preencha os dados abaixo para finalizar a contratação.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Nome completo *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="João da Silva"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                {/* CPF/CNPJ */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cpfCnpj" className="text-sm font-medium">
                    CPF ou CNPJ *
                  </Label>
                  <Input
                    id="cpfCnpj"
                    placeholder="000.000.000-00"
                    value={cpfCnpjValue}
                    onChange={(e) => {
                      const formatted = formatCpfCnpj(e.target.value);
                      setCpfCnpjValue(formatted);
                      setValue("cpfCnpj", formatted);
                    }}
                    maxLength={18}
                    className={errors.cpfCnpj ? "border-destructive" : ""}
                  />
                  {errors.cpfCnpj && (
                    <p className="text-xs text-destructive">{errors.cpfCnpj.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Telefone celular *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(31) 9 9999-9999"
                    value={phoneValue}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setPhoneValue(formatted);
                      setValue("phone", formatted);
                    }}
                    maxLength={16}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="joao@empresa.com.br"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Razão social da empresa{" "}
                    <span className="text-muted-foreground font-normal">(opcional)</span>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Empresa LTDA"
                    {...register("companyName")}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={createSession.isPending}
                  className="mt-2 w-full py-3 text-base font-semibold"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.65 0.14 75))",
                    color: "oklch(0.15 0.03 75)",
                    border: "none",
                  }}
                >
                  {createSession.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Aguarde...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Ir para o pagamento
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 justify-center mt-1">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Pagamento seguro via Stripe. PIX e cartão de crédito.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl p-7 sticky top-24"
              style={{ background: "oklch(0.15 0.04 240)" }}
            >
              <h2
                className="font-medium text-white/60 text-xs tracking-widest uppercase mb-5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Resumo do Pedido
              </h2>

              <div className="mb-5">
                <h3 className="font-serif text-2xl font-semibold text-white mb-1">
                  Plano {plan.name}
                </h3>
                <p
                  className="text-sm text-white/50"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {plan.description}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "oklch(0.72 0.12 75 / 0.2)" }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="oklch(0.72 0.12 75)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      className="text-xs text-white/60 leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="pt-5 border-t"
                style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-sm text-white/60"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Total mensal
                  </span>
                  <span
                    className="font-serif text-3xl font-bold"
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  >
                    {plan.priceLabel}
                  </span>
                </div>
                <p
                  className="text-xs text-white/40 mt-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Cobrado mensalmente. Cancele quando quiser.
                </p>
              </div>

              <div className="mt-5 pt-5 border-t" style={{ borderColor: "oklch(1 0 0 / 0.1)" }}>
                <p
                  className="text-xs text-white/40 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Após o pagamento, você receberá um e-mail de confirmação com todos os detalhes do seu plano e instruções de uso.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
