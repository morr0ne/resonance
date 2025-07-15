import { drizzle } from 'drizzle-orm/bun-sql';

export const db = drizzle(import.meta.env.DATABASE_URL);
