<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { Button, InputText } from '@/components'
import { TickSquaredIcon } from '@/components/icons'
import { AuthContainer } from '@/views/auth/components'
import { SuggestedUsernames } from '@/views/auth/sign-up/components'

const router = useRouter()

type FieldServerError<T> = { id: T; content: string }

type CheckUsernameParams = {
  username: string
}

const suggestedUsernames = ref<Array<string> | undefined>(undefined)

const checkUsername = async (params: CheckUsernameParams) => {
  return ApiClient.version('v2')
    .post(ENDPOINTS.Auth.Register.CheckUsername, {
      ...params
    })
    .catch((error) => {
      const suggestedUsernamesServer = error.response.data.data.results.suggestions
      suggestedUsernames.value = suggestedUsernamesServer
      const serverError = error.response.data.message
      serverError.forEach((e: FieldServerError<number>) => {
        form.setFieldMeta('username', (meta) => {
          return { ...meta, errorMap: { onServer: e.content } }
        })
      })
    })
}

const useCheckUsernameMutation = () => {
  return useMutation({
    mutationFn: (params: CheckUsernameParams) => checkUsername(params)
  })
}

const selectSuggestedUsername = (username: string) => {
  form.setFieldMeta('username', (meta) => {
    return { ...meta, errorMap: { ...meta.errorMap, onServer: undefined } }
  })
  form.setFieldValue('username', username)
  handleCheckUsername({ username })
}

const { mutate: handleCheckUsername, data, isPending } = useCheckUsernameMutation()

const form = useForm({
  defaultValues: {
    username: ''
  },
  onSubmit: ({ value }) => handleCheckUsername({ username: value.username })
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
        <div>
          <div class="space-y-6">
            <div class="flex flex-col gap-3 text-center">
              <h3 class="text-st-one font-demi-bold">انتخاب نام کاربری</h3>
              <p class="text-st-two text-secondary-500">
                نام کاربری می‌تواند شامل حروف انگلیسی ، اعداد و زیرخط (_) باشد.
              </p>
            </div>
            <form.Field
              name="username"
              :asyncDebounceMs="300"
              :validators="{
                // @ts-ignore
                onChangeAsync: ({ value }) =>
                  handleCheckUsername({ username: value })
              }"
            >
              <template v-slot="{ field, state }">
                <InputText
                  fluid
                  :disabled="isPending"
                  placeholder="نام کاربری"
                  :state="state"
                  @blur="field.handleBlur"
                  :value="field.state.value"
                  @input="(e) => field.handleChange(e.target.value)"
                  :icon-left="
                    h(TickSquaredIcon, {
                      class: ['text-success-500', !data && 'hidden']
                    })
                  "
                />
              </template>
            </form.Field>
          </div>
          <SuggestedUsernames
            :selectSuggestedUsername="selectSuggestedUsername"
            v-if="suggestedUsernames && !data"
            :suggestions="suggestedUsernames"
          />
        </div>
        <Button
          fluid
          label="بعدی"
          @click="
            () =>
              router.push({
                path: '/sign-up/choose-password',
                query: { username: form.state.values.username }
              })
          "
        />
      </div>
    </form>
  </AuthContainer>
</template>
