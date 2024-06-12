export const AuthEndpoints = Object.freeze({
  Login: '/auth/login',
  Register: {
    CheckUsername: '/auth/register/check-username',
    CreateUser: '/auth/register/user',
    SendCode: '/auth/register/send-code',
    VerifyCode: '/auth/register/verify-code'
  }
})
