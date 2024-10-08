<script setup lang="ts">
import { cn } from '@/utils'
import type { InputTextProps } from '.'
import InputInfo from '@/components/input-info'
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputTextProps>(), {
  state: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  fluid: false
})

const emit = defineEmits(['modelValue'])


const text = ref(props.value || '')

const getInputTextValue = () => {
  emit('modelValue', text.value)
}

</script>

<template>
  <div
    :class="
      cn(' max-w-80 flex flex-col gap-1 text-secondary-600', {
        'max-w-full': props.fluid,
        'hover:text-secondary-700 focus:text-secondary-900': !props.disabled
      })
    "
  >
    <div class="relative">
      <div
        class="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-3"
      >
        <Component :is="props.iconLeft" />
      </div>
      <input
        :class="
          cn(
            'remove-arrow text-secondary-600 text-st-one border border-secondary-600',
            'h-[52px] w-full focus:outline-none rounded-[14px] p-3',
            {
              'border-danger-500 hover:border-danger-500 focus:border-danger-500':
                props?.state?.meta.errors.length > 0,
              'ps-8': !!props.iconRight,
              'pe-3': !!props.iconLeft,
              'hover:border-secondary-700 focus:border-secondary-900': !props.disabled
            }
          )
        "
        v-model="text"
        @input="getInputTextValue"
        :disabled="props.disabled"
        v-bind="$attrs"
      />
      <div
        v-if="props.iconRight"
        class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3"
      >
        <Component :is="props.iconRight" />
      </div>
    </div>
    <div class="min-h-8" v-if="props.state">
      <InputInfo
        :key="err || ''"
        v-for="err in props?.state?.meta.errors"
        :error="err"
      />
    </div>
  </div>
</template>

<style scoped>
.remove-arrow::-webkit-inner-spin-button,
.remove-arrow::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.remove-arrow {
  -moz-appearance: textfield;
}
</style>
