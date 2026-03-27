export interface Plan {
  id: string;
  name: string;
  price: number; // BRL
  priceLabel: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: 79,
    priceLabel: "R$ 79",
    description: "Endereço fiscal para registro da sua empresa em Belo Horizonte.",
    features: [
      "Endereço fiscal em BH",
      "Uso no CNPJ e contratos",
      "Recebimento de correspondências oficiais",
      "Notificação por e-mail ao receber cartas",
      "Suporte por e-mail",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 129,
    priceLabel: "R$ 129",
    description: "Endereço fiscal + caixa de correio exclusiva com notificação via interfone.",
    features: [
      "Tudo do plano Básico",
      "Caixa de correio exclusiva numerada",
      "Notificação via interfone ao receber correspondência",
      "Abertura remota da porta pelo celular",
      "Retirada de correspondências a qualquer hora",
      "Suporte prioritário",
    ],
    highlight: true,
    badge: "Mais Popular",
  },
  {
    id: "empresarial",
    name: "Empresarial",
    price: 197,
    priceLabel: "R$ 197",
    description: "Solução completa para empresas com múltiplas caixas de correio.",
    features: [
      "Tudo do plano Premium",
      "Até 3 caixas de correio",
      "Múltiplos usuários no interfone",
      "Relatório mensal de correspondências",
      "Suporte dedicado via WhatsApp",
      "Consultoria para abertura de empresa",
    ],
  },
];
