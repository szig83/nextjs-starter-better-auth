import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { betterFetch } from '@better-fetch/fetch'
import routeGuard from '@/lib/routeGuard'

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
	//let session: Session | null = null

	//if (request.headers.get('cookie')?.includes('app.session_token=')) {
	console.log(request.headers.get('cookie'))
	const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get('cookie') || '',
		},
	})

	//console.log(data)

	//session = data

	if (!session) {
		//const response = NextResponse.redirect(new URL('/sign-in', request.nextUrl))
		//response.cookies.delete('app.session_token')
		//return response
	}
	//}

	/**
	 * Utvonal vedelem
	 */
	return routeGuard.all(request, session)
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
