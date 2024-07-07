<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from '@tanstack/vue-form'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'

import { ApiClient, setAuthCredentials } from '@/utils'
import { useUserInfoStore } from '@/store'
import { Button, InputPassword } from '@/components'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import { AuthContainer } from '@/views/auth/components'
import { type CreateUserResponseType } from '@/queries'

type FieldServerError<T> = { id: T; content: string }
type CreateUserParams = { username: string; password: string }

const route = useRoute()
const router = useRouter()
const userInfoStore = useUserInfoStore()
const { user } = storeToRefs(userInfoStore)
import _ from 'lodash'
import { useAuthStore } from '@/stores'

const createUser = async (params: CreateUserParams) => {
  return ApiClient.post<
    ApiResponseType<
      Array<CreateUserResponseType>,
      { id: 'password'; content: string }
    >
  >(ENDPOINTS.Auth.Register.CreateUser, { ...params })
    .then(
      (res) =>
        _.set(
          _.cloneDeep(res),
          'data.results',
          _.head(res.data.results)
        ) as any as ApiResponseType<
          CreateUserResponseType,
          { id: 'password'; content: string }
        >
    )
    .catch((error) => {
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('password', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      })
    })
}

const { setAuth } = useAuthStore()

const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (params: CreateUserParams) => createUser(params),
    onSettled(data, variables, context) {
      const token = data?.data.results.token
      setAuth(token as string, () =>
        router.push({ path: '/sign-up/choose-email-or-number' })
      )
    }
  })
}
const { mutate: handleCreateUser } = useCreateUserMutation()

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
