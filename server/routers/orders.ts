import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getOrderByStripeSession } from "../db";

export const ordersRouter = router({
  getBySession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      if (!input.sessionId) return null;
      return getOrderByStripeSession(input.sessionId);
    }),
});
