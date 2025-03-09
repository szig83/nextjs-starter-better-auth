import { varchar, text, timestamp, serial } from 'drizzle-orm/pg-core'
import { relations as drizzleRelations, InferSelectModel } from 'drizzle-orm'
import { userGroups } from './user_groups'
import { authSchema as schema } from '../schema'

import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const groups = schema.table('groups', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	description: text('description'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

const relations = drizzleRelations(groups, ({ many }) => ({
	userGroups: many(userGroups),
}))

const groupSchema = createInsertSchema(groups)

export { groups, relations as groupsRelations, groupSchema }
export type GroupSchema = z.infer<typeof groupSchema>
export type GroupSelectModel = InferSelectModel<typeof groups>
