<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'
import {
  Button,
  Divider,
  Checkbox,
  LinkText,
  InputText,
  InputPassword
} from '@/components'
import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { type UserLoginParams } from '@/queries'
import { AuthContainer } from '@/views/auth/components'
import { GoogleLogin } from 'vue3-google-login'
import { onMounted } from 'vue'

const form = useForm({
  defaultValues: {
    password: '',
    username: ''
  },
  onSubmit: async ({ value }) =>
    loginMutation({ password: value.password, username: value.username })
})

const userLogin = async (params: UserLoginParams) => {
  return ApiClient.post(ENDPOINTS.Auth.Login, {
    ...params
  }).catch((error) => {
    const serverError = error.response.data.message
    serverError.forEach(
      (e: { id: 'password' | 'username' | 'all'; content: string }) => {
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
    )
  })
}

const useUserLoginMutation = () => {
  return useMutation({
    mutationFn: (params: UserLoginParams) => userLogin(params)
  })
}

const { mutate: loginMutation } = useUserLoginMutation()
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
      <div class="flex flex-row w-full gap-4">
        <div class="border border-0.5 h-[40px] border-[#dadce0] rounded">
          <vue-apple-login
            color="white"
            :border="false"
            :radius="0"
            height="38px"
          ></vue-apple-login>
        </div>
        <GoogleLogin
          dir="ltr"
          style="margin-left: 2px"
          logoSize="large"
          class="google-signin"
          :callback="() => console.log('logged in')"
        >
        </GoogleLogin>
      </div>
    </div>
  </AuthContainer>
</template>

<style>
.google-signin {
  left: -1rem;
}
.g-btn {
  width: 100% !important;
}

#appleid-signin {
  height: 40px;
  width: 100% !important;
}

#container {
  background-color: orangered;
}
</style>
