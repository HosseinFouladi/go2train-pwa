import { ApiClient } from '@/utils'

export const setAuthCredentials = (token: string, cb: Function) => {
  ApiClient.setToken(token)
  cb()
}
