<script setup lang="ts">
import * as R from 'remeda'
import { useForm } from '@tanstack/vue-form'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient, setAuthCredentials } from '@/utils'
import { Button, InputPassword } from '@/components'
import { AuthContainer } from '@/views/auth/components'

type FieldServerError<T> = { id: T; content: string }
type CreateUserParams = { username: string; password: string }

const route = useRoute()
const router = useRouter()

const createUser = async (params: CreateUserParams) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.CreateUser, { ...params }).catch(
    (error) => {
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('password', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      })
    }
  )
}

const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (params: CreateUserParams) => createUser(params),
    onSuccess: (response) => {
      // TODO: Update Typing for the API Responses
      const token = R.pipe(
        // @ts-ignore
        response.data.data.results,
        // @ts-ignore
        R.find((obj) => 'token' in obj),
        // @ts-ignore
        R.prop('token')
      ) as unknown as string
      setAuthCredentials(token, () =>
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
