<script setup lang="ts">
import * as R from 'remeda'
import { useForm } from '@tanstack/vue-form'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'

import { Button, InputPassword } from '@/components'
import { ApiClient, setAuthCredentials } from '@/utils'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import { AuthContainer } from '@/views/auth/components'

type FieldServerError<T> = { id: T; content: string }
type CreateUserParams = { username: string; password: string }

export type User = {
  id: number
  name: any
  email: any
  mobile: any
  username: string
  avatar: any
  score: any
  prefer_language: any
  is_register_complete: boolean
  invite_code: any
  role: string
  followings_count: number
  followers_count: number
  location: any
  is_whitelist: boolean
  bio: any
}
export type CreateUserApiResponse = {
  token: string
  user: User
}

const route = useRoute()
const router = useRouter()

const createUser = async (params: CreateUserParams) => {
  return ApiClient.post<ApiResponseType<CreateUserApiResponse, 'all' | 'password'>>(
    ENDPOINTS.Auth.Register.CreateUser,
    { ...params }
  ).catch((error) => {
    const serverError = error.response.data.message
    serverError.forEach((e: FieldServerError<number>) => {
      form.setFieldMeta('password', (meta) => {
        return { ...meta, errorMap: { onServer: e.content } }
      })
    })
  })
}

const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (params: CreateUserParams) => createUser(params),
    onSuccess: (response) => {
      // @ts-ignore
      const token = R.pipe(
        response.data.results,
        R.find((obj) => 'token' in obj),
        R.prop('token')
      ) as string
      setAuthCredentials(token, () =>
        router.replace({ path: '/sign-up/choose-email-or-number' })
      )
    }
  })
}

const { mutate: handleCreateUser, data } = useCreateUserMutation()

const form = useForm({
  defaultValues: {
    password: ''
  },
  onSubmit: ({ value }) =>
    handleCreateUser({
      password: value.password,
      username: (route.query as { username: string }).username
    })
})
</script>

<template>
  <AuthContainer>
    <form
      @submit="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }
      "
    >
      <div class="flex flex-col space-y-6">
        <div class="space-y-6">
          <div class="flex flex-col gap-3 text-center">
            <h3 class="text-st-one font-demi-bold">ایجاد گذرواژه</h3>
            <p class="text-st-two text-secondary-500">
              بنا به‌‌دلایل امنیتی، گذرواژه‌تان باید حداقل ۸ کاراکتر داشته باشد.
            </p>
          </div>
          <form.Field name="password">
            <template v-slot="{ field, state }">
              <InputPassword
                fluid
                :state="state"
                placeholder="گذرواژه"
                @blur="field.handleBlur"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
              />
            </template>
          </form.Field>
        </div>
        <Button fluid label="بعدی" type="submit" />
      </div>
    </form>
  </AuthContainer>
</template>
