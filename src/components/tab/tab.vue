<script lang="ts" setup>
import { ref } from 'vue'
import { cn } from '@/utils'
import type { TabProps } from './tab.types'

const props = defineProps<TabProps>()
const selectedTab = ref(props.tabs[0].title)
</script>

<template>
  <div class="mb-8">
    <ul
      class="flex flex-row flex-wrap -mb-px text-center text-st-one font-demi-bold"
    >
      <li
        :key="tab.title"
        v-for="tab in props.tabs"
        class="inline-flex flex-1 me-2 text-secondary-400"
      >
        <button
          :class="
            cn(
              'inline-block text-danger-500 w-full p-4 rounded-t-lg text-st-one',
              'hover:text-secondary-400 hover:border-b-2 hover:border-secondary-400',
              {
                'hover:text-secondary-800 text-neutral-black border-b-2 hover:border-secondary-800':
                  tab.title === selectedTab
              }
            )
          "
          @click="() => (selectedTab = tab.title)"
        >
          {{ tab.title }}
        </button>
      </li>
    </ul>
  </div>
  <div>
    <div :key="tab.title" v-for="tab in props.tabs">
      <Component v-if="selectedTab === tab.title" :is="tab.component" />
    </div>
  </div>
</template>
