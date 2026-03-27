import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock database functions
vi.mock("./db", () => ({
  createOrder: vi.fn().mockResolvedValue({ id: 1 }),
  createContactRequest: vi.fn().mockResolvedValue({ id: 1 }),
  getOrderByStripeSession: vi.fn().mockResolvedValue({
    id: 1,
    fullName: "João da Silva",
    cpfCnpj: "123.456.789-00",
    phone: "(31) 9 9999-9999",
    email: "joao@empresa.com.br",
    companyName: "Empresa LTDA",
    planId: "premium",
    planName: "Premium",
    planPrice: "129.00",
    status: "paid",
    stripeSessionId: "cs_test_123",
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: new Date(),
    stripePaymentIntentId: null,
    paymentMethod: null,
    mailboxNumber: null,
    notes: null,
  }),
  getDb: vi.fn().mockResolvedValue(null),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
  updateOrderStatus: vi.fn().mockResolvedValue(undefined),
  getOrderById: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock Stripe
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({
            id: "cs_test_abc123",
            url: "https://checkout.stripe.com/pay/cs_test_abc123",
          }),
        },
      },
    })),
  };
});

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: { origin: "https://example.com" } } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("saves contact request and notifies owner", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Maria Souza",
      email: "maria@empresa.com.br",
      phone: "(31) 9 8888-8888",
      message: "Gostaria de saber mais sobre o plano Premium.",
      preferCall: false,
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects contact with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Carlos",
        email: "email-invalido",
        message: "Mensagem de teste com mais de 10 caracteres",
        preferCall: false,
      })
    ).rejects.toThrow();
  });
});

describe("orders.getBySession", () => {
  it("returns order for valid session id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.orders.getBySession({ sessionId: "cs_test_123" });

    expect(result).toBeTruthy();
    expect(result?.planName).toBe("Premium");
    expect(result?.status).toBe("paid");
  });

  it("returns null for empty session id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.orders.getBySession({ sessionId: "" });
    expect(result).toBeNull();
  });
});

describe("stripe.createCheckoutSession", () => {
  it("creates a checkout session and returns URL", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckoutSession({
      planId: "premium",
      fullName: "João da Silva",
      cpfCnpj: "123.456.789-00",
      phone: "(31) 9 9999-9999",
      email: "joao@empresa.com.br",
      companyName: "Empresa LTDA",
      origin: "https://example.com",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toContain("stripe.com");
  });

  it("throws error for invalid plan id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.createCheckoutSession({
        planId: "plano-inexistente",
        fullName: "João",
        cpfCnpj: "123.456.789-00",
        phone: "(31) 9 9999-9999",
        email: "joao@empresa.com.br",
        origin: "https://example.com",
      })
    ).rejects.toThrow("Plano não encontrado");
  });
});
