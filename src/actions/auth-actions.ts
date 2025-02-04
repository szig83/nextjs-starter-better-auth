'use server'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function signInWithCredentials(formData: FormData) {
	console.log(formData.get('email'), formData.get('password'))
	const result = await auth.api.signInEmail({
		body: {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		},
	})

	redirect('/')
}
