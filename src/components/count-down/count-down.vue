<script lang="ts" setup>
import { ref } from 'vue'

const counting = ref<boolean>(true)
const startCountdown = () => {
  counting.value = true
}
const onCountdownEnd = () => {
  counting.value = false
}

const props = defineProps<{
  onClick: () => void
}>()
</script>

<template>
  <button
    class="w-full px-3 font-iransans text-st-one font-demi-bold"
    :disabled="counting"
    @click="
      () => {
        startCountdown()
        props.onClick()
      }
    "
  >
    <vue-countdown
      v-if="counting"
      :time="179 * 1000"
      @end="onCountdownEnd"
      v-slot="{ seconds, minutes }"
      ><span class="text-secondary-500">{{ minutes }}:{{ seconds }}</span>
    </vue-countdown>
    <span class="text-primary-500" v-else>ارسال مجدد کد</span>
  </button>
</template>
