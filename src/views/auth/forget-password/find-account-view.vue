<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient, Array } from '@/utils'
import { useUserInfoStore } from '@/store'
import { InputText, Button, Avatar } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'

const router = useRouter()

const userInfoStore = useUserInfoStore()
const { user } = storeToRefs(userInfoStore)

type SendCodeParams = { username: string }
type FieldServerError<T> = { id: T; content: string }

const sendCode = async (params: SendCodeParams) => {
  return ApiClient.post(ENDPOINTS.Auth.ForgetPassword.SendCode, { ...params }).catch(
    (error) => {
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('username', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      })
    }
  )
}

const useSendCodeMutation = () => {
  return useMutation({
    mutationFn: (params: SendCodeParams) => sendCode(params),
    onSuccess: (response) => {
      // @ts-ignore
      user.value = Array.first(response.data.results).user
      router.replace({
        path: '/forget-password/confirm-code',
        query: { username: form.getFieldValue('username') }
      })
    }
  })
}

const { mutate: handleSendCode } = useSendCodeMutation()

const form = useForm({
  defaultValues: { username: '' },
  onSubmit: ({ value: { username } }) => handleSendCode({ username })
})
</script>

<template>
  <AuthContainerWithNav title="فراموشی رمز عبور">
    <div class="flex flex-[2_2_0%] w-full sm:mb-8 lg:mb-0 justify-center">
      <Avatar image="./src/assets/images/find-account-avatar.jpg" />
    </div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">حسابتان را پیدا کنید</h3>
        <p class="text-st-one text-secondary-500">
          نام کاربری یا ایمیل یا شماره تلفن مرتبط ‌شده با حسابتان را وارد کنید.
        </p>
      </div>
      <form
        @submit="
          (e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }
        "
      >
        <div class="flex flex-col gap-10">
          <form.Field name="username">
            <template v-slot="{ field, state }">
              <InputText
                fluid
                :state="state"
                @blur="field.handleBlur"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
                placeholder="نام کاربری یا ایمیل یا شماره تلفن خود را وارد کنید ..."
              />
            </template>
          </form.Field>
          <Button type="submit" label="بعدی" />
        </div>
      </form>
    </div>
  </AuthContainerWithNav>
</template>
