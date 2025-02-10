import Modal from '@/components/Modal'
import LoginForm from '@/components/auth/SignInForm'

export default async function LoginFormModal() {
	console.log('LoginFormModal')
	return (
		<Modal modalTitle="Bejelentkezés">
			<LoginForm isModal={true} />
		</Modal>
	)
}
