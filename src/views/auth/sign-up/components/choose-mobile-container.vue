<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { Button, TelInput } from '@/components'

type SendCodeParams = { username: string }
type FieldServerError<T> = { id: T; content: string }

const router = useRouter()

const sendCode = async (params: SendCodeParams) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.SendCode, { ...params }).catch(
    (error) => {
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('mobile', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      })
      throw error.response.data
    }
  )
}

const useSendCodeMutation = () => {
  return useMutation({
    mutationFn: (params: SendCodeParams) => sendCode(params),
    onSuccess: () => {
      router.push({
        path: '/sign-up/confirm-code-mobile',
        query: { mobile: form.state.values.mobile.split(' ').join('') }
      })
    }
  })
}

const { mutate: handleSendCode } = useSendCodeMutation()

const form = useForm({
  defaultValues: {
    mobile: ''
  },
  onSubmit: ({ value: { mobile } }) => handleSendCode({ username: mobile.trim() })
})
</script>

<template>
  <form
    @submit="
      (e) => {
        e.stopPropagation()
        e.preventDefault()
        form.handleSubmit()
      }
    "
  >
    <div class="space-y-6">
      <form.Field name="mobile">
        <template v-slot="{ field }">
          <TelInput
            :value="field.state.value"
            @input="(e) => field.handleChange(e.target.value)"
            placeholder="شماره تلفن خود را وارد کنید ..."
            dir="ltr"
          />
        </template>
      </form.Field>
      <Button fluid label="بعدی" type="submit" />
    </div>
  </form>
</template>
