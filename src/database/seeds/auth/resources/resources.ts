import { type DB } from '@/database'
import { resources } from '@/database/schemas'
import { resources as resourcesSeedConfig } from '@/database/seedConfig'

const initData = Object.values(resourcesSeedConfig)

/**
 * Inicializálja az erőforrások táblát a seedConfig-ban megadott adatokkal.
 *
 * @param db Az adatbázis példány.
 */
export async function seed(db: DB) {
	await db.insert(resources).values(initData)
}
