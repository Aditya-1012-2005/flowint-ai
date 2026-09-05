import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { PrismaClient } from '@/lib/generated/prisma/client';

// The Neon serverless driver needs a WebSocket implementation in Node
// environments (Vercel's serverless functions run on Node). Browsers/edge
// provide a global WebSocket, so only set it when one isn't already present.
if (!neonConfig.webSocketConstructor) {
  neonConfig.webSocketConstructor = ws;
}

// A single connection string drives both the adapter (runtime queries, pooled)
// and — separately — the Prisma CLI for migrations via prisma7.config.ts.
// The Neon pool connects lazily, so constructing this at import time does not
// open a connection (safe during `next build`).
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

// Reuse a single PrismaClient across HMR reloads in development to avoid
// exhausting database connections. In production a fresh instance per
// serverless cold start is expected.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
