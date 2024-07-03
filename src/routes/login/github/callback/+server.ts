import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { getAuth, getDB, github } from '$lib';
import type { RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { userTable } from '$lib/schema';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	console.log({ code, state, storedState });

	console.log({ GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET });

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		console.log('validate_start');
		const tokens = await github.validateAuthorizationCode(code);
		console.log('validate_end');

		console.log('githubUserResponse-start');
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		console.log('githubUserResponse-end');

		console.log('githubUserResponse.json-start');
		console.log({ githubUserResponse });
		const githubUser: GitHubUser = await githubUserResponse.json();
		console.log(JSON.stringify({ githubUser }, null, 3));
		console.log('githubUserResponse.json-start');

		const db = getDB(event.platform?.env.db);
		const lucia = getAuth(event.platform?.env.db);

		// Replace this with your own DB client.
		const existingUser = await db.query.userTable.findFirst({
			where: (t) => eq(t.github_id, githubUser.id)
		});

		console.log(JSON.stringify({ githubUser, existingUser }, null, 3));

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateIdFromEntropySize(10); // 16 characters long
			console.log(JSON.stringify({ userId }, null, 3));

			// Replace this with your own DB client.
			await db.insert(userTable).values({
				id: userId,
				github_id: githubUser.id,
				username: githubUser.login
			});

			console.log(JSON.stringify({ userId }, null, 3));

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			console.log(JSON.stringify({ sessionCookie }, null, 3));

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log({ e });
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};

interface GitHubUser {
	id: number;
	login: string;
}
