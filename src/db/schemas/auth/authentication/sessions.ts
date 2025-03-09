import { serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations as drizzleRelations } from 'drizzle-orm'
import { users } from '../users/users'
import { authSchema as schema } from '../schema'

const sessions = schema.table('sessions', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	token: varchar('token', { length: 255 }).notNull().unique(),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
	ipAddress: varchar('ip_address', { length: 255 }),
	userAgent: varchar('user_agent', { length: 255 }),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

const relations = drizzleRelations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}))

export { sessions, relations }
