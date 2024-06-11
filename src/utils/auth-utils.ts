import Cookies from 'js-cookie'

import { ApiClient } from '@/utils'
import { COOKIE_KEYS } from '@/constants'

export const setAuthCredentials = (token: string, cb: Function) => {
  Cookies.set(COOKIE_KEYS.userToken, token)
  ApiClient.setToken(token)
  cb()
}
