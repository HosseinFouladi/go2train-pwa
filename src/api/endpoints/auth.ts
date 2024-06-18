export const AuthEndpoints = Object.freeze({
  Login: '/v2/auth/login',
  Register: {
    CheckUsername: '/v2/auth/register/check-username',
    CreateUser: '/v2/auth/register/user',
    SendCode: '/v2/auth/register/send-code',
    VerifyCode: '/v2/auth/register/verify-code'
  },
  ForgetPassword: {
    SendCode: '/v2/auth/forget-password/send-code',
    CheckCode: '/v2/auth/forget-password/check-code',
    ChangePassword: '/v2/auth/forget-password/change-password'
  }
})
