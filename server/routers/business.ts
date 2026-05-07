import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { sendEmail } from '../_core/email';
import { emailTemplates } from '../emailTemplates';

export const businessRouter = router({
  submitQuestionnaire: publicProcedure
    .input(
      z.object({
        companyName: z.string().min(1),
        cnpj: z.string().min(1),
        businessType: z.string().min(1),
        address: z.string().optional(),
        phone: z.string().optional(),
        additionalInfo: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Get user email from context or request
        const userEmail = ctx.user?.email || 'unknown@email.com';
        const userName = ctx.user?.name || 'Cliente';

        // Send email to accountant
        await sendEmail({
          to: 'lbarulli@hotmail.com',
          ...emailTemplates.accountantNotification(userName, userEmail, input.companyName, input),
        });

        // Send email to seller
        await sendEmail({
          to: 'contato@hubevolua.com',
          ...emailTemplates.sellerQuestionnairNotification(userName, input.companyName, input),
        });

        return {
          success: true,
          message: 'Questionário enviado com sucesso',
        };
      } catch (error) {
        console.error('Error submitting questionnaire:', error);
        throw new Error('Erro ao enviar questionário');
      }
    }),
});
