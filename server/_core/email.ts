/**
 * Email service for sending emails via Resend
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('[Email Service] RESEND_API_KEY not configured, logging email instead');
      console.log('[Email Service] Email (not sent):', {
        to: options.to,
        subject: options.subject,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to send email: ${response.statusText} - ${error.message || JSON.stringify(error)}`);
    }

    const data = await response.json();
    console.log('[Email Service] Email sent successfully to:', options.to);
    console.log('[Email Service] Email ID:', data.id);
  } catch (error) {
    console.error('[Email Service] Error sending email:', error instanceof Error ? error.message : error);
    // Don't throw - log and continue so webhook doesn't fail
    return;
  }
}
