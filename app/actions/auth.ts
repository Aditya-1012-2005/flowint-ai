'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth/auth';
import { loginSchema, type LoginFormState, type LoginInput } from '@/lib/validations/auth';

export async function login(input: LoginInput): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: 'Please enter a valid email and password.' };
  }

  try {
    // On success this throws a redirect (handled by Next) to /dashboard.
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/dashboard',
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: 'Invalid email or password.' };
    }
    // Re-throw the redirect (and anything else) so Next can handle it.
    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/login' });
}
