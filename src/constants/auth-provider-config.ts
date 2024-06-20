import { type GoogleLoginOptions } from './auth-provider-config.types'

export const GoogleLoginConfig: GoogleLoginOptions = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
} as const

export const AppleLoginConfig = {
  clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
  scope: 'name email',
  redirectURI: 'https://train-auth-front.go2tr.work/sign-in/',
  state: 'Initial user authentication request',
  usePopup: true
} as const
