<script lang="ts" setup>
import { computed } from 'vue'
import type { CurrentPlanResponseType } from '@/queries'

import { ProfileInfo } from './components'
import { useQuery } from '@tanstack/vue-query'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type Message, type ApiResponseType } from '@/api'
import { ref, watch } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { InputText, Textarea, CountriesListbox } from '@/components'
import { useGetCountriesList, useGetUserProfileQuery } from '@/queries'

const { data: profile, isLoading: profileLoading } = useGetUserProfileQuery()
const { data: countries, isLoading: countriesLoading } = useGetCountriesList()

const birthCountry = ref()

const form = useForm({
  defaultValues: {
    mobile: '',
    email: '',
    birth_country: '',
    living_country: '',
    immigration_country: '',
    bio: ''
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
        form.setFieldValue(key as keyof typeof form.state.values, value)
      }
    }
  }
)
</script>

<template>
  <section class="w-full paper md:card">
    <ProfileInfo
      v-if="isLoadedDatas"
      :avatar="profile?.data.results.user.avatar"
      :name="profile?.data.results.user.name"
      :username="profile?.data.results.user.username"
      :badge="currentPlan?.data.results[0].icon"
    />
    <form
      @submit="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }
      "
    >
      <form.Field name="mobile">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="mobile" text="شماره تلفن" />
            <InputText
              name="mobile"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="email">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="email" text="ایمیل" />
            <InputText
              name="email"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="birth_country">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="birth_country" text="محل تولد" />
            <InputText
              name="birth_country"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="living_country">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="living_country" text="محل زندگی" />
            <InputText
              name="living_country"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="immigration_country">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="immigration_country" text="کشور مقصد" />
            <InputText
              name="immigration_country"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="bio">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="bio" text="بیوگرافی" />
            <Textarea
              name="bio"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </InputWrapper>
        </template>
      </form.Field>

      <form.Field name="birth_country">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="birth_country" text="محل تولد" />
            <CountriesListbox
              v-if="countries"
              @modelValue="(item) => field.handleChange(item)"
              :isLoading="countriesLoading"
              :options="countries.data.results"
              :state="state"
              optionLabel="fa_name"
              optionIcon="flag"
              :value="birthCountry"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="living_country">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="living_country" text="محل زندگی" />
            <CountriesListbox
              v-if="countries"
              @modelValue="
                (item) => {
                  field.handleChange(item)
                  console.log(item)
                }
              "
              :isLoading="countriesLoading"
              :options="countries.data.results"
              :state="state"
              optionLabel="fa_name"
              optionIcon="flag"
              :value="field.state.value"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="immigration_country">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="immigration_country" text="کشور مقصد" />
            <CountriesListbox
              v-if="countries"
              :isLoading="countriesLoading"
              :options="countries.data.results"
              :state="state"
              optionLabel="fa_name"
              optionIcon="flag"
              :value="field.state.value"
              @modelValue="(item) => field.handleChange(item)"
            />
          </InputWrapper>
        </template>
      </form.Field>
    </form>
  </section>
</template>
