import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createContactRequest } from "../db";
import { notifyOwner } from "../_core/notification";

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(10),
        preferCall: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createContactRequest({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        message: input.message,
        preferCall: input.preferCall ? 1 : 0,
        status: "new",
      });

      // Notify owner
      await notifyOwner({
        title: `📬 Nova mensagem de contato: ${input.name}`,
        content: `**De:** ${input.name} (${input.email})\n**Telefone:** ${input.phone || "não informado"}\n**Prefere ligação:** ${input.preferCall ? "Sim" : "Não"}\n\n**Mensagem:**\n${input.message}`,
      });

      return { success: true };
    }),
});
