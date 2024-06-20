export const AuthEndpoints = Object.freeze({
  Login: '/auth/login',
  External: '/auth/external',
  Register: {
    CheckUsername: '/auth/register/check-username',
    CreateUser: '/auth/register/user',
    SendCode: '/auth/register/send-code',
    VerifyCode: '/auth/register/verify-code'
  },
  ForgetPassword: {
    SendCode: '/auth/forget-password/send-code',
    CheckCode: '/auth/forget-password/check-code',
    ChangePassword: '/auth/forget-password/change-password'
  }
})
