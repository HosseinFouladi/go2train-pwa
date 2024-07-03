import { googleTokenLogin } from 'vue3-google-login'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'

export const loginWithGoogle = async () => {
  googleTokenLogin({
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
  })
    .then((response) => {
      const { access_token } = response
      // provider value -> google: 1, apple: 2
      ApiClient.post(ENDPOINTS.Auth.External, {
        token: access_token,
        provider: 1
      }).then((response) => console.log(response))
    })
    .catch((err) => console.warn(err.message))
}

export const loginWithApple = async () => {
  if (!window) return undefined

  // @ts-ignore
  const response = await window.AppleID.auth.signIn()
  console.log(response)
}
