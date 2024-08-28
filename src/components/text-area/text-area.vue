<script setup lang="ts">
import { ref, defineEmits } from 'vue'

import type { TextAreaProps } from './text-area'

import { cn } from '@/utils'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<TextAreaProps>(), {
  placeHolder: 'راجع به مشکلی که برایتان پیش آمده‌ است توضیح دهید...',
  fluid: true,
  rows: 5
})
const emit = defineEmits(['modelValue'])

const text = ref(props.value || '')

const getTextAreaValue = () => {
  emit('modelValue', text.value)
}
</script>

<template>
  <div>
    <textarea
      @input="getTextAreaValue"
      :placeholder="placeHolder"
      :rows="rows"
      v-model="text"
      class="p-4 overflow-hidden border text-secondary-600 focus:outline-none rounded-2xl border-secondary-500 text-st-two"
      :class="
        cn({
          'w-full': fluid,
          'w-fit': !fluid,
          'hover:text-secondary-700 focus:text-secondary-900': !props.disabled,
          'pointer-events-none': props.disabled
        })
      "
      v-bind="$attrs"
      
    />
  </div>
</template>
