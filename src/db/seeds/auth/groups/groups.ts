import { type DB } from '@/db'
import { groups, type GroupSchema } from '@/db/schemas'
import { groups as groupSeedConfig } from '@/db/seedConfig'

const initData: GroupSchema[] = Object.values(groupSeedConfig)

export async function seed(db: DB) {
	await db.insert(groups).values(initData)
}
