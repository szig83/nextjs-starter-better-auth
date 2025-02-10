import LoginForm from '@/components/auth/SignInForm'

export default function SignInPage() {
	return (
		<>
			<div className="flex h-full w-full flex-col items-center justify-center">
				<div className="w-full max-w-xs rounded-lg p-3 shadow-xl">
					<h2 className="mb-4 text-center text-2xl font-bold">Bejelentkezés</h2>
					<LoginForm />
				</div>
			</div>
		</>
	)
}
