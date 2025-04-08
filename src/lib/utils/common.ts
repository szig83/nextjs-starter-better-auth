/**
 * @packageDocumentation
 * Szerver és kliens oldalon is használható segéd függvények, típusok
 */

import { z } from 'zod'

/**
 * A bemeneti string első karakterét nagybetűsre alakítja.
 * @param input Átalakítandó string
 * @returns Átalakított string
 */
export function capitalizeFirstLetter(input: string): string {
	if (input.length === 0) return input
	return input.charAt(0).toUpperCase() + input.slice(1)
}

/**
 * Nyelvi lokalizációhoz szükséges típus
 */
export type LocalizedText = {
	hu: string
	en: string
	[key: string]: string // További nyelvek
}

/**
 * Nyelvi lokalizációhoz szükséges validációs zod schema
 */
export const localizedTextSchema = z
	.object({
		hu: z.string().min(1),
		en: z.string().min(1),
	})
	.catchall(z.string()) // Bármilyen további nyelv is megengedett
