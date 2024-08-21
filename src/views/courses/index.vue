<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@tanstack/vue-form'

import { CountriesListbox } from '@/components'
import { CourseSwiper } from '@/views/courses/components'
import { useGetCourseFilterLanguages, useGetLanguageList } from '@/queries'

const { data: langs, isLoading: langsLoading } = useGetLanguageList()
const { data: vLangs, isLoading: vLangsLoading } = useGetCourseFilterLanguages()

const router = useRouter()
const languageList = computed(() => langs.value?.data.results)
const videoLanguageList = computed(() => vLangs.value?.data.results[0].to_languages)

const form = useForm({
  defaultValues: {
    languageId: undefined,
    videoLanguageId: undefined
  }
})

const langId = computed(() => form.state.values.languageId)

watch(
  () => languageList,
  () => {
    if (languageList.value) {
      // form.setFieldValue('languageId', languageList.value[0])
      form.setFieldValue('languageId', languageList.value[0].fa_name)
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div>
    {{ langId }}
    <form class="flex flex-row gap-4 my-10 lg:ps-40 lg:pe-4">
      <form.Field name="languageId">
        <template v-slot="{ field, state }">
          <div class="w-full">
            <CountriesListbox
              :state="state"
              v-if="languageList"
              optionLabel="fa_name"
              :isLoading="langsLoading"
              :options="languageList"
              :placeholder="languageList[0].fa_name"
              @modelValue="(item) => field.handleChange(item)"
            />
          </div>
        </template>
      </form.Field>
      <form.Field name="videoLanguageId">
        <template v-slot="{ field, state }">
          <di class="w-full">
            <CountriesListbox
              v-if="vLangs"
              :state="state"
              optionLabel="fa_name"
              :isLoading="vLangsLoading"
              :options="videoLanguageList"
              @modelValue="
                (item) => {
                  field.handleChange(item)
                  router.push({ query: { videoLanguageId: item.id } })
                }
              "
            />
          </di>
        </template>
      </form.Field>
    </form>
    <div class="space-y-10" v-if="languageList && !langsLoading">
      <CourseSwiper
        v-bind="language"
        :key="language.id"
        v-for="language in languageList"
      />
    </div>
  </div>
</template>
