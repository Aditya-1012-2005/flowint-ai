import { z } from 'zod';

// Shared by the client form (react-hook-form) and the server action, so
// validation is identical on both sides. Field limits mirror the DB column
// sizes in prisma/schema.prisma.
export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.'),
  businessName: z
    .string()
    .trim()
    .min(2, 'Please enter your business name.')
    .max(150, 'Business name is too long.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(20, 'Phone number is too long.')
    .regex(/^[+()\-\s\d]+$/, 'Please enter a valid phone number.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .max(254, 'Email is too long.')
    .email('Please enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more (at least 10 characters).')
    .max(2000, 'Message is too long.'),
  // Honeypot: real users never fill this hidden field; bots often do.
  company: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadFormState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
};
