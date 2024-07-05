// import { dev } from '$app/environment';
import { AUTH_SECRET } from '$env/static/private';
import { getDB } from '$lib';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

// let platform: App.Platform;

// if (dev) {
// 	const { getPlatformProxy } = await import('wrangler');
// 	platform = await getPlatformProxy();
// 	console.log('Platform initialised for local development');
// }

export const { handle, signIn, signOut } = SvelteKitAuth(async ({ platform }) => {
	const db = getDB(platform?.env.db);
	return {
		adapter: DrizzleAdapter(db),
		secret: AUTH_SECRET,
		providers: [GitHub]
	};
});
