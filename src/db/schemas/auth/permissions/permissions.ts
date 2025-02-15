import { uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { relations as drizzleRelations } from 'drizzle-orm'
import { resources } from './resources'
import { rolePermissions } from '../roles/role_permissions'
import { authSchema as schema } from '../schema'

const permissions = schema.table('permissions', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	description: text('description'),
	resourceId: uuid('resource_id').references(() => resources.id),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

const relations = drizzleRelations(permissions, ({ one, many }) => ({
	resource: one(resources, {
		fields: [permissions.resourceId],
		references: [resources.id],
	}),
	rolePermissions: many(rolePermissions),
}))

export { permissions, relations }
