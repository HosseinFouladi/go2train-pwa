import _ from 'lodash'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  UpdateUserProfileParams,
  UserProfileApiResponseType
} from './user-profile.types'
import type { MaybeRefDeep } from 'node_modules/@tanstack/vue-query/build/modern/types'

export const getUserProfile = () =>
  ApiClient.get<
    ApiResponseType<Array<UserProfileApiResponseType>, { id: ''; content: string }>
  >(ENDPOINTS.Profile.UserProfile).then((res) =>
    _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results))
  ) as Promise<
    ApiResponseType<UserProfileApiResponseType, { id: 'all'; content: string }>
  >

export const useGetUserProfileQuery = () =>
	useQuery({
		queryKey: ["user_profile", Date.now()],
		queryFn: getUserProfile,
	});

export const updateUserProfile = (params: UpdateUserProfileParams) => {
  return ApiClient.postForm<
    ApiResponseType<Array<UserProfileApiResponseType>, { id: ''; content: string }>
  >(ENDPOINTS.Profile.UpdateProfile, { ...params })
}

export const useUpdateProfileMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: MaybeRefDeep<
    | ((
        data: ApiResponseType<
          UserProfileApiResponseType[],
          {
            id: ''
            content: string
          }
        >,
        variables: UpdateUserProfileParams,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined
  >
  onError?: MaybeRefDeep<
    | ((
        error: Error,
        variables: UpdateUserProfileParams,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined
  >
}) => {
  return useMutation({
    mutationKey: ['user_profile'],
    mutationFn: (params: UpdateUserProfileParams) => updateUserProfile(params),
    onSuccess(data, variables, context) {
      onSuccess &&
        typeof onSuccess === 'function' &&
        onSuccess(data, variables, context)
    },
    onError: (error ,variables, context) => {
		onError&&
		typeof onError === 'function' &&
        onError(error, variables, context)
	}

  })
}
