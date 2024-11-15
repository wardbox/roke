/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineUserSignupFields } from 'wasp/auth/providers/types'

const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []

export const getEmailUserFields = defineUserSignupFields({
  username: (data: any) => data.email,
  isAdmin: (data: any) => adminEmails.includes(data.email),
  email: (data: any) => data.email,
})
