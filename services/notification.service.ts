import 'server-only';

/**
 * Best-effort "new demo booking" alerts.
 *
 * Each channel is enabled independently by its own env vars and fails quietly:
 * the lead is already saved in the database by the time this runs, so a
 * notification problem must never surface to the visitor or lose the lead.
 *
 * - Email  → Resend HTTP API (set RESEND_API_KEY + LEAD_ALERT_EMAIL)
 * - WhatsApp → Meta WhatsApp Cloud API template message
 *             (set WHATSAPP_TOKEN + WHATSAPP_PHONE_ID + WHATSAPP_ALERT_TO + WHATSAPP_TEMPLATE)
 *
 * In serverless we `await` the sends (a fire-and-forget request can be killed
 * when the function returns), but wrap everything so the caller can treat it as
 * non-fatal.
 */

export type LeadAlert = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  message: string;
};

export async function notifyNewLead(lead: LeadAlert): Promise<void> {
  const results = await Promise.allSettled([sendLeadEmail(lead), sendLeadWhatsApp(lead)]);
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('Lead alert channel failed:', result.reason);
    }
  }
}

function leadSummary(lead: LeadAlert): string {
  return [
    `Name: ${lead.name}`,
    `Business: ${lead.businessName}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    '',
    lead.message.trim() || '(no message)',
  ].join('\n');
}

/** Email alert via Resend. No-ops unless RESEND_API_KEY and LEAD_ALERT_EMAIL are set. */
async function sendLeadEmail(lead: LeadAlert): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return;

  // Resend's shared sender works without domain verification; set LEAD_ALERT_FROM
  // to a verified address once a custom domain is connected.
  const from = process.env.LEAD_ALERT_FROM ?? 'Flowint AI <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New demo booking: ${lead.businessName}`,
      text: `You have a new Flowint AI demo booking.\n\n${leadSummary(lead)}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

/**
 * WhatsApp alert via the Meta Cloud API. No-ops unless all WHATSAPP_* vars are set.
 *
 * Proactive messages must use a pre-approved template. Create one with four body
 * variables, in this order: {{1}} business name, {{2}} contact name, {{3}} phone,
 * {{4}} email — then set WHATSAPP_TEMPLATE to its name. Adjust the parameters here
 * if your approved template differs.
 */
async function sendLeadWhatsApp(lead: LeadAlert): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_ALERT_TO;
  const template = process.env.WHATSAPP_TEMPLATE;
  if (!token || !phoneId || !to || !template) return;

  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: template,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANG ?? 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: lead.businessName },
              { type: 'text', text: lead.name },
              { type: 'text', text: lead.phone },
              { type: 'text', text: lead.email },
            ],
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`WhatsApp API responded ${response.status}: ${await response.text()}`);
  }
}
