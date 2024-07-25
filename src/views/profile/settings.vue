<script lang="ts" setup>
import _ from 'lodash'
import { ref, watch } from 'vue'
import { useModal } from 'vue-final-modal'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ChangePasswordModal } from '@/views/profile/components'

import { ENDPOINTS, type ApiResponseType } from '@/api'
import { ApiClient } from '@/utils'
import { ArrowLeft } from '@/components/icons'
import { Switch, LineDivider } from '@/components'
import type { AppSettingResponseType } from '@/queries'

type AppSettingParams = {
  notifications: boolean
}

const getAppSettings = async () =>
  ApiClient.get<
    ApiResponseType<Array<AppSettingResponseType>, { id: 'all'; content: '' }>
  >(ENDPOINTS.Settings.AppSettings).then((res) =>
    _.set(_.cloneDeep(res), 'data.results', _.head(res.data.results))
  ) as Promise<ApiResponseType<AppSettingResponseType, { id: 'all'; content: '' }>>

const setAppSettings = async (params: AppSettingParams) =>
  ApiClient.put<
    ApiResponseType<Array<AppSettingResponseType>, { id: 'all'; content: '' }>
  >(ENDPOINTS.Settings.AppSettings, { options: { ...params } })

const { data } = useQuery({
  queryKey: ['settings', 'app_settings'],
  queryFn: () => getAppSettings()
})

const notificationEnabled = ref(data.value?.data.results.options.notifications)

watch(notificationEnabled, () => {
  appSettingsMutation({ notifications: notificationEnabled.value ?? false })
})

watch(
  () => data.value?.data.results,
  () => {
    notificationEnabled.value = data.value?.data.results.options.notifications
  }
)

const { mutate: appSettingsMutation } = useMutation({
  mutationFn: (params: AppSettingParams) => setAppSettings(params)
})

const { open, close } = useModal({
  component: ChangePasswordModal,
  attrs: {
    onCancel() {
      close()
    }
  }
})
</script>

<template>
  <div class="w-full pb-2 paper md:card h-fit">
    <div class="space-y-4">
      <h2 class="text-h4 font-demi-bold text-text-500">تنظیمات</h2>
      <div class="w-full space-y-6">
        <div class="flex flex-col gap-4">
          <h4 class="w-full text-st-one font-demi-bold text-secondary-500">عمومی</h4>
	        <!-- not shipping this feature in this version -->
          <!-- <div class="flex flex-row items-center justify-between w-full">
            <span class="text-st-two text-text-500 font-demi-bold"
              >زبان اپلیکیشن</span
            >
            <span>فارسی</span>
          </div> -->
          <div class="flex flex-row items-center justify-between w-full">
            <span class="text-st-two text-text-500 font-demi-bold">اعلان ها</span>
            <span>
              <Switch
                @update:enabled="() => console.log('something here')"
                v-model="notificationEnabled"
              />
            </span>
          </div>
        </div>
        <LineDivider />
        <div class="flex flex-col gap-4">
          <h4 class="w-full text-st-one font-demi-bold text-secondary-500">
            حریم خصوصی
          </h4>
          <span
            @click="open"
            class="cursor-pointer text-st-two text-text-500 font-demi-bold"
          >
            تنظیمات رمز عبور
          </span>
          <div class="flex flex-col gap-0.5">
            <span class="text-st-two text-text-500 font-demi-bold">
              حذف حساب کاربری
            </span>
            <span class="text-text-300">
              حساب کاربری و تمام محتوای خود را برای همیشه حذف کنید.
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-0.5">
              <span class="text-st-two text-text-500 font-demi-bold">
                نمایش نمره آزمون برای دیگران
              </span>
              <span class="text-text-300">
                با فعال بودن این گزینه نمره آزمون شما برای تمام کاربران نشان داده
                میشود.
              </span>
            </div>
            <Switch />
          </div>
        </div>
        <LineDivider />
        <div class="flex flex-col gap-4">
          <h4 class="w-full text-st-one font-demi-bold text-secondary-500">
            کمک و راهنمایی
          </h4>
          <div class="flex flex-col space-y-4">
            <a
              class="flex items-center justify-between"
              href="https://go2train.co/about-us/"
            >
              <span>درباره ما</span>
              <ArrowLeft class="text-[16px]" />
            </a>
            <a
              class="flex items-center justify-between"
              href="https://go2train.co/faq/"
            >
              <span>سوالات متداول</span>
              <ArrowLeft class="text-[16px]" />
            </a>
            <a
              class="flex items-center justify-between"
              href="https://go2train.co/privacypolicy/"
            >
              <span>سیاست حفظ حریم خصوصی</span>
              <ArrowLeft class="text-[16px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
