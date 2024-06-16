<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { InputText, Button } from '@/components'

type SendCodeParams = { username: string }
type FieldServerError<T> = { id: T; content: string }

const router = useRouter()

const sendCode = async (params: SendCodeParams) => {
  return ApiClient.post(ENDPOINTS.Auth.Register.SendCode, { ...params }).catch(
    (error) => {
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('email', (meta) => {
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
      router.replace({
        path: '/sign-up/confirm-code-email',
        query: { email: form.state.values.email }
      })
    }
  })
}

const { mutate: handleSendCode } = useSendCodeMutation()

const form = useForm({
  defaultValues: {
    email: ''
  },
  onSubmit: ({ value: { email } }) => handleSendCode({ username: email })
})
</script>

<template>
  <div class="space-y-6">
    <form
      @submit="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }
      "
    >
      <form.Field name="email">
        <template v-slot="{ field, state }">
          <InputText
            fluid
            :state="state"
            @blur="field.handleBlur"
            :value="field.state.value"
            @input="(e) => field.handleChange(e.target.value)"
            placeholder="ایمیل خود را وارد کنید ..."
          />
        </template>
      </form.Field>
      <Button type="submit" label="بعدی" />
    </form>
  </div>
</template>
