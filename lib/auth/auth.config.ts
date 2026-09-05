import type { NextAuthConfig } from 'next-auth';

// Edge-safe base config: no providers that touch the database, so this can be
// used by middleware.ts (which runs on the edge runtime). The DB-backed
// Credentials provider is added in lib/auth/auth.ts (Node runtime only).
export const authConfig = {
  // Infer the host/origin from the incoming request rather than a hardcoded
  // URL, so redirects work on whatever port dev runs on and on Vercel.
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Route protection: only signed-in users may reach /dashboard.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
