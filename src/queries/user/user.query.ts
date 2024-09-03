import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { useQuery } from '@tanstack/vue-query'

export const getUserCups = async () => {
  return ApiClient.get(ENDPOINTS.User.Cups)
}

export const useUserCupsQuery = () => {
  return useQuery({ queryKey: ['user', 'cups'], queryFn: getUserCups })
}
