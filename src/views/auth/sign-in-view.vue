<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'
import _ from 'lodash'
import {
  Button,
  Divider,
  Checkbox,
  LinkText,
  InputText,
  InputPassword
} from '@/components'
import { useOs } from '@/hooks'
import { ENDPOINTS, type ApiResponseType } from '@/api'
import { AuthContainer } from '@/views/auth/components'
import { AppleIcon, GoogleIcon } from '@/components/icons'
import { ApiClient, loginWithApple, loginWithGoogle } from '@/utils'
import type { UserLoginParams, UserLoginResponseType } from '@/queries'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const operatingSystem = useOs()

const form = useForm({
  defaultValues: {
    password: '',
    username: ''
  },
  onSubmit: async ({ value }) =>
    loginMutation({ password: value.password, username: value.username })
})

const userLogin = async (params: UserLoginParams) => {
  return ApiClient.post<
    ApiResponseType<
      UserLoginResponseType,
      { id: 'all' | 'username' | 'password'; content: string }
    >
  >(ENDPOINTS.Auth.Login, {
    ...params
  })
    .then((res) =>
      _.set(
        _.cloneDeep(res),
        'data.results',
        _.head(res.data.results as unknown as Array<UserLoginResponseType>)
      )
    )
    .then((data) => {
      if (data.success) {
        const token = data?.data.results.token ?? ''
        setAuth(token, () => router.replace({ name: 'user-subscriptions' }))
      }
    })
    .catch((error) => {
      const serverError = error.response.data.message
      for (const e of serverError) {
        if (e.id === 'all') {
          return form.setFieldMeta('password', (meta) => ({
            ...meta,
            errorMap: {
              onServer: e.content
            }
          }))
        }
        form.setFieldMeta(e.id, (meta) => ({
          ...meta,
          errorMap: {
            onServer: e.content
          }
        }))
      }
      throw new Error(error)
    })
}

const router = useRouter()
const { setAuth } = useAuthStore()

const { mutate: loginMutation } = useMutation({
  mutationFn: (params: UserLoginParams) => userLogin(params)
})

onMounted(() => {
  window.AppleID.auth.init({
    clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
    scope: 'email name ',
    redirectURI: import.meta.env.VITE_APPLE_CLIENT_REDIRECT_URI,
    state: 'SignInUserAuthenticationRequest',
    usePopup: true
  })

  document.addEventListener(
    'AppleIDSignInOnFailure',
    function _onAppleSignInOnFailure(event) {
      alert('Something went wrong!')
    }
  )

  alert(window.location.origin)

  document.addEventListener(
    'AppleIDSignInOnSuccess',
    function _onAppleSignInOnSuccess(event) {
      const { state } = event.detail.authorization
      const { email, name } = event.detail.user
      // We are checking that the request we send matches the one we receive.
      if (state === 'SignInUserAuthenticationRequest') {
        const { code, id_token } = event.detail.authorization
        // Do something with id_token and code...
        // User details email, name...
        alert(`id token: ${id_token}, code: ${code}`)
      } else {
        alert('Something went Wrong!')
      }
    }
  )
})
</script>

<template>
  <AuthContainer>
    <div class="w-full">
      <div class="flex flex-col gap-8 my-9">
        <form>
          <form.Field name="username">
            <template v-slot="{ field, state }">
              <InputText
                :fluid="true"
                :value="field.state.value"
                @blur="field.handleBlur"
                @input="(e) => field.handleChange(e.target.value)"
                placeholder="نام کاربری خود را وارد کنید ..."
                :state="state"
              />
            </template>
          </form.Field>
          <form.Field name="password">
            <template v-slot="{ field, state }">
              <InputPassword
                :fluid="true"
                :value="field.state.value"
                @blur="field.handleBlur"
                @input="(e) => field.handleChange(e.target.value)"
                placeholder="رمز عبور ..."
                :state="state"
              />
            </template>
          </form.Field>
        </form>
      </div>
      <div class="flex flex-row items-center justify-between gap-4 my-3">
        <Checkbox label="‌ذخیره اطلاعات ورود" />
        <LinkText to="/forget-password" label="فراموشی رمز عبور" />
      </div>
      <Button
        fluid
        type="submit"
        label="ورود به پنل"
        @click="() => form.handleSubmit()"
      />
      <Divider sx="py-[16px]" />
      <div class="flex flex-col w-full gap-4">
        <Button
          fluid
          label="ورود با اپل"
          mode="secondary"
          variant="outlined"
          :iconLeft="AppleIcon"
          @click="loginWithApple"
          v-if="operatingSystem === 'macos' || operatingSystem === 'ios'"
        />
        <Button
          fluid
          @click="
            () =>
              loginWithGoogle((token) =>
                setAuth(token, () => router.push({ name: 'user-subscriptions' }))
              )
          "
          mode="secondary"
          variant="outlined"
          :iconLeft="GoogleIcon"
          label="ورود با گوگل"
        />
      </div>
    </div>
  </AuthContainer>
</template>
