'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { setLeadStatus, removeLead } from '@/app/actions/admin-leads';
import { cn } from 'cn';

export type LeadListItem = {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
};

const STATUSES = ['NEW', 'CONTACTED', 'CLOSED'] as const;

const statusStyles: Record<LeadListItem['status'], string> = {
  NEW: 'bg-primary/10 text-primary',
  CONTACTED: 'bg-cta/10 text-cta',
  CLOSED: 'bg-muted text-muted-foreground',
};

export function LeadsTable({ leads }: { leads: LeadListItem[] }) {
  const [isPending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  function onStatusChange(id: string, status: LeadListItem['status']) {
    setBusyId(id);
    startTransition(async () => {
      const result = await setLeadStatus({ id, status });
      if (!result.success) toast.error(result.message ?? 'Could not update.');
      setBusyId(null);
    });
  }

  function onDelete(id: string) {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    setBusyId(id);
    startTransition(async () => {
      const result = await removeLead({ id });
      if (!result.success) toast.error(result.message ?? 'Could not delete.');
      setBusyId(null);
    });
  }

  return (
    <ul className="grid gap-4">
      {leads.map((lead) => (
        <li
          key={lead.id}
          className={cn(
            'border-border bg-card rounded-3xl border p-6 transition-opacity',
            isPending && busyId === lead.id && 'opacity-60',
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-foreground font-semibold">{lead.businessName}</h3>
                <Badge className={cn('border-transparent', statusStyles[lead.status])}>
                  {lead.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{lead.name}</p>

              <div className="text-muted-foreground mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:gap-6">
                <a
                  href={`mailto:${lead.email}`}
                  className="hover:text-foreground flex items-center gap-1.5"
                >
                  <Mail className="size-4" aria-hidden />
                  {lead.email}
                </a>
                <a
                  href={`tel:${lead.phone}`}
                  className="hover:text-foreground flex items-center gap-1.5"
                >
                  <Phone className="size-4" aria-hidden />
                  {lead.phone}
                </a>
              </div>

              <p className="text-foreground mt-3 text-sm whitespace-pre-wrap">{lead.message}</p>

              <p className="text-muted-foreground mt-3 text-xs">
                {new Date(lead.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <label className="sr-only" htmlFor={`status-${lead.id}`}>
                Status for {lead.businessName}
              </label>
              <select
                id={`status-${lead.id}`}
                value={lead.status}
                disabled={isPending && busyId === lead.id}
                onChange={(e) => onStatusChange(lead.id, e.target.value as LeadListItem['status'])}
                className="border-border bg-background focus-visible:border-ring focus-visible:ring-ring/30 h-9 rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Delete lead from ${lead.businessName}`}
                disabled={isPending && busyId === lead.id}
                onClick={() => onDelete(lead.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
