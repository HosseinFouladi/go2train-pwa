<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { cn } from '@/utils'
import type { CountriesListboxProps } from './countries-listbox.types'
import { ArrowLeft } from '../icons'
import {
  ScrollAreaRoot,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollAreaScrollbar
} from 'radix-vue'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<CountriesListboxProps>(), {
  optionLabel: 'name',
  optionIcon: 'icon'
})



const selectedItem = ref(props.value||{})
//const selectedItem=computed(()=>props.value||{})

const emit = defineEmits(['modelValue'])

const getDropdownValue = () => {
  emit('modelValue', selectedItem.value)
}
</script>

<template>
  <Listbox v-model="selectedItem" @update:modelValue="getDropdownValue" :disabled="disabled">
    <div class="relative">
      <ListboxButton
        :class="
          cn(
            'relative w-full gap-1 text-secondary-600 hover:text-secondary-700 focus:text-secondary-900',
            'text-secondary-600 text-st-one hover:text-secondary-700 focus:text-secondary-900',
            'border border-secondary-600 hover:border-secondary-700 focus:border-secondary-900',
            'h-[52px] text-secondary-900 w-full focus:outline-none rounded-[14px] p-3',
            {
              'border-danger-500 hover:border-danger-500 focus:border-danger-500':
                props.state.meta.errors.length > 0,
              'ps-8': !!props.iconRight,
              'pe-3': !!props.iconLeft
            }
          )
        "
      >
        <span class="flex w-full truncate">{{ selectedItem[optionLabel] }}</span>
        <span
          class="absolute top-0 left-0 flex items-center h-full px-2 -rotate-90 pointer-events-none"
        >
          <ArrowLeft aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-50 w-full mt-2 overflow-x-hidden text-base border will-change-auto rounded-xl border-secondary-500 bg-neutral-white max-h-60 sm:text-sm"
        >
          <div v-if="isLoading" class="flex items-center justify-center w-full">
            <Loading />
          </div>
          <ScrollAreaRoot
            v-else
            dir="rtl"
            class="w-full overflow-hidden mt-1 rounded h-[200px] bg-neutral-white"
            style="--scrollbar-size: 5px"
          >
            <ScrollAreaViewport class="w-full h-full rounded">
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="option in options"
                :key="option.id"
                :value="option"
                as="template"
              >
                <li
                  :class="
                    cn(
                      active
                        ? 'bg-secondary-50 text-secondary-900'
                        : 'text-secondary-900',
                      'relative cursor-default select-none py-2 pr-4 ml-4'
                    )
                  "
                >
                  <div
                    :class="
                      cn(
                        'flex flex-row truncate gap-2 py-1',
                        selected ? 'font-demi-bold' : 'font-regular'
                      )
                    "
                  >
                    <span class="flex items-center justify-center">
                      <img class="w-4 h-4 rounded-full" :src="option[optionIcon]" />
                    </span>
                    <span>{{ option[optionLabel] }}</span>
                  </div>
                </li>
              </ListboxOption>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar
              class="flex select-none m-1 rounded-full touch-none p-0.5 bg-secondary-50 transition-colors duration-[160ms] ease-out hover:bg-secondary-100 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollAreaThumb
                class="flex-1 bg-secondary-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
              />
            </ScrollAreaScrollbar>
          </ScrollAreaRoot>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
