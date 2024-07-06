import Cookies from 'js-cookie'
import { ApiClient } from '@/utils'
import { COOKIE_KEYS } from '@/constants'

export const setAuthCredentials = (token: string, cb?: Function) => {
  Cookies.set(COOKIE_KEYS.userToken, token, { sameSite: 'strict', secure: true })
  ApiClient.setToken(token)
  cb && typeof cb === 'function' && cb()
}

export const purgeAuthCredentials = () => {
  Cookies.remove(COOKIE_KEYS.userToken)
  ApiClient.removeToken()
}
