import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensagem muito curta"),
  preferCall: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err: { message: string }) => {
      toast.error("Erro ao enviar: " + err.message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const preferCall = watch("preferCall");

  const onSubmit = (data: FormData) => {
    submitContact.mutate({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      preferCall: data.preferCall || false,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: "linear-gradient(135deg, oklch(0.13 0.03 240) 0%, oklch(0.20 0.05 240) 100%)" }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Fale Conosco
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-sm max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Tire suas dúvidas antes de contratar. Nossa equipe responde em até 24 horas.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 flex flex-col gap-8"
            >
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Informações de contato
                </h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.22 0.055 240 / 0.08)" }}
                    >
                      <MapPin className="w-4 h-4" style={{ color: "oklch(0.22 0.055 240)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Endereço</p>
                      <p
                        className="text-sm text-muted-foreground leading-relaxed"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Rua Conde de Linhares, 782<br />
                        Belo Horizonte – MG
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.22 0.055 240 / 0.08)" }}
                    >
                      <Mail className="w-4 h-4" style={{ color: "oklch(0.22 0.055 240)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">E-mail</p>
                      <a
                        href="mailto:contato@782businessaddress.com.br"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        contato@782businessaddress.com.br
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.22 0.055 240 / 0.08)" }}
                    >
                      <Phone className="w-4 h-4" style={{ color: "oklch(0.22 0.055 240)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Telefone / WhatsApp</p>
                      <a
                        href="tel:+5531999999999"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        (31) 9 9999-9999
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-5"
                style={{ background: "oklch(0.97 0.005 240)", border: "1px solid oklch(0.88 0.01 240)" }}
              >
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Prefere contratar diretamente? Veja nossos planos e finalize a contratação online em minutos.
                </p>
                <a
                  href="/planos"
                  className="inline-flex items-center gap-1.5 text-sm font-medium mt-3 transition-colors"
                  style={{ color: "oklch(0.22 0.055 240)" }}
                >
                  Ver planos →
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle className="w-12 h-12" style={{ color: "oklch(0.72 0.12 75)" }} />
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      Mensagem enviada!
                    </h3>
                    <p
                      className="text-sm text-muted-foreground max-w-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Recebemos sua mensagem e entraremos em contato em até 24 horas.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-1">
                      Envie sua mensagem
                    </h2>
                    <p
                      className="text-sm text-muted-foreground mb-8"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Preencha o formulário e nossa equipe entrará em contato.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="name" className="text-sm font-medium">Nome *</Label>
                          <Input
                            id="name"
                            placeholder="Seu nome"
                            {...register("name")}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="email" className="text-sm font-medium">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            {...register("email")}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Telefone <span className="text-muted-foreground font-normal">(opcional)</span>
                        </Label>
                        <Input
                          id="phone"
                          placeholder="(31) 9 9999-9999"
                          {...register("phone")}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="message" className="text-sm font-medium">Mensagem *</Label>
                        <Textarea
                          id="message"
                          placeholder="Descreva sua dúvida ou necessidade..."
                          rows={4}
                          {...register("message")}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                      </div>

                      {/* Prefer call toggle */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setValue("preferCall", !preferCall)}
                          className={`w-10 h-5 rounded-full transition-colors relative ${
                            preferCall ? "" : "bg-muted"
                          }`}
                          style={preferCall ? { background: "oklch(0.22 0.055 240)" } : {}}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                              preferCall ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                        <span
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Prefiro que me liguem
                        </span>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitContact.isPending}
                        className="mt-2 w-full py-3 text-base font-semibold"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.22 0.055 240), oklch(0.15 0.04 240))",
                          color: "white",
                          border: "none",
                        }}
                      >
                        {submitContact.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
