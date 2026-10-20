'use server';

import { leadSchema, type LeadInput, type LeadFormState } from '@/lib/validations/lead';
import { createLead } from '@/services/lead.service';
import { notifyNewLead } from '@/services/notification.service';

export async function submitLead(input: LeadInput): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: LeadFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadInput | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      success: false,
      message: 'Please check the highlighted fields.',
      fieldErrors,
    };
  }

  // Honeypot filled → silently accept without storing (don't tip off bots).
  if (parsed.data.company) {
    return { success: true, message: "Thanks! We'll be in touch soon." };
  }

  const { name, businessName, phone, email, message } = parsed.data;

  try {
    await createLead({ name, businessName, phone, email, message });
  } catch (error) {
    console.error('submitLead failed:', error);
    return {
      success: false,
      message: 'Something went wrong on our end. Please try again in a moment.',
    };
  }

  // Lead is safely stored. Alerting the team is best-effort — a failed
  // email/WhatsApp send must never turn a captured lead into an error.
  await notifyNewLead({ name, businessName, phone, email, message }).catch((error) => {
    console.error('lead notification failed:', error);
  });

  return { success: true, message: "Thanks! We'll be in touch soon." };
}
