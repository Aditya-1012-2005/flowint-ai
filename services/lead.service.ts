import 'server-only';
import { prisma } from '@/lib/db/prisma';
import type { Lead, LeadStatus } from '@/lib/generated/prisma/client';
import type { LeadInput } from '@/lib/validations/lead';

type CreateLeadData = Pick<LeadInput, 'name' | 'businessName' | 'phone' | 'email' | 'message'>;

/** Persists a validated lead submission. */
export function createLead(data: CreateLeadData): Promise<Lead> {
  return prisma.lead.create({ data });
}

/** All leads, newest first — for the admin dashboard. */
export function listLeads(): Promise<Lead[]> {
  return prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
}

/** Updates a lead's follow-up status. */
export function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  return prisma.lead.update({ where: { id }, data: { status } });
}

/** Removes a lead (e.g. spam). */
export function deleteLead(id: string): Promise<Lead> {
  return prisma.lead.delete({ where: { id } });
}
