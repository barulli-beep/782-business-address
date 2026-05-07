# 782 Business Address - TODO

## Estrutura & Banco de Dados
- [x] Inicializar projeto web com scaffold web-db-user
- [x] Schema: tabela `orders` (pedidos/contratos)
- [x] Schema: tabela `contact_requests` (formulário de contato)
- [x] Migrar schema para o banco (`pnpm db:push`)

## Backend (tRPC)
- [x] Procedure `plans.list` - planos definidos em shared/plans.ts
- [x] Procedure `orders.create` - criar pedido antes do pagamento
- [x] Procedure `orders.getBySession` - buscar pedido por session Stripe
- [x] Procedure `contact.submit` - salvar mensagem de contato
- [x] Procedure `stripe.createCheckoutSession` - criar sessão de checkout Stripe
- [x] Webhook Stripe: confirmar pagamento, notificar proprietário

## Frontend - Páginas
- [x] Home: hero, serviços, diferenciais, como funciona, CTA
- [x] Planos: 3 cards (Básico, Premium, Empresarial) + tabela comparativa
- [x] Checkout: formulário de dados do cliente + redirecionamento Stripe
- [x] Sucesso: página de confirmação pós-pagamento
- [x] FAQ: perguntas frequentes sobre endereço fiscal e caixas de correio
- [x] Contato: formulário de dúvidas pré-venda

## Frontend - Layout & Design
- [x] Navbar com logo e links de navegação
- [x] Footer com endereço e contato
- [x] Paleta elegante: azul escuro (navy) + dourado (gold) + branco
- [x] Tipografia: Playfair Display (títulos) + Inter (corpo)
- [x] Design mobile-first e responsivo
- [x] Animações suaves com framer-motion

## Integrações
- [x] Stripe: checkout session com planos mensais
- [x] Stripe: suporte a cartão de crédito (PIX pode ser ativado no dashboard Stripe)
- [x] Notificação ao proprietário com dados do cliente (via notifyOwner)
- [x] Webhook Stripe registrado antes do json middleware

## Testes
- [x] Vitest: procedure `orders.getBySession`
- [x] Vitest: procedure `contact.submit`
- [x] Vitest: procedure `stripe.createCheckoutSession`
- [x] Vitest: auth.logout (existente)

## Pendente / Próximos Passos
- [x] Configurar PIX no dashboard Stripe (adicionar payment_method_types: ["pix"])
- [x] Configurar e-mail real (SMTP/Resend) para envio de confirmação ao cliente
- [x] Atualizar telefone, e-mail e CNPJ reais no Footer
- [x] Ativar sandbox Stripe antes de 26/05/2026
- [x] Publicar o site via botão Publish no painel

## Ajustes de Identidade Visual e Textos (v2)
- [x] Atualizar paleta de cores para identidade EvoHub (azul #2D4A7A + verde #5BAD6F)
- [x] Trocar nome do site para "Hub Evolua" / "782 Business Address by Hub Evolua"
- [x] Atualizar telefone para (31) 9 9393-3934
- [x] Atualizar e-mail para contato@hubevolua.com
- [x] Corrigir texto: "notificação por chamada telefônica (através do interfone)"
- [x] Corrigir texto do card de endereço fiscal (versão completa com PBH)
- [x] Corrigir texto "Endereço Reconhecido" (adicionar prefeitura de BH)
- [x] Atualizar logo/nome na Navbar e Footer

## Ajustes v3
- [x] Adicionar CNPJ 59.267.954/0001-08 no Footer

## Sistema de E-mails (v4)
- [x] Criar templates de e-mail simples para testes
- [x] Criar página de questionário/cadastro de empresa (/cadastro)
- [x] Integrar Resend API para envio de e-mails automáticos
- [x] Configurar e-mail para cliente após compra (confirmação + manual + link questionário)
- [x] Configurar e-mail para vendedor após compra (dados do cliente)
- [x] Configurar e-mail para contador após questionário (dados para registro)
- [x] Configurar e-mail para vendedor após questionário (confirmação)
