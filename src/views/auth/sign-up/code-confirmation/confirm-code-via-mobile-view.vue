<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useForm } from '@tanstack/vue-form'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { InputText, Button, CountDown } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'
import { useMutation } from '@tanstack/vue-query'

const route = useRoute()

// TODO: Place Replace the Type and Prevent Redundancy
type FieldServerError<T> = { id: T; content: string }
type VerifyCodeParams = { username: string; code: string }

const verifyCode = async (params: VerifyCodeParams) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.VerifyCode, {
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

const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: (params: VerifyCodeParams) => verifyCode(params),
    onSuccess(data, variables, context) {
      console.log({ data, variables, context })
    }
  })
}

type SendCodeParams = { username: string }

const sendCode = async (params: SendCodeParams) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.SendCode, { ...params }).catch(
    (error) => {
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('code', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      })
    }
  )
}

const useSendCodeMutation = () => {
  return useMutation({
    mutationFn: (params: SendCodeParams) => sendCode(params),
    onSuccess(data, variables, context) {
      console.log({ data, variables, context })
    }
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
            <Button type="submit" label="بعدی" />
          </div>
        </div>
      </form>
    </div>
  </AuthContainerWithNav>
</template>
