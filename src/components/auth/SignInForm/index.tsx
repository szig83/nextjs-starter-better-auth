'use client'

//import { Divider } from '@heroui/react'
import { DividerWithText } from '@/components/DividerWithText'

import Credential from './Credential'
import Social from './Social'

export default function SignInForm({
	isInterceptingModal,
	isAdminPlace = false,
	redirectTo = '/',
}: Readonly<{ isInterceptingModal?: boolean; isAdminPlace?: boolean; redirectTo?: string }>) {
	return (
		<>
			<Credential isInterceptingModal={isInterceptingModal} redirectTo={redirectTo} />
			{!isAdminPlace && (
				<>
					<DividerWithText text="vagy" />
					<Social />
				</>
			)}
		</>
	)
}
