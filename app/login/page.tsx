import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { LoginForm } from '@/components/features/login-form';
import { auth } from '@/lib/auth/auth';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <section className="bg-background-subtle flex flex-1 items-center justify-center">
      <Container className="py-16">
        <div className="border-border bg-card mx-auto w-full max-w-sm rounded-lg border p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-foreground text-2xl font-bold tracking-tight">Admin sign in</h1>
            <p className="text-muted-foreground mt-1 text-sm">Flowint AI team access only.</p>
          </div>
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
