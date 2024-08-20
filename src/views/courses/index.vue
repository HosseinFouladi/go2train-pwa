<script lang="ts" setup>
import { computed } from 'vue'
import { useGetLanguageList } from '@/queries'
import { CourseSwiper } from '@/views/courses/components'

const { data, isLoading } = useGetLanguageList()
const languageList = computed(() => data.value?.data.results)
</script>

<template>
  <div class="space-y-10" v-if="languageList && !isLoading">
    <CourseSwiper
      v-bind="language"
      :key="language.id"
      v-for="language in languageList"
    />
  </div>
</template>
