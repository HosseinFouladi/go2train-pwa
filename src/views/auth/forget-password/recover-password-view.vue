<script lang="ts" setup>
import { first } from 'remeda'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'
import { useMutation } from '@tanstack/vue-query'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { ENDPOINTS } from '@/api'
import { ApiClient } from '@/utils'
import { useUserInfoStore } from '@/store'
import { InputPassword, Avatar, Button } from '@/components'
import { AuthContainerWithNav } from '@/views/auth/components'

const userInfoStore = useUserInfoStore()
const { user } = storeToRefs(userInfoStore)

type ConfirmPasswordParams = {
  username: string
  password: string
  password_confirmation: string
}
const confirmPassword = async (params: ConfirmPasswordParams) => {
  return ApiClient.version('v2').post(ENDPOINTS.Auth.ForgetPassword.ChangePassword, {
    ...params
  })
}

const router = useRouter()

const useConfirmPasswordMutation = () => {
  return useMutation({
    mutationFn: (params: ConfirmPasswordParams) => confirmPassword(params),
    onSuccess(props) {
      // @ts-ignore
      const msg = first(props.message).content
      Swal.fire({
        icon: 'success',
        title: 'عملیات موفق',
        text: msg,
        confirmButtonText: 'باشه',
        backdrop: true,
        customClass: {
          title: '!text-h5 !font-demi-bold !font-iransans',
          htmlContainer: '!text-st-two !text-secondary-700',
          popup: 'appearance-none rounded-3xl',
          confirmButton: 'text-primary-500 !text-bt-s !font-demi-bold',
          icon: 'appearance-none'
        },
        buttonsStyling: false
      }).then(() => router.replace({ path: '/' }))
    }
  })
}

const { mutate: handleConfirmPassword } = useConfirmPasswordMutation()

const form = useForm({
  defaultValues: {
    password: '',
    confirmPassword: ''
  },
  onSubmit: ({ value: { password, confirmPassword } }) =>
    handleConfirmPassword({
      password_confirmation: confirmPassword,
      password: password,
      // @ts-ignore
      username: user.value.username
    })
})
</script>

<template>
  <AuthContainerWithNav title="بازنشانی رمز عبور">
    <div class="flex flex-[2_2_0%] w-full sm:mb-8 lg:mb-0 justify-center">
      <Avatar label="عماد باقری" />
    </div>
    <div class="flex flex-col flex-[4_4_0%] max-w-sm gap-14">
      <div class="flex flex-col gap-3 text-center">
        <h3 class="text-h6 font-extra-bold">رمز عبور خود را بازنشانی کنید</h3>
        <p class="text-st-one text-secondary-500">
          رمز عبور جدید باید شامل حداقل ۸ کاراکتر، یک حرف کوچک و یک حرف بزرگ باشد.
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
          <form.Field name="password">
            <template v-slot="{ field, state }">
              <InputPassword
                fluid
                :state="state"
                @blur="field.handleBlur"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
                placeholder="رمز عبور جدیدتان..."
              />
            </template>
          </form.Field>
          <form.Field name="confirmPassword">
            <template v-slot="{ field, state }">
              <InputPassword
                fluid
                :state="state"
                @blur="field.handleBlur"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
                :toggle="false"
                placeholder="تکرار رمز عبور جدیدتان..."
              />
            </template>
          </form.Field>
          <Button label="بازنشانی رمز عبور" />
        </div>
      </form>
    </div>
  </AuthContainerWithNav>
</template>
