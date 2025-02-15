import { type DB } from '@/db'
import { groups, type GroupSchema } from '@/db/schemas'
import { groups as groupSeedConfig } from '@/db/seedConfig'

const initData: GroupSchema[] = Object.values(groupSeedConfig)

/**
 * Inicializálja a csoportok táblát a seedConfig-ban megadott adatokkal.
 *
 * @param db Az adatbázis példány.
 */
export async function seed(db: DB) {
	await db.insert(groups).values(initData)
}
