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
        from: 'noreply@hubevolua.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to send email: ${response.statusText} - ${error}`);
    }

    console.log('[Email Service] Email sent successfully to:', options.to);
  } catch (error) {
    console.error('[Email Service] Error sending email:', error);
    throw error;
  }
}
