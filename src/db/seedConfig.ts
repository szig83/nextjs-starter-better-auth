export const groups = {
	sysadmin: {
		id: 1,
		name: 'Rendszergazda',
		description:
			'Korlátlan jogosultsággal rendelkező felhasználók, akik a teljes rendszert felügyelik és karbantartják',
	},
	admin: {
		id: 2,
		name: 'Adminisztrátor',
		description:
			'Teljes hozzáférőssel rendelkező felhasználók, akik kezelhetik a felhasználókat és minden adminisztrációs funkciót elérnek',
	},
	content_editor: {
		id: 3,
		name: 'Tartalomszerkesztő',
		description:
			'A publikus oldal tartalmainak kezelésére jogosult felhasználók, akik új tartalmakat hozhatnak létre és szerkeszthetik a meglévőket',
	},
	public_user: {
		id: 4,
		name: 'Általános felhasználó',
		description:
			'Alapszintű hozzáférőssel rendelkező felhasználók, akik bejelentkezés után használhatják az oldal publikus funkcióit',
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
