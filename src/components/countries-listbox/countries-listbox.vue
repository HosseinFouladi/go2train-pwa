<script lang="ts" setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { cn } from '@/utils'
import type { CountriesListboxProps } from './countries-listbox.types'
import { ArrowLeft } from '../icons';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
  { id: 6, name: 'Durward Reynolds', unavailable: false },
  { id: 7, name: 'Kenton Towne', unavailable: false },
  { id: 8, name: 'Therese Wunsch', unavailable: false },
  { id: 9, name: 'Benedict Kessler', unavailable: true },
  { id: 10, name: 'Katelyn Rohan', unavailable: false }
]
const selectedPerson = ref(people[0])

const props = defineProps<CountriesListboxProps>()
</script>

<template>
  <Listbox v-model="selectedPerson">
    <div class="relative mt-1">
      <ListboxButton
        :class="
          cn(
            'relative gap-1 max-w-80 text-secondary-600 hover:text-secondary-700 focus:text-secondary-900',
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
        <span class="block truncate">{{ selectedPerson.name }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 -rotate-90 pointer-events-none"
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
            class="absolute z-50 w-full py-1 pl-4 mt-1 overflow-x-hidden overflow-y-scroll text-base border rounded-xl border-secondary-500 bg-neutral-white max-h-60 sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in people"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-danger-100 text-danger-900' : 'text-secondary-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span
                  :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                  >{{ person.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-600"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
