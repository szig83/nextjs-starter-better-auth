import { serial, varchar, timestamp, integer, boolean, text } from 'drizzle-orm/pg-core'
import { relations as drizzleRelations } from 'drizzle-orm'
import { users } from '../users/users'
import { providers } from './providers'
import { authSchema as schema } from '../schema'

const accounts = schema.table('accounts', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	providerAccountId: text('provider_account_id').notNull(),
	//accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	//.references(() => providers.id),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
	scope: varchar('scope', { length: 255 }),
	idToken: text('id_token'),
	isActive: boolean('is_active').default(true),
	password: varchar('password', { length: 255 }),
	failedLoginAttempts: integer('failed_login_attempts').default(0),
	lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
	passwordChangedAt: timestamp('password_changed_at', { withTimezone: true }),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

const relations = drizzleRelations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
	provider: one(providers, {
		fields: [accounts.providerId],
		references: [providers.id],
	}),
}))

export { accounts, relations }
