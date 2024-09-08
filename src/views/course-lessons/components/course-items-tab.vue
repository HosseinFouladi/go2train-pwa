<script lang="ts" setup>
import { computed } from 'vue'
import { first } from 'lodash'
import { useRoute } from 'vue-router'
import { Button, Divider } from '@/components'
import { useCourseSectionsQuery } from '@/queries'

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
  <div data="course_tab_0" class="space-y-4">
    <div class="flex gap-3">
      <a class="w-full" :href="section?.reading.url" target="_blank">
        <Button fluid size="sm" label="جزوه" variant="outlined" />
      </a>
      <a class="w-full" :href="section?.grammar.url" target="_blank">
        <Button fluid size="sm" label="گرامر" variant="outlined" />
      </a>
      <a class="w-full" :href="section?.words.url" target="_blank">
        <Button fluid size="sm" label="واژگان" variant="outlined" />
      </a>
    </div>
    <Divider />
    <div class="grid grid-cols-2 gap-3">
      <Button
        fluid
        disabled
        size="sm"
        label="کارت واژه"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button fluid disabled size="sm" label="ویدیو کوتاه" variant="outlined" />
      <Button fluid disabled size="sm" label="کارت های شنیدنی" variant="outlined" />
      <Button fluid disabled size="sm" label="کارت های خواندنی" variant="outlined" />
      <Button fluid disabled size="sm" label="جلسه کلاسی" variant="outlined" />
      <Button fluid disabled size="sm" label="جلسه گروهی" variant="outlined" />
      <Button fluid disabled size="sm" label="آزمون" variant="outlined" />
      <Button fluid disabled size="sm" label="حرف زدن با دیلان" variant="outlined" />
    </div>
  </div>
</template>
