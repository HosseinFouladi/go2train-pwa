import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { loginQueryKeys, type UserLoginParams } from '.'

export async function userLogin(params: UserLoginParams) {
  return ApiClient.version('v2').post(ENDPOINTS.Auth.Login, params)
}

export function useUserLoginMutation(params: UserLoginParams) {
  return useMutation({
    queryFn: () => userLogin(params),
    // @ts-ignore
    mutationFn: () => loginQueryKeys.login(params)
  })
}
