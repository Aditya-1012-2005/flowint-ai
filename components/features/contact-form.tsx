'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { leadSchema, type LeadInput } from '@/lib/validations/lead';
import { submitLead } from '@/app/actions/lead';
import { cn } from 'cn';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      businessName: '',
      phone: '',
      email: '',
      message: '',
      company: '',
    },
  });

  async function onSubmit(values: LeadInput) {
    const result = await submitLead(values);

    if (result.success) {
      setSubmitted(true);
      return;
    }

    if (result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof LeadInput, { message });
      }
    }
    toast.error(result.message ?? 'Something went wrong. Please try again.');
  }

  if (submitted) {
    return (
      <div className="border-border bg-card rounded-lg border p-8 text-center shadow-sm">
        <div className="bg-success/10 text-success mx-auto flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-7" aria-hidden />
        </div>
        <h2 className="text-foreground mt-4 text-xl font-semibold">Thanks — we&apos;ve got it.</h2>
        <p className="text-muted-foreground mt-2">
          Someone from the Flowint AI team will reach out to you shortly to set up your free demo.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-border bg-card rounded-lg border p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            autoComplete="organization"
            aria-invalid={!!errors.businessName}
            {...register('businessName')}
          />
          {errors.businessName && <FieldError>{errors.businessName.message}</FieldError>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register('phone')}
            />
            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">What would you like help with?</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us a bit about your business and what's taking up your time right now."
            aria-invalid={!!errors.message}
            {...register('message')}
          />
          {errors.message && <FieldError>{errors.message.message}</FieldError>}
        </div>

        {/* Honeypot — visually hidden, off-screen, not focusable/announced. */}
        <div aria-hidden className="hidden">
          <label htmlFor="company">Company (leave blank)</label>
          <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="bg-cta text-cta-foreground hover:bg-cta-hover"
        >
          {isSubmitting ? 'Sending…' : 'Book my free demo'}
        </Button>
      </div>
    </form>
  );
}

function FieldError({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-destructive text-sm', className)}>{children}</p>;
}
