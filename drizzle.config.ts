import { defineConfig } from 'drizzle-kit';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default defineConfig({
	schema: './src/lib/schema/index.ts',
	out: './migrations',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
		token: process.env.CLOUDFLARE_D1_TOKEN!
	}
});