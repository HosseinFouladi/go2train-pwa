export const GoogleLoginConfig = {
  idConfiguration: {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'email profile openid'
  }
} as const

export const AppleLoginConfig = {
  clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
  scope: 'name email',
  redirectURI: 'https://train-auth-front.go2tr.work/sign-in/',
  state: 'Initial user authentication request',
  usePopup: true
} as const
