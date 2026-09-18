import { z } from 'zod'

const emailSchema = z
	.string()
	.min(1, 'Email is required')
	.email('Invalid email address')
const passwordSchema = z
	.string()
	.min(6, 'Password must be at least 6 characters')

export const signUpSchema = z
	.object({
		username: z.string().min(3, 'Username must be at least 3 characters'),
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: z
			.string()
			.min(6, 'Password must be at least 6 characters'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const logInSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
	email: emailSchema,
})

export const otpModalSchema = z.object({
	code: z
		.string()
		.trim()
		.regex(/^\d{6}$/, 'Code must be exactly 6 digits'),
	email: emailSchema,
})
