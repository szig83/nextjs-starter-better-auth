import { Button } from '@heroui/button'

export default function SignInCredentialButton({
	children,
}: Readonly<{
	children?: React.ReactNode
}>) {
	return (
		<div className="flex justify-center py-3">
			<Button color="primary" className="w-auto" type="submit">
				{children ?? 'Belépés'}
			</Button>
		</div>
	)
}
