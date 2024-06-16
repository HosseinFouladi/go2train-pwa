<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useForm } from '@tanstack/vue-form'
import { useRouter, useRoute } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { useUserInfoStore } from '@/store'
import { Avatar, InputText, Button } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'

const route = useRoute()
const router = useRouter()
const userInfoStore = useUserInfoStore()
const { user } = storeToRefs(userInfoStore)

type FieldServerError<T> = { id: T; content: string }

type CheckCodeParams = { username: string; code: string }
const checkCode = async (params: CheckCodeParams) => {
  return ApiClient.post(ENDPOINTS.Auth.ForgetPassword.CheckCode, {
    ...params
  }).catch((error) => {
    const serverError = error.response.data.message
    serverError.forEach((e: FieldServerError<number>) => {
      form.setFieldMeta('code', (meta) => {
        return { ...meta, errorMap: { onServer: e.content } }
      })
    })
  })
}

const useCheckCodeMutation = () => {
  return useMutation({
    mutationFn: (params: CheckCodeParams) => checkCode(params),
    onSuccess: () => router.replace({ path: '/forget-password/recover-password' })
  })
}

const { mutate: handleCheckCode } = useCheckCodeMutation()

const form = useForm({
  defaultValues: {
    code: ''
  },
  onSubmit({ value: { code } }) {
    handleCheckCode({ username: route.query.username as string, code })
  }
})
</script>

<template>
  <AuthContainerWithNav title="تأیید ایمیل">
    <div class="flex flex-[2_2_0%] min-h-min w-full sm:mb-8 lg:mb-0 justify-center">
      <Avatar :image="user.avatar" :label="user.name || user.username" />
    </div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">کد تأیید را وارد کنید</h3>
        <p class="text-st-one text-secondary-500">
          کد ۵ رقمی ارسال شده به
          {{ user.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2') }} را وارد
          کنید.
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
          <form.Field name="code">
            <template v-slot="{ field, state }">
              <InputText
                fluid
                :state="state"
                @blur="field.handleBlur"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
                placeholder="کد تأیید را وارد کنید"
              />
            </template>
          </form.Field>
          <Button type="submit" label="بعدی" />
        </div>
      </form>
    </div>
  </AuthContainerWithNav>
</template>
