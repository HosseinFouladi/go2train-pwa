<template>
  <div>
    <textarea
      @input="getTextAreaValue"
      :placeholder="placeHolder"
      :rows="rows"
      v-model="text"
      class="p-4 border-2 rounded-2xl border-secondary-500 text-st-two"
      :class="
      cn({
        'w-full': fluid,
        'w-fit': !fluid
      })
    "
    ></textarea>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'

import type { TextAreaProps } from './textArea'

import { cn } from '@/utils'

defineOptions({
  inheritAttrs: false
})

const { placeHolder, fluid, rows } = withDefaults(
  defineProps<TextAreaProps>(),
  {
    placeHolder: 'راجع به مشکلی که برایتان پیش آمده‌ است توضیح دهید...',
    fluid: true,
    rows: 5,
  }
)
const emit = defineEmits(['modelValue'])

const text = ref('')

const getTextAreaValue = () => {
  emit('modelValue', text.value)
}
</script>
