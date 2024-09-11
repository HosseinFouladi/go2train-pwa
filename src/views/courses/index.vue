<script lang="ts" setup>
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'
import Skeleton from 'primevue/skeleton'
import { useForm } from '@tanstack/vue-form'

import { CountriesListbox } from '@/components'
import { CourseSwiper } from '@/views/courses/components'
import { useGetCourseFilterLanguages, useGetLanguageList } from '@/queries'

const router = useRouter()

const { data: langs, isLoading: langsLoading } = useGetLanguageList()
const { data: vLangs, isLoading: vLangsLoading } = useGetCourseFilterLanguages()

const languageList = computed(() => langs.value?.data.results)
const videoLanguageList = computed(() => vLangs.value?.data.results)

const form = useForm({
  defaultValues: {
    languageId: undefined,
    videoLanguageId: undefined
  }
})
</script>

<template>
  <div>
    <form class="flex flex-row gap-4 my-10 lg:ps-40 lg:pe-4">
      <form.Field name="languageId">
        <template v-slot="{ field, state }">
          <div class="w-1/5">
            <Skeleton
              v-if="langsLoading || !languageList"
              height="52px"
              class="w-1/5 rounded-3xl"
            />
            <CountriesListbox
              v-else
              :state="state"
              optionIcon="image"
              optionLabel="fa_name"
              :options="languageList"
              :isLoading="langsLoading"
              :placeholder="languageList[0].fa_name"
              :iconRight="h('span', { class: 'text-text-500' }, ['آموزش'])"
              @modelValue="
                (item) => {
                  field.handleChange(item)
                  if (item.id === 0) {
                    router.replace({ ...$route.query, languageId: undefined })
                    return
                  }
                  router.replace({
                    query: {
                      ...$route.query,
                      languageId: item.id
                    }
                  })
                }
              "
            />
          </div>
        </template>
      </form.Field>
      <form.Field name="videoLanguageId">
        <template v-slot="{ field, state }">
          <di class="w-1/5">
            <Skeleton
              v-if="langsLoading || !languageList"
              height="52px"
              class="w-1/5 rounded-3xl"
            />
            <CountriesListbox
              v-else
              :state="state"
              optionIcon="image"
              optionLabel="fa_name"
              :isLoading="vLangsLoading"
              :options="videoLanguageList"
              :iconRight="h('span', { class: 'text-text-500' }, ['به'])"
              @modelValue="
                (item) => {
                  field.handleChange(item)
                  if (item.id === 0) {
                    router.replace({ ...$route.query, videoLanguageId: undefined })
                    return
                  }
                  router.push({
                    query: {
                      ...$route.query,
                      videoLanguageId: item.id
                    }
                  })
                }
              "
            />
          </di>
        </template>
      </form.Field>
    </form>
    <div class="space-y-10">
      <CourseSwiper
        :isLangsLoading="langsLoading"
        v-show="
          Number($route.query.languageId)
            ? language.id === Number($route.query.languageId)
            : language.id
        "
        v-bind="language"
        :key="language.id"
        v-for="language in languageList"
      />
    </div>
  </div>
</template>

<style >
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
</style>
