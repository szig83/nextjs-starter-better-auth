import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { betterFetch } from '@better-fetch/fetch'
import routeGuards from '@/lib/routes/guards'
import { NextResponse } from 'next/server'

type Session = typeof auth.$Infer.Session

/**
 * Keresek elott futo logika
 *
 * @description Authentikacio kezelese es utvonal navigalas
 *
 * @param request A NextRequest objektum
 * @returns A NextResponse objektum
 */
export async function middleware(request: NextRequest) {
	if (!request.nextUrl.pathname.startsWith('/get-session')) {
		const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
			baseURL: request.nextUrl.origin,
			query: {
				//disableCookieCache: true,
				//disableRefresh: true,
			},
			headers: {
				cookie: request.headers.get('cookie') || '',
			},
		})

		if (!session) {
		}

		/**
		 * Utvonal vedelem
		 */
		return routeGuards.all(request, session)
	} else {
		return NextResponse.next()
	}
}

/**
 * A middleware csak akkor fut le, ha az URL:
 * - Nem statikus fájl (pl. nem egy képfájl vagy JavaScript/CSS).
 * - Nem Next.js belső fájlokkal kapcsolatos (/_next/).
 * - Viszont minden más URL-re (dinamikus és statikus oldalak, API hívások) végrehajtódik.
 */
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)'],
}
