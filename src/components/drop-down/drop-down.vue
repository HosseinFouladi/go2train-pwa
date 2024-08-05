<script setup lang="ts">
import { ref, defineEmits } from 'vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'

import type { DropdownProps } from './drop-down'
import ArrowDownIcon from '@/components/icons/arrow-down/index.vue'
import ArrowUpIcon from '@/components/icons/arrow-up/index.vue'
import Loading from '@/components/loading/index'
import { cn } from '@/utils'

defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<DropdownProps>(), {
  placeHolder: 'لطفا دسته بندی مرتبط را پیدا کنید',
  fluid: true,
  isLoading: false
})
const emit = defineEmits(['modelValue'])
const selectedItem = ref()
const isUp = ref(false)

const getDropDownValue = () => {
  emit('modelValue', selectedItem.value)
}
</script>

<template>
  <div
    :class="
      cn({
        'w-full': fluid,
        'w-fit': !fluid
      })
    "
    class="relative p-4 border rounded-2xl border-secondary-500"
  >
    <Listbox v-model="selectedItem" @update:modelValue="getDropDownValue">
      <ListboxButton
        class="flex flex-row justify-between w-full gap-4 text-st-two"
        @click="isUp = !isUp"
      >
        <div class="flex gap-2 d-flex-row">
          <component v-if="iconRight" :is="iconRight"></component>
          <span v-if="!!selectedItem">{{ selectedItem.name }}</span>
          <span v-else class="text-secondary-600">{{ placeHolder }} </span>
        </div>
        <component
          class="text-secondary-600"
          v-if="isUp"
          :is="ArrowUpIcon"
        ></component>
        <component class="text-secondary-600" v-else :is="ArrowDownIcon"></component>
      </ListboxButton>
      <ListboxOptions class="w-full">
        <div class="h-[2px] my-4 w-full bg-secondary-100" />
        <div v-if="isLoading" class="flex items-center justify-center w-full">
          <Loading />
        </div>
        <ListboxOption
          v-else
          v-for="data in options"
          :key="data.id"
          :value="data"
          :disabled="data.unavailable"
          class="flex justify-between p-4 rounded-lg cursor-pointer text-st-two hover:bg-primary-50 hover:opacity-95 active:bg-primary-100"
          :class="
            cn({
              'bg-secondary-50': data.unavailable
            })
          "
        >
          <div class="flex gap-2">
            <component v-if="optionIconRight" :is="optionIconRight"></component>
            {{ data.name }}
          </div>
          <component v-if="optionIconLeft" :is="optionIconLeft"></component>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>

