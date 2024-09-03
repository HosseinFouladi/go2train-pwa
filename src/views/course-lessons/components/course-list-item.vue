<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { TickCircle } from '@/components/icons'
import type { CourseSection } from '@/queries/course-sections/types'

const router = useRouter()

const props = defineProps<CourseSection>()
</script>

<template>
  <div
    @click="
      () =>
        router.push({
          path: $route.path,
          query: { section_id: props.id }
        })
    "
    class="flex flex-row w-full h-16 gap-3 px-4 py-5 cursor-pointer shadow_list-item rounded-2xl"
  >
    <span class="font-demi-bold text-secondary-900 text-st-one">
      {{ String(props.title).toPersianDigits() }}
    </span>
    <span
      v-if="props.examPassed"
      class="flex px-2 py-0.5 gap-1 items-center justify-center bg-success-50 rounded-full"
    >
      <span class="flex items-center justify-center">
        <TickCircle class="text-[14px] text-success-800" />
      </span>
      <span class="text-cp text-success-800">قبول شده</span>
    </span>
    <p
      v-if="props.examMark"
      class="underline underline-offset-4 decoration-2 decoration-success-500 text-success-800"
    >
      نمره: {{ String(props.examMark).toPersianDigits() }}
    </p>
  </div>
</template>

<style scoped>
.shadow_list-item {
  box-shadow: 0px 0px 12px 0px rgba(34, 35, 40, 0.15);
}
</style>
