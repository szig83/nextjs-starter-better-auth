import { signIn } from '@/actions/auth-actions'

export default async function PageTeszt() {
	return (
		<form action={signIn}>
			PageTeszt<button type="submit">katt</button>
		</form>
	)
}
