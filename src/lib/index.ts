import { drizzle } from 'drizzle-orm/d1';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import * as schema from './schema';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export function getDB(client?: D1Database) {
	if (!client) throw new Error('Something went wrong!');
	const db = drizzle(client, { schema });

	return db;
}

export function getAuth(client?: D1Database) {
	const db = getDB(client);
	const adapter = new DrizzleSQLiteAdapter(db, schema.sessionTable, schema.userTable);
	const lucia = new Lucia(adapter, {
		sessionCookie: {
			attributes: {
				// set to `true` when using HTTPS
				secure: !dev
			}
		},
		getUserAttributes: (attributes) => {
			return {
				// attributes has the type of DatabaseUserAttributes
				githubId: attributes.github_id,
				username: attributes.username
			};
		}
	});

	return lucia;
}

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof getAuth>;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	username: string;
}
