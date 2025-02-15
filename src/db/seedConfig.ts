export const groups = {
	public_user: {
		id: 'f442e8cf-727c-40b2-8e0b-9d4a55611605',
		name: 'Általános felhasználó',
		description:
			'Alapszintű hozzáférőssel rendelkező felhasználók, akik bejelentkezés után használhatják az oldal publikus funkcióit',
	},
	content_editor: {
		id: '3b8a2b8a-8a2b-8a2b-8a2b-8a2b8a2b8a2b',
		name: 'Tartalomszerkesztő',
		description:
			'A publikus oldal tartalmainak kezelésére jogosult felhasználók, akik új tartalmakat hozhatnak létre és szerkeszthetik a meglévőket',
	},
	admin: {
		id: '9b4f4d3e-0e67-4f6f-8e8e-6d6d6d6d6d6d',
		name: 'Adminisztrátor',
		description:
			'Teljes hozzáférőssel rendelkező felhasználók, akik kezelhetik a felhasználókat és minden adminisztrációs funkciót elérnek',
	},
	sysadmin: {
		id: '7305e4bf-80aa-4624-a427-232bee5b20ea',
		name: 'Rendszergazda',
		description:
			'Korlátlan jogosultsággal rendelkező felhasználók, akik a teljes rendszert felügyelik és karbantartják',
	},
}

export const users = {
	sysadmin: {
		groupId: groups.sysadmin.id,
		name: 'Rendszergazda',
		email: 'sysadmin@example.com',
		password: 'Balazs19830904',
	},
	admin: {
		groupId: groups.admin.id,
		name: 'Admin',
		email: 'admin@example.com',
		password: 'Balazs19830904',
	},
	content_editor: {
		groupId: groups.content_editor.id,
		name: 'Tartalomszerkesztő',
		email: 'content_editor@example.com',
		password: 'Balazs19830904',
	},
	public_user: {
		groupId: groups.public_user.id,
	},
	count: 5,
}

export const seedConfig = {
	users,
	groups,
}
