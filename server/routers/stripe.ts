import Stripe from "stripe";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createOrder } from "../db";
import { PLANS } from "../../shared/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const stripeRouter = router({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        fullName: z.string(),
        cpfCnpj: z.string(),
        phone: z.string(),
        email: z.string().email(),
        companyName: z.string().optional(),
        origin: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const plan = PLANS.find((p) => p.id === input.planId);
      if (!plan) throw new Error("Plano não encontrado");

      // Create order in DB (pending)
      const orderResult = await createOrder({
        fullName: input.fullName,
        cpfCnpj: input.cpfCnpj,
        phone: input.phone,
        email: input.email,
        companyName: input.companyName || null,
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price.toFixed(2),
        status: "pending",
      });

      const orderId = orderResult?.id;

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "boleto"],
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: {
                name: `782 Business Address – Plano ${plan.name}`,
                description: plan.description,
              },
              unit_amount: Math.round(plan.price * 100),
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        customer_email: input.email,
        allow_promotion_codes: true,
        client_reference_id: orderId?.toString(),
        metadata: {
          order_id: orderId?.toString() || "",
          plan_id: plan.id,
          plan_name: plan.name,
          full_name: input.fullName,
          cpf_cnpj: input.cpfCnpj,
          phone: input.phone,
          company_name: input.companyName || "",
        },
        success_url: `${input.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/checkout?plan=${plan.id}`,
      });

      // Update order with stripe session id
      if (orderId) {
        const { getDb } = await import("../db");
        const { orders } = await import("../../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (db && session.id) {
          await db
            .update(orders)
            .set({ stripeSessionId: session.id })
            .where(eq(orders.id, orderId));
        }
      }

      return { url: session.url! };
    }),
});
