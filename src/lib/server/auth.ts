import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { db } from './db';
import {
	accountsTable,
	authenticatorsTable,
	sessionsTable,
	usersTable,
	verificationTokensTable
} from './db/schema';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db, {
		accountsTable,
		usersTable,
		authenticatorsTable,
		sessionsTable,
		verificationTokensTable
	}),
	providers: [GitHub]
});
