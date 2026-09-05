'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/lib/auth/auth';
import { updateLeadStatus, deleteLead } from '@/services/lead.service';

const statusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
});

const idSchema = z.object({ id: z.string().min(1) });

type ActionResult = { success: boolean; message?: string };

async function requireAdmin(): Promise<boolean> {
  const session = await auth();
  return !!session?.user;
}

export async function setLeadStatus(input: {
  id: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
}): Promise<ActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, message: 'Not authorized.' };
  }

  const parsed = statusSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: 'Invalid request.' };
  }

  try {
    await updateLeadStatus(parsed.data.id, parsed.data.status);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('setLeadStatus failed:', error);
    return { success: false, message: 'Could not update the lead.' };
  }
}

export async function removeLead(input: { id: string }): Promise<ActionResult> {
  if (!(await requireAdmin())) {
    return { success: false, message: 'Not authorized.' };
  }

  const parsed = idSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: 'Invalid request.' };
  }

  try {
    await deleteLead(parsed.data.id);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('removeLead failed:', error);
    return { success: false, message: 'Could not delete the lead.' };
  }
}
