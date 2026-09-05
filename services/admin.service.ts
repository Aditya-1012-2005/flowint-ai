import 'server-only';
import { prisma } from '@/lib/db/prisma';
import type { AdminUser } from '@/lib/generated/prisma/client';

export function getAdminByEmail(email: string): Promise<AdminUser | null> {
  return prisma.adminUser.findUnique({ where: { email } });
}
