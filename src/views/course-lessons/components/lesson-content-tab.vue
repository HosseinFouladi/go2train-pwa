<script lang="ts" setup>
import { useCourseSectionsQuery } from '@/queries'
import { first } from 'lodash'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: courseSections } = useCourseSectionsQuery(
  String(route.params.courseId)
)

const section = computed(() => {
  return first(
    courseSections.value?.data.filter((item) => item.id == route.query.section_id)
  )
})
</script>

<template>
  <p class="leading-loose text-text-500 text-st-two">
    {{ section?.description }}
  </p>
</template>
