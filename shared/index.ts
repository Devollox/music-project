import { z } from 'zod'

export const signUpSchema = z
	.object({
		username: z.string().min(3, 'Username must be at least 3 characters'),
		email: z
			.string()
			.min(1, 'Email is required')
			.email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const logInSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const forgotPasswordSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

export const otpModalSchema = z.object({
	code: z
		.string()
		.length(6, 'Code must be exactly 6 digits')
		.regex(/^\d+$/, 'Code must contain only digits'),
	email: z.string().email(),
})
