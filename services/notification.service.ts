import 'server-only';

/**
 * Best-effort "new demo booking" email alert.
 *
 * Sends via the Resend HTTP API and fails quietly: the lead is already saved in
 * the database by the time this runs, so a notification problem must never
 * surface to the visitor or lose the lead.
 *
 * Enabled by RESEND_API_KEY alone. Alerts go to LEAD_ALERT_EMAIL, falling back
 * to the team inbox below. No key → no-op, so local/dev stays silent.
 */

const DEFAULT_ALERT_EMAIL = 'iyeradi112@gmail.com';

export type LeadAlert = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  message: string;
};

export async function notifyNewLead(lead: LeadAlert): Promise<void> {
  await sendLeadEmail(lead);
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

/** Email alert via Resend. No-ops unless RESEND_API_KEY is set. */
async function sendLeadEmail(lead: LeadAlert): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.LEAD_ALERT_EMAIL || DEFAULT_ALERT_EMAIL;

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
