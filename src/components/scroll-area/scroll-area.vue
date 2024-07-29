<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from 'radix-vue'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
</script>

<template>
  <ScrollAreaRoot
    class="w-[200px] h-[225px] rounded overflow-hidden shadow-[0_2px_10px] shadow-secondary-400 bg-neutral-white"
    style="--scrollbar-size: 10px"
  >
    <ScrollAreaViewport class="w-full h-full rounded">
      <div class="py-[15px] px-5">
        <div class="text-secondary-900 text-[15px] leading-[18px] font-demi-bold">Tags</div>
        <div
          v-for="tag in tags"
          :key="tag"
          class="text-neutral-black text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-secondary-500"
        >
          {{ tag }}
        </div>
      </div>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      class="flex select-none m-1 rounded-full touch-none p-0.5 bg-secondary-900 transition-colors duration-[160ms] ease-out hover:bg-secondary-800 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollAreaThumb
        class="flex-1 bg-primary-800 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-secondary-600 transition-colors duration-[160ms] ease-out hover:bg-secondary-800 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <ScrollAreaThumb
        class="flex-1 bg-primary-800 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
