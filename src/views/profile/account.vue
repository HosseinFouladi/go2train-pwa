<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import type { CurrentPlanResponseType } from '@/queries'
import { useToast } from 'primevue/usetoast'
import { useForm } from '@tanstack/vue-form'
import { useQuery } from '@tanstack/vue-query'
import { match } from 'ts-pattern'
import { useAvatarModals } from '@/stores'
import { storeToRefs } from 'pinia'
import { useQueryClient } from '@tanstack/vue-query'

import { ProfileInfo } from './components'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type Message, type ApiResponseType } from '@/api'
import { InputText, Textarea, CountriesListbox } from '@/components'
import { useGetCountriesList, useGetUserProfileQuery } from '@/queries'
import { Button, Loading } from '@/components'
import { useUpdateProfileMutation } from '@/queries/profile/user-profile.query'

const { data: profile, isLoading: profileLoading } = useGetUserProfileQuery()
const { data: countries, isLoading: countriesLoading } = useGetCountriesList()

const queryClient=useQueryClient();

const birthCountry = ref()
const immigrationCountry = ref()
const livingCountry = ref()
const bio = ref()
const toast = useToast()

const { isEditPopupButtonDisplay } = storeToRefs(useAvatarModals())

const form = useForm({
  defaultValues: {
    mobile: '',
    email: '',
    birth_country: '',
    living_country: '',
    immigration_country: '',
    bio: '',
    name: '',
    username: ''
  }
})

const {
  data: currentPlan,
  isPending,
  isFetching
} = useQuery({
  queryKey: ['current-plan'],
  queryFn: () =>
    ApiClient.get<ApiResponseType<Array<CurrentPlanResponseType>, Message>>(
      ENDPOINTS.Profile.CurrentPlan
    )
})

const isLoadedDatas = computed(
  () =>
    !profileLoading.value &&
    profile.value?.data &&
    !isPending.value &&
    !isFetching.value &&
    currentPlan.value?.data
)
watch(
  () => profile.value?.data,
  () => {
    if (profile.value?.data.results.user) {
      for (const [key, value] of Object.entries(profile.value.data.results.user)) {
        match(key)
          .with('immigration_country', () => {
            immigrationCountry.value = value
          })
          .with('birth_country', () => {
            birthCountry.value = value
          })
          .with('living_country', () => {
            livingCountry.value = value
          })
          .with('bio', () => {
            bio.value = value
          })
          .otherwise(() => {
            form.setFieldValue(key as keyof typeof form.state.values, value)
          })
      }
    }
  }
)

const { mutate: updateUserProfile } = useUpdateProfileMutation({
  onSuccess: (data) => {
    toast.add({
      summary: 'ویرایش پروفایل کاربر',
      detail: data.message[0].content,
      severity: 'success',
      life: 3000
    })
    queryClient.invalidateQueries({queryKey:['user_profile']})
  },
  onError: (error) => {
    toast.add({
      summary: 'خطادرویرایش پروفایل',
      detail: error.message,
      severity: 'info',
      life: 3000
    })
  }
})

const editProfile = () => {
  updateUserProfile({
    ...form.state.values,
    living_country: livingCountry.value?.id,
    birth_country: birthCountry.value?.id,
    immigration_country: immigrationCountry.value?.id,
    bio: bio.value,
    avatar:undefined,
    avatar_id:undefined
  })
}
const cancelEdit = () => {
  for (const [key, value] of Object.entries(profile.value.data.results.user)) {
    match(key)
      .with('immigration_country', () => {
        immigrationCountry.value = value
      })
      .with('birth_country', () => {
        birthCountry.value = value
      })
      .with('living_country', () => {
        livingCountry.value = value
      })
      .with('bio', () => {
        bio.value = value
      })
      .otherwise(() => {
        form.setFieldValue(key as keyof typeof form.state.values, value)
      })
  }
  useAvatarModals().disableEditButtonDisplay()
}
</script>

<template>
  <section class="flex flex-col w-full gap-6 paper md:card">
    <ProfileInfo
      v-if="isLoadedDatas"
      :avatar="profile?.data.results.user.avatar"
      :name="profile?.data.results.user.name"
      :username="profile?.data.results.user.username"
      :badge="currentPlan?.data.results[0].icon"
    />
    <form
      v-if="isLoadedDatas"
      @submit="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }
      "
    >
      <div class="items-center justify-between block gap-4 md:flex">
        <form.Field name="name">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full">
              <InputLabel name="name" text="نام و نام خانوادگی " />
              <InputText
                name="name"
                :fluid="true"
                :state="state"
                @blur="field.handleBlur"
                :disabled="!isEditPopupButtonDisplay"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
              />
            </InputWrapper>
          </template>
        </form.Field>
        <form.Field name="username">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full">
              <InputLabel name="username" text="نام کاربری" />
              <InputText
                name="username"
                :fluid="true"
                :state="state"
                @blur="field.handleBlur"
                :disabled="!isEditPopupButtonDisplay"
                :value="field.state.value"
                @input="(e) => field.handleChange(e.target.value)"
              />
            </InputWrapper>
          </template>
        </form.Field>
      </div>
      <div class="items-center justify-between block gap-4 md:flex">
        <form.Field name="mobile">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full">
              <InputLabel name="mobile" text="شماره تلفن" />
              <InputText
                name="mobile"
                :fluid="true"
                :state="state"
                @blur="field.handleBlur"
                :disabled="true"
                :value="field.state.value"
                class="cursor-not-allowed"
              />
            </InputWrapper>
          </template>
        </form.Field>
        <form.Field name="email">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full">
              <InputLabel name="email" text="ایمیل" />
              <InputText
                name="email"
                :fluid="true"
                :state="state"
                @blur="field.handleBlur"
                :value="field.state.value"
                :disabled="true"
                class="cursor-not-allowed"
              />
            </InputWrapper>
          </template>
        </form.Field>
      </div>
      <div class="items-center justify-between block gap-4 md:flex">
        <form.Field name="birth_country">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full mb-8">
              <InputLabel name="birth_country" text="محل تولد" />
              <CountriesListbox
                v-if="countries"
                @modelValue="(item) => birthCountry=item"
                :isLoading="countriesLoading"
                :options="countries.data.results"
                :state="state"
                optionLabel="fa_name"
                optionIcon="flag"
                :disabled="!isEditPopupButtonDisplay"
                :value="birthCountry"
              />
            </InputWrapper>
          </template>
        </form.Field>
        <form.Field name="living_country">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full mb-8">
              <InputLabel name="living_country" text="محل زندگی" />
              <CountriesListbox
                v-if="countries"
                @modelValue="(item) => livingCountry=item"
                :isLoading="countriesLoading"
                :options="countries.data.results"
                :state="state"
                optionLabel="fa_name"
                :disabled="!isEditPopupButtonDisplay"
                optionIcon="flag"
                :value="livingCountry"
              />
            </InputWrapper>
          </template>
        </form.Field>
      </div>
      <div class="items-center justify-between block gap-4 mb-8 md:flex">
        <form.Field name="immigration_country">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full">
              <InputLabel name="immigration_country" text="کشور مقصد" />
              <CountriesListbox
                v-if="countries"
                :isLoading="countriesLoading"
                :options="countries.data.results"
                :state="state"
                optionLabel="fa_name"
                :disabled="!isEditPopupButtonDisplay"
                optionIcon="flag"
                :value="immigrationCountry"
                @modelValue="(item) => immigrationCountry=item"
              />
            </InputWrapper>
          </template>
        </form.Field>
        <div class="w-full"></div>
      </div>
      <div class="items-center justify-between block gap-4 md:flex">
        <form.Field name="bio">
          <template v-slot="{ field, state }">
            <InputWrapper class="w-full">
              <InputLabel name="bio" text="بیوگرافی" />
              <Textarea
                :fluid="true"
                :state="state"
                @blur="field.handleBlur"
                :disabled="!isEditPopupButtonDisplay"
                @input="(e) => field.handleChange(e.target.value)"
                :value="bio"
                :name="field.name"
                @model-value="(item) => bio=item"
              />
            </InputWrapper>
          </template>
        </form.Field>
      </div>
      <div v-if="isEditPopupButtonDisplay" class="flex items-center justify-end gap-3 mt-8">
        <Button label="انصراف" variant="outlined" @click="cancelEdit" />
        <Button label="ثبت تغییرات" @click="editProfile" />
      </div>
    </form>
    <div v-else class="flex items-center justify-center h-full">
      <Loading />
    </div>
  </section>
</template>
