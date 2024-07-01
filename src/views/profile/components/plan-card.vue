<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/utils'
import { CheckMark } from '.'

import CoinGold from '@/assets/images/coin-gold.png'
import CoinSilver from '@/assets/images/coin-silver.png'
import CoinBronze from '@/assets/images/coin-bronze.png'

type SubscriptionType = 'silver' | 'bronze' | 'gold'

const props = defineProps<{ title: string; type: SubscriptionType; price: number }>()

const features_list = ref([
  {
    title: 'تعداد چت نامحدود با کاربران'
  },
  {
    title: 'دسترسی به تمام منابع آموزشی پلتفروم'
  },
  {
    title: 'آواتارهای مخصوص برای کاربران ویژه'
  },
  {
    title: 'ارائه نقشه راه برای دوره‌ها'
  },
  {
    title: 'دسترسی به تمام کیفیت ویدئوها'
  }
])

const bg_map: Record<SubscriptionType, { bg: string; icon: string }> = {
  bronze: { bg: 'bg-bronze', icon: CoinBronze },
  silver: { bg: 'bg-silver', icon: CoinSilver },
  gold: { bg: 'bg-gold', icon: CoinGold }
}

const button_theme = {
  bronze: 'bg-[#D57155]',
  silver: 'bg-[#777777]',
  gold: 'bg-[#DF9531]'
}
</script>

<template>
  <div class="w-full duration-300 group hover:scale-[1.05]">
    <div
      :class="
        cn(
          bg_map[props.type].bg,
          'relative w-full p-4 mt-12 h-fit space-y-3 rounded-3xl group-hover:shadow-md duration-300'
        )
      "
    >
      <div class="w-full h-12">
        <img
          class="absolute top-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2"
          :src="bg_map[props.type].icon"
        />
      </div>
      <div class="space-y-2">
        <h2 class="text-center text-h5 font-extra-bold">{{ props.title }}</h2>
        <div class="flex flex-row justify-center gap-1">
          <div class="flex gap-1 text-st-one font-demi-bold">
            <span>{{ String(props.price).toPersianDigits() }}</span>
            <span>تومان</span>
          </div>
          <span class="text-st-one font-demi-bold">/</span>
          <span class="text-st-two">ماهانه</span>
        </div>
      </div>
      <ul class="space-y-2">
        <li
          class="flex items-center gap-1.5"
          :key="feature.title"
          v-for="feature of features_list"
        >
          <span>
            <CheckMark />
          </span>
          <span class="text-cp">{{ feature.title }}</span>
        </li>
      </ul>
      <button
        :class="[
          button_theme[props.type],
          'w-full rounded-xl py-3 text-neutral-white text-sm-st-one font-demi-bold',
          `duration-200 hover:brightness-[106%]`
        ]"
      >
        خرید اشتراک
      </button>
    </div>
  </div>
</template>

<style>
.bg-bronze {
  background: linear-gradient(
    206.6deg,
    rgba(213, 113, 85, 0.25) 2.35%,
    rgba(213, 113, 85, 0.5) 99.3%
  );
}

.bg-silver {
  background: linear-gradient(
    206.6deg,
    rgba(119, 119, 119, 0.25) 2.35%,
    rgba(119, 119, 119, 0.5) 99.3%
  );
}

.bg-gold {
  background: linear-gradient(
    206.6deg,
    rgba(223, 149, 49, 0.25) 2.35%,
    rgba(223, 149, 49, 0.5) 99.3%
  );
}
</style>
