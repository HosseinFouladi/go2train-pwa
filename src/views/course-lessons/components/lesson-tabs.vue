<script lang="ts" setup>
import Tab from 'primevue/tab'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import CourseItemsTab from './course-items-tab.vue'
import LessonContentTab from './lesson-content-tab.vue'
</script>

<template>
  <Tabs value="0">
    <TabList>
      <Tab
        unstyled
        value="0"
        class="px-6 py-3 mx-2 text-text-500 data-[p-active=true]:border-b-2 border-b-text-400 data-[p-active=true]:font-demi-bold text-st-one"
        >آیتم های دوره</Tab
      >
      <Tab
        unstyled
        value="1"
        class="px-6 py-3 mx-2 text-text-500 data-[p-active=true]:border-b-2 border-b-text-400 data-[p-active=true]:font-demi-bold text-st-one"
        >محتوای درس</Tab
      >
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <CourseItemsTab />
      </TabPanel>
      <TabPanel value="1">
        <LessonContentTab />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
