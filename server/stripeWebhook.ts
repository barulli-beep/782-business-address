import Stripe from "stripe";
import type { Express, Request, Response } from "express";
import express from "express";
import { updateOrderStatus, getOrderByStripeSession } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendEmail } from "./_core/email";
import { emailTemplates } from "./emailTemplates";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

function buildClientEmail(order: {
  fullName: string;
  planName: string;
  planPrice: string | number;
  companyName?: string | null;
  mailboxNumber?: string | null;
}): string {
  const price = Number(order.planPrice).toFixed(2).replace(".", ",");
  return `
Olá, ${order.fullName}!

Seu cadastro foi realizado com sucesso na 782 Business Address. ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 PLANO CONTRATADO: ${order.planName} — R$ ${price}/mês

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 SEU NOVO ENDEREÇO FISCAL:

${order.fullName}${order.companyName ? ` / ${order.companyName}` : ""}
782 Business Address
Rua Conde de Linhares, 782
Belo Horizonte – MG, CEP: 30000-000
${order.mailboxNumber ? `Caixa Postal: ${order.mailboxNumber}` : ""}

Utilize EXATAMENTE este formato ao informar seu endereço em documentos e cadastros.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📬 COMO RECEBER CORRESPONDÊNCIAS

• Cadastre este endereço no seu CNPJ e documentos oficiais
• Quando uma correspondência chegar, você será notificado
• Você poderá liberar a entrada remotamente pelo celular

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 PRÓXIMOS PASSOS

Nossa equipe entrará em contato em até 24 horas para:
• Configurar seu número no porteiro eletrônico
• Orientar sobre o processo de registro no CNPJ
• Atribuir sua caixa de correio (se aplicável)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ SUPORTE

Se precisar de atendimento humano, responda este e-mail com a palavra "ATENDIMENTO"
ou acesse: https://782businessaddress.com.br/contato

Seja bem-vindo(a) à 782 Business Address! 🏢

Equipe 782 Business Address
Rua Conde de Linhares, 782 – Belo Horizonte/MG
  `.trim();
}

function buildOwnerNotification(
  order: {
    fullName: string;
    cpfCnpj: string;
    phone: string;
    email: string;
    planName: string;
    planPrice: string | number;
    companyName?: string | null;
  },
  sessionId: string
): string {
  const price = Number(order.planPrice).toFixed(2).replace(".", ",");
  return `
**🆕 NOVO CLIENTE CONFIRMADO**

**Nome:** ${order.fullName}
**CPF/CNPJ:** ${order.cpfCnpj}
**Telefone:** ${order.phone}
**E-mail:** ${order.email}
**Empresa:** ${order.companyName || "Não informado"}
**Plano:** ${order.planName} — R$ ${price}/mês
**Session Stripe:** ${sessionId}

---

**📋 AÇÕES NECESSÁRIAS:**

1. Configurar o número ${order.phone} no porteiro eletrônico
2. Atribuir caixa de correio (se plano Premium/Empresarial)
3. Enviar dados ao contador para iniciar trâmites de registro
4. Confirmar ativação ao cliente por e-mail

---

Acesse o painel para gerenciar este cliente.
  `.trim();
}

export function registerStripeWebhook(app: Express) {
  // MUST use raw body BEFORE json middleware
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          webhookSecret!
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[Webhook] Signature verification failed:", message);
        return res.status(400).json({ error: `Webhook Error: ${message}` });
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Webhook] Event received: ${event.type} (${event.id})`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const sessionId = session.id;

            await updateOrderStatus(sessionId, "paid", {
              stripePaymentIntentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id,
              paidAt: new Date(),
            });

            const order = await getOrderByStripeSession(sessionId);
            if (order) {
              // Notify owner via system notification
              await notifyOwner({
                title: `🎉 Novo cliente: ${order.fullName} – Plano ${order.planName}`,
                content: buildOwnerNotification(order, sessionId),
              });

              // Send email to customer
              try {
                const questionnairLink = 'https://busaddress-an8uw3gx.manus.space/cadastro';
                await sendEmail({
                  to: order.email,
                  ...emailTemplates.customerConfirmation(order.fullName, order.planName, questionnairLink),
                });
              } catch (emailErr) {
                console.error('[Webhook] Failed to send customer email:', emailErr);
              }

              // Send email to seller
              try {
                await sendEmail({
                  to: 'contato@hubevolua.com',
                  ...emailTemplates.sellerConfirmation(order.fullName, order.email, order.phone, order.planName),
                });
              } catch (emailErr) {
                console.error('[Webhook] Failed to send seller email:', emailErr);
              }

              console.log(
                `[Webhook] Order ${order.id} confirmed for ${order.email}`
              );
            }
            break;
          }

          case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            // Find order by subscription metadata if needed
            console.log(`[Webhook] Subscription cancelled: ${subscription.id}`);
            break;
          }

          default:
            console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (err) {
        console.error("[Webhook] Error processing event:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.json({ received: true });
    }
  );
}
