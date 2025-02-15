import { type Auth } from '@/lib/auth'
import { type DB } from '@/db'
import { type UserSchema, users, userGroups } from '@/db/schemas'
import { seedConfig } from '@/db/seedConfig'
import { eq } from 'drizzle-orm'

import { faker } from '@faker-js/faker'

type mockUser = Omit<Extract<UserSchema, { mode: 'signUp' }>, 'mode'>

const mock = () => {
	const data: mockUser[] = []

	for (let i = 0; i < seedConfig.users.count; i++) {
		data.push({
			name: faker.person.fullName(),
			password: faker.internet.password({ memorable: true, length: 10 }),
			email: faker.internet.email(),
		})
	}

	return data
}

const addSysAdmin = async (auth: Auth, db: DB) => {
	const result = await auth.api.signUpEmail({
		body: {
			name: seedConfig.users.sysadmin.name,
			email: seedConfig.users.sysadmin.email,
			password: seedConfig.users.sysadmin.password,
		},
	})

	if (result.user) {
		await db.update(users).set({ emailVerified: true }).where(eq(users.id, result.user.id))
		await db.insert(userGroups).values({
			userId: result.user.id,
			groupId: seedConfig.users.sysadmin.groupId,
		})
	}

	return result
}

const addAdmin = async (auth: Auth, db: DB) => {
	const result = await auth.api.signUpEmail({
		body: {
			name: seedConfig.users.admin.name,
			email: seedConfig.users.admin.email,
			password: seedConfig.users.admin.password,
		},
	})

	if (result.user) {
		await db.update(users).set({ emailVerified: true }).where(eq(users.id, result.user.id))
		await db.insert(userGroups).values({
			userId: result.user.id,
			groupId: seedConfig.users.admin.groupId,
		})
	}

	return result
}

const addContentEditor = async (auth: Auth, db: DB) => {
	const result = await auth.api.signUpEmail({
		body: {
			name: seedConfig.users.content_editor.name,
			email: seedConfig.users.content_editor.email,
			password: seedConfig.users.content_editor.password,
		},
	})

	if (result.user) {
		await db.update(users).set({ emailVerified: true }).where(eq(users.id, result.user.id))
		await db.insert(userGroups).values({
			userId: result.user.id,
			groupId: seedConfig.users.content_editor.groupId,
		})
	}

	return result
}

const addPublicUser = async (auth: Auth, db: DB, user: mockUser) => {
	const result = await auth.api.signUpEmail({
		body: user,
	})

	if (result.user) {
		await db.update(users).set({ emailVerified: true }).where(eq(users.id, result.user.id))
		await db.insert(userGroups).values({
			userId: result.user.id,
			groupId: seedConfig.users.public_user.groupId,
		})
	}

	return result
}

export async function seed(auth: Auth, db: DB) {
	// Rendszergazda felhasználó létrehozása
	const sysAdminUser = await addSysAdmin(auth, db)

	if (sysAdminUser.user) {
		await db
			.update(users)
			.set({ emailVerified: true })
			.where(eq(users.email, seedConfig.users.sysadmin.email))

		await addAdmin(auth, db)
		await addContentEditor(auth, db)

		if (seedConfig.users.count > 0) {
			const mockUsers = mock()
			for (const user of mockUsers) {
				await addPublicUser(auth, db, user)
			}
		}
	}
}
