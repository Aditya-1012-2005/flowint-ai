import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Please enter your email.').email('Enter a valid email.'),
  password: z.string().min(1, 'Please enter your password.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type LoginFormState = {
  success: boolean;
  message?: string;
};
