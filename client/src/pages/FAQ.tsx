import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    category: "Endereço Fiscal",
    items: [
      {
        q: "O que é um endereço fiscal virtual?",
        a: "É um endereço físico real utilizado para fins legais e fiscais da sua empresa, como registro no CNPJ, contratos, notas fiscais e correspondências oficiais. Você não precisa ter um escritório no local — apenas usa o endereço para fins cadastrais.",
      },
      {
        q: "O endereço é aceito pela Receita Federal?",
        a: "Sim. O endereço da Rua Conde de Linhares, 782, Belo Horizonte/MG é um endereço residencial/comercial real, plenamente aceito pela Receita Federal para abertura e manutenção de CNPJ, conforme legislação vigente.",
      },
      {
        q: "Posso usar o endereço em contratos e documentos?",
        a: "Sim. Você pode utilizar o endereço em contratos comerciais, propostas, cartões de visita, site da empresa e qualquer documento que exija um endereço comercial.",
      },
      {
        q: "Como funciona o processo de abertura de empresa?",
        a: "Após a contratação do plano, você recebe por e-mail todas as instruções e o endereço formatado corretamente. Você pode encaminhar essas informações ao seu contador para iniciar os trâmites de abertura ou alteração do CNPJ.",
      },
    ],
  },
  {
    category: "Caixas de Correio",
    items: [
      {
        q: "Como funciona a caixa de correio?",
        a: "Nos planos Premium e Empresarial, você recebe uma caixa de correio física numerada e exclusiva no imóvel. Toda correspondência endereçada à sua empresa é depositada nessa caixa.",
      },
      {
        q: "Que tipos de correspondência são aceitos?",
        a: "Aceitamos cartas, notificações, documentos, boletos e correspondências oficiais. Por enquanto, não recebemos encomendas ou pacotes volumosos.",
      },
      {
        q: "Como sou avisado quando chega uma correspondência?",
        a: "Nos planos com caixa de correio, seu número de celular é cadastrado no porteiro eletrônico do imóvel. Quando uma correspondência chega, o porteiro aciona seu celular automaticamente. Você pode liberar o acesso ao carteiro remotamente, de qualquer lugar.",
      },
      {
        q: "Quando posso retirar minha correspondência?",
        a: "A retirada pode ser feita a qualquer momento, mediante agendamento prévio. Você também pode autorizar terceiros a retirar em seu nome.",
      },
    ],
  },
  {
    category: "Pagamento e Contrato",
    items: [
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Aceitamos PIX e cartão de crédito (Visa, Mastercard, Elo, American Express). O pagamento é processado de forma segura pela plataforma Stripe.",
      },
      {
        q: "Existe fidelidade ou taxa de cancelamento?",
        a: "Não. Não há fidelidade mínima nem taxa de cancelamento. Você pode cancelar o plano a qualquer momento, com efeito no próximo ciclo de cobrança.",
      },
      {
        q: "Como funciona a cobrança mensal?",
        a: "A cobrança é feita mensalmente na data de contratação. Você recebe um e-mail de confirmação a cada pagamento realizado.",
      },
      {
        q: "Posso fazer upgrade de plano?",
        a: "Sim. Você pode solicitar o upgrade a qualquer momento entrando em contato conosco. O valor proporcional será calculado e a diferença cobrada.",
      },
    ],
  },
  {
    category: "Acesso e Segurança",
    items: [
      {
        q: "Como funciona o interfone inteligente?",
        a: "O imóvel conta com um porteiro eletrônico conectado ao celular dos clientes cadastrados. Quando alguém aciona o interfone, seu celular toca como uma ligação normal. Você pode conversar e liberar a porta remotamente, de qualquer lugar do mundo.",
      },
      {
        q: "Meus dados estão seguros?",
        a: "Sim. Seus dados pessoais e empresariais são tratados com total confidencialidade, em conformidade com a Lei Geral de Proteção de Dados (LGPD). Não compartilhamos suas informações com terceiros.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ background: "linear-gradient(135deg, oklch(0.13 0.03 240) 0%, oklch(0.20 0.05 240) 100%)" }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mb-4"
          >
            <HelpCircle className="w-10 h-10" style={{ color: "oklch(0.72 0.12 75)" }} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Perguntas Frequentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-sm max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Encontre respostas para as principais dúvidas sobre nossos serviços.
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto">
          <div className="flex flex-col gap-12">
            {faqs.map((category, ci) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <h2
                  className="text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{ color: "oklch(0.72 0.12 75)", fontFamily: "Inter, sans-serif" }}
                >
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="flex flex-col gap-2">
                  {category.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${ci}-${i}`}
                      className="border border-border rounded-xl overflow-hidden bg-white shadow-sm px-5"
                    >
                      <AccordionTrigger
                        className="text-sm font-medium text-foreground py-4 hover:no-underline text-left"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent
                        className="text-sm text-muted-foreground leading-relaxed pb-4"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-center"
        style={{ background: "oklch(0.97 0.005 240)" }}
      >
        <div className="container">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Não encontrou sua resposta?
          </h3>
          <p
            className="text-muted-foreground text-sm mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Nossa equipe está pronta para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contato">
              <button
                className="px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
                style={{
                  background: "oklch(0.22 0.055 240)",
                  color: "white",
                  border: "none",
                }}
              >
                Entrar em contato
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/planos">
              <button
                className="px-6 py-2.5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  borderColor: "oklch(0.88 0.01 240)",
                  color: "oklch(0.22 0.055 240)",
                  background: "white",
                }}
              >
                Ver planos e preços
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
