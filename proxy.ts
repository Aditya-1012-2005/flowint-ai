import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/auth.config';

// Next.js 16 proxy (formerly "middleware"). Uses the edge-safe config (no DB
// providers) so route protection runs here. authConfig's `authorized`
// callback gates /dashboard.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/dashboard/:path*'],
};
