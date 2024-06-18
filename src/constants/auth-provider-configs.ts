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
    hosted_domain: 'https://train-auth-front.go2tr.work/',
    client_id:
      '91885605070-kb6849b1e825rgiugogr4he0s9e9uohq.apps.googleusercontent.com'
  }
} as const

export const AppleLoginConfig = {
  clientId: 'com.example.signin',
  scope: 'name email',
  redirectURI: 'https://train-auth-front.go2tr.work/sign-in/',
  state: 'this is stateInitial user authentication request',
  usePopup: true
} as const
