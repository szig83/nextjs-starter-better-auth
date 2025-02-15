import { sql, Table } from 'drizzle-orm'

import db, { DB } from '@/db'
import * as schema from '@/db/schemas'
import * as seeds from '@/db/seeds'
import { auth } from '@/lib/auth'

async function resetTable(db: DB, table: Table) {
	return db.execute(sql`truncate table ${table} restart identity cascade`)
}

async function main() {
	for (const table of [schema.users, schema.groups, schema.userGroups]) {
		await resetTable(db, table)
	}
	await seeds.groups(db)
	await seeds.users(auth, db)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		console.log('Seeding done!')
		process.exit(0)
	})
