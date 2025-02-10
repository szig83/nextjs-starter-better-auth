import { betterAuth } from 'better-auth'
import db from '@/db'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import * as schema from '@/db/schemas/index'
import { nextCookies } from 'better-auth/next-js'
import { env } from '@/lib/env/server'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg', // or "pg" or "mysql"
		schema: {
			...schema,
		},
		//if all of them are just using plural form, you can just pass the option below
		usePlural: true,
	}),
	advanced: {
		generateId: false,
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID as string,
			clientSecret: env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	databaseHooks: {
		session: {
			create: {
				before: async (session) => {
					console.log(session)
				},
			},
		},
	},
	plugins: [nextCookies()],
})
