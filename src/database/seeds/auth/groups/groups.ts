import { type DB } from '@/database'
import { groups, type GroupSchema } from '@/database/schemas'
import { groups as groupSeedConfig } from '@/database/seedConfig'

const initData: GroupSchema[] = Object.values(groupSeedConfig)

/**
 * Inicializálja a csoportok táblát a seedConfig-ban megadott adatokkal.
 *
 * @param db Az adatbázis példány.
 */
export async function seed(db: DB) {
	await db.insert(groups).values(initData)
}
