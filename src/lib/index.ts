import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDB(client?: D1Database) {
	if (!client) throw new Error('Something went wrong!');
	const db = drizzle(client, { schema });

	return db;
}
