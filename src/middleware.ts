import { NextRequest } from 'next/server'

import routeGuard from '@/lib/routeGuard'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { betterFetch } from '@better-fetch/fetch'
import { headers } from 'next/headers'
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
	//if (request.headers.get('cookie')!.includes('better-auth.session_token=')) {
	const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
		baseURL: request.nextUrl.origin,
		headers: {
			//get the cookie from the request
			cookie: request.headers.get('cookie') || '',
		},
	})

	if (!session) {
		//	await auth.api.signOut()
		//return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
	}
	//}

	/**
	 * Utvonal vedelem
	 */
	return routeGuard.all(request, session)
	//return NextResponse.next()
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
