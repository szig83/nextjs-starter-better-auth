import LoginForm from '@/components/auth/SignInForm'
import Modal from '@/components/CustomModal'
import Link from 'next/link'

export default function SignInPage() {
	return (
		<Modal
			modalTitle="Bejelentkezés"
			modalFooter={
				<div className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
					Nincs még fiókja?
					<Link href="/sign-up" className="text-primary" scroll={false}>
						Hozzon létre egyet!
					</Link>
				</div>
			}
		>
			<LoginForm />
		</Modal>
	)
}
