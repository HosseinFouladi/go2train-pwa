<script lang="ts" setup>
import { Switch } from '@headlessui/vue'

const enabled = defineModel()

</script>

<template>
  <Switch dir="ltr" v-model="enabled" :class="enabled ? 'bg-primary-500' : 'bg-secondary-500'"
    class="relative duration-200 transition-all hover:h-[calc-size(auto)] inline-flex items-center h-8 rounded-full w-[52px]">
    <span :class="enabled ? 'translate-x-6' : 'translate-x-1.5'"
      class="inline-block w-5 h-5 transition transform rounded-full bg-neutral-white" />
  </Switch>
</template>
