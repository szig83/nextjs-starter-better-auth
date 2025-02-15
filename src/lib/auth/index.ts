import { betterAuth } from 'better-auth'
import db from '@/db'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
//import { createAuthMiddleware } from 'better-auth/api'
import * as schema from '@/db/schemas'
import { nextCookies } from 'better-auth/next-js'
import { config } from '@/lib/config'
import { eq } from 'drizzle-orm'
import { customSession } from 'better-auth/plugins'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			...schema,
		},
		usePlural: true,
	}),
	account: {
		modelName: 'accounts',
		fields: {
			accountId: 'providerAccountId',
		},
	},
	advanced: {
		generateId: false,
		cookiePrefix: config.SESSION_COOKIE_PREFIX,
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
	socialProviders: {
		google: {
			clientId: config.GOOGLE_CLIENT_ID as string,
			clientSecret: config.GOOGLE_CLIENT_SECRET as string,
		},
	},
	databaseHooks: {
		session: {
			create: {
				before: async (session) => {
					/** Mielott letrejon az uj session, toroljuk a felhasznalo meglevo sessionjeit.
					 * Ez megakadalyozza, hogy parhuzamosan be legyen jelentkezve.
					 */
					await db.delete(schema.sessions).where(eq(schema.sessions.userId, session.userId))
				},
			},
		},
	},
	/*hooks: {
		after: createAuthMiddleware(async (ctx) => {
			console.log('path:', ctx.path)
			if (ctx.path.startsWith('/get-session')) {
				console.log('user:', ctx.context.returned)
			}
		}),
	},*/
	plugins: [
		nextCookies(),
		customSession(async ({ user, session }) => {
			const roles = {
				admin: false,
				user: false,
			}
			const x = await db.select().from(schema.users).where(eq(schema.users.id, user.id))
			console.log('x', x)
			return {
				roles,
				user: {
					...user,
					newField: 'newField',
				},
				session,
			}
		}),
	],
})

export type Auth = typeof auth
export type SocialProvider =
	| 'github'
	| 'apple'
	| 'discord'
	| 'facebook'
	| 'microsoft'
	| 'google'
	| 'spotify'
	| 'twitch'
	| 'twitter'
	| 'dropbox'
	| 'linkedin'
	| 'gitlab'
	| 'reddit'
