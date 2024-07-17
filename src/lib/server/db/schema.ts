import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
	pgEnum
} from 'drizzle-orm/pg-core';
import ISO6391, { type LanguageCode } from 'iso-639-1';

export const usersTable = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
});

export const accountsTable = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		// TODO: .$type<AdapterAccountType>()
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessionsTable = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokensTable = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token]
		})
	})
);

export const authenticatorsTable = pgTable(
	'authenticator',
	{
		credentialID: text('credentialID').notNull().unique(),
		userId: text('userId')
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		providerAccountId: text('providerAccountId').notNull(),
		credentialPublicKey: text('credentialPublicKey').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credentialDeviceType').notNull(),
		credentialBackedUp: boolean('credentialBackedUp').notNull(),
		transports: text('transports')
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID]
		})
	})
);

export const languageEnum = pgEnum(
	'language',
	ISO6391.getAllCodes() as unknown as readonly [string, ...string[]]
);

export const pagesTable = pgTable('page', {
	id: uuid('id').primaryKey(),
	creator: text('creator')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
	title: text('title').notNull(),
	url: text('url').notNull(),
	language: languageEnum('language').$type<LanguageCode>().notNull(),
	image: text('image')
});
