<script lang="ts" setup>
import { useForm } from '@tanstack/vue-form'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { InputText, Button, CountDown } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'

const route = useRoute()
const router = useRouter()

const verifyCode = async (params: { username: string; code: string }) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.VerifyCode, {
    ...params
  })
    .then(() => router.push({ name: 'user-subscriptions' }))
    .catch((error) => {
      const serverError = error.response.data.message
      for (const e of serverError) {
        form.setFieldMeta('code', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      }
    })
}

const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: (params: { username: string; code: string }) => verifyCode(params)
  })
}

const sendCode = async (params: { username: string }) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.SendCode, { ...params }).catch(
    (error) => {
      const serverError = error.response.data.message
      for (const e of serverError) {
        form.setFieldMeta('code', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      }
    }
  )
}

const useSendCodeMutation = () => {
  return useMutation({
    mutationFn: (params: { username: string }) => sendCode(params)
  })
}

const { mutate: handleSendCode } = useSendCodeMutation()
const { mutate: handleVerifyCode } = useVerifyCodeMutation()

const form = useForm({
  defaultValues: {
    code: ''
  },
  onSubmit: ({ value: { code } }) =>
    handleVerifyCode({ username: route.query.mobile as string, code })
})
</script>

<template>
  <AuthContainerWithNav title="تایید شماره موبایل">
    <div class="flex flex-[2_2_0%] w-full sm:mb-8 lg:mb-0 justify-center"></div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">کد تأیید را وارد کنید</h3>
        <p class="text-st-one text-secondary-500">
          کد تأیید شما به
          <span dir="ltr" class="text-inter">{{ route.query.mobile }}</span> ارسال
          شد.
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
                placeholder="کد ورود"
              />
            </template>
          </form.Field>

          <div class="space-y-2">
            <CountDown
              :onClick="
                () => handleSendCode({ username: route.query.mobile as string })
              "
            />
            <Button fluid type="submit" label="بعدی" />
          </div>
        </div>
      </form>
    </div>
  </AuthContainerWithNav>
</template>
