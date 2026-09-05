import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { LogoutButton } from '@/components/features/logout-button';
import { LeadsTable, type LeadListItem } from '@/components/features/leads-table';
import { auth } from '@/lib/auth/auth';
import { listLeads } from '@/services/lead.service';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

// Always render fresh, since leads change and statuses are updated in place.
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await auth();

  let leads: LeadListItem[] | null = null;
  let loadError = false;

  try {
    const rows = await listLeads();
    leads = rows.map((lead) => ({
      id: lead.id,
      name: lead.name,
      businessName: lead.businessName,
      phone: lead.phone,
      email: lead.email,
      message: lead.message,
      status: lead.status,
      createdAt: lead.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Failed to load leads:', error);
    loadError = true;
  }

  return (
    <section>
      <Container className="py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-foreground text-2xl font-bold tracking-tight">Leads</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Signed in as {session?.user?.email ?? 'admin'}
              {leads ? ` · ${leads.length} total` : ''}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8">
          {loadError ? (
            <div className="border-destructive/30 bg-destructive/5 rounded-3xl border p-8 text-center">
              <p className="text-destructive font-semibold">Couldn&apos;t load leads.</p>
              <p className="text-muted-foreground mt-1 text-sm">
                The database may be unavailable. Check the connection and try again.
              </p>
            </div>
          ) : leads && leads.length > 0 ? (
            <LeadsTable leads={leads} />
          ) : (
            <div className="border-border bg-card rounded-3xl border p-12 text-center">
              <p className="text-foreground font-bold">No leads yet</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Submissions from the contact form will show up here.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
