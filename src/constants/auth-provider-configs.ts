export const GoogleLoginConfig = {
  buttonConfig: {
    locale: 'en',
    type: 'standard',
    width: '100%',
    shape: 'rectangular',
    size: 'large',
    theme: 'outline'
  },
  idConfiguration: {
    client_id:
      '91885605070-kb6849b1e825rgiugogr4he0s9e9uohq.apps.googleusercontent.com',
    scope: 'email profile openid'
  }
} as const

export const AppleLoginConfig = {
  clientId: 'co.go2train.web',
  scope: 'name email',
  redirectURI: 'https://train-auth-front.go2tr.work/sign-in/',
  state: 'Initial user authentication request',
  usePopup: true
} as const
