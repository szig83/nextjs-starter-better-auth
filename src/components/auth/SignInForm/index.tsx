'use client'

import { Divider } from '@heroui/react'

import Credential from './Credential'
import Social from './Social'
import Link from 'next/link'

export default function SignInForm({
	isModal,
	isAdminPlace = false,
	redirectTo = '/',
}: Readonly<{ isModal?: boolean; isAdminPlace?: boolean; redirectTo?: string }>) {
	return (
		<>
			<Credential isModal={isModal} redirectTo={redirectTo} />
			{!isAdminPlace && (
				<>
					<Divider />
					<Social />
					<p className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
						Nincs más fiókja?
						<Link href="/sign-up" className="text-primary" scroll={false}>
							Hozzon létre egyet!
						</Link>
					</p>
				</>
			)}
		</>
	)
}
