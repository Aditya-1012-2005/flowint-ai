import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Prisma 7 reads the migration connection URL from here (not the schema).
// Migrations should run over a DIRECT (unpooled) Neon connection; the app's
// runtime queries use the pooled DATABASE_URL via a driver adapter
// (lib/db/prisma.ts). `import "dotenv/config"` loads .env for CLI commands;
// Next.js loads .env itself at runtime.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
