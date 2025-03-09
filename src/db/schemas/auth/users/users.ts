import { uuid, varchar, boolean, timestamp, serial } from 'drizzle-orm/pg-core'
import { relations as drizzleRelations, InferSelectModel } from 'drizzle-orm'
import { accounts } from '../authentication/accounts'
import { sessions } from '../authentication/sessions'
import { userGroups } from '../groups/user_groups'
import { userRoles } from '../roles/user_roles'
import { auditLogs } from '../audit/audit_logs'
import { verifications } from '../authentication/verifications'

import { authSchema as schema } from '../schema'

import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const users = schema.table('users', {
	id: serial('id').primaryKey(),
	name: varchar('full_name', { length: 100 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('email_verified').default(false),
	username: varchar('username', { length: 50 }).unique(),
	image: varchar('image', { length: 255 }),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
	deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

const relations = drizzleRelations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	userGroups: many(userGroups),
	userRoles: many(userRoles),
	auditLogs: many(auditLogs),
	verifications: many(verifications),
}))

const baseSchema = createInsertSchema(users, {
	name: z.string().min(1),
	email: z.string().email().min(5),
	emailVerified: z.boolean().optional(),
	username: z.string().optional(),
	image: z.string().optional(),
})
//.pick({ fullName: true, email: true, image: true })

const userSchema = z.union([
	z.object({
		mode: z.literal('signUp'),
		email: baseSchema.shape.email,
		password: z.string().min(6),
		name: baseSchema.shape.name,
	}),
	z.object({
		mode: z.literal('signIn'),
		email: baseSchema.shape.email,
		password: z.string().min(6),
	}),
	z.object({
		mode: z.literal('update'),
		name: baseSchema.shape.name,
		image: baseSchema.shape.image,
		id: z.number().min(1),
	}),
])

export { users, relations as usersRelations, userSchema }
export type UserSchema = z.infer<typeof userSchema>
export type UserSelectModel = InferSelectModel<typeof users>
