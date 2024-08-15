<template>
  <div>
    <div class="flex flex-col gap-4">
      <h5 class="text-h5 font-demi-bold">رتبه بندی و نظرات</h5>
      <div class="flex items-center justify-between gap-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-sm-h1 text-primary-500 font-extra-bold">۴.۸</h1>
          <StarRating
            :rtl="true"
            v-model:rating="value"
            :increment="0.01"
            :show-rating="false"
            :star-size="25"
            active-color="#FF9900"
          ></StarRating>

          <span class="text-sm-st-two font-regular text-text-300">۲۴ دیدگاه</span>
        </div>
        <div class="flex flex-col w-full">
          <div
            v-for="item in 5"
            class="flex items-center gap-3 py-[6px] progress-cotainer"
          >
            <span>5</span>
            <ProgressBar class="min-w-[200px] w-full" :value="50"> </ProgressBar>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary-50"
      >
        <div class="flex gap-2 md:gap-4 xl:gap-8">
          <EmptyStarIcon
            v-for="item in filledStars"
            :key="item"
            class="text-secondary-900"
          />
        </div>

        <Button
          :fluid="false"
          label="دیدگاه خود را وارد  کنید"
          variant="outlined"
          class="comment-button"
          size="sm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon, EmptyStarIcon } from '@/components/icons'
import ProgressBar from 'primevue/progressbar'
import { Button } from '@/components'
import { computed, ref } from 'vue'
import StarRating from 'vue-star-rating'

const value = ref(4.7)

const filledStars = computed(() => Math.floor(value.value))
const halfStar = computed(() => value.value % 1)

console.log(filledStars.value, halfStar.value)
</script>

<style>
.p-progressbar-value {
  background: #ff9900 !important;
}

.p-progressbar {
  height: 6px !important;

  .p-progressbar-label {
    display: none !important;
  }
}

.comment-button {
  padding-left: 0.35rem !important;
  padding-right: 0.35rem !important;
}
</style>
