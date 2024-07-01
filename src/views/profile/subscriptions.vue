<script lang="ts" setup>
import { PlanCard } from './components'
import { CrownIcon } from '@/components/icons'

const subscription_plans: Array<{
  title: string
  type: 'silver' | 'bronze' | 'gold'
  price: number
}> = [
  { title: 'اشتراک طلایی', type: 'gold', price: 199000 },
  { title: 'اشتراک نقره ای', type: 'silver', price: 399000 },
  { title: 'اشتراک برنزی', type: 'bronze', price: 999000 }
]
</script>

<template>
  <div class="space-y-6">
    <div class="w-full p-6 card rounded-2xl bg-neutral-white h-fit">
      this is heading
    </div>
    <div class="w-full p-6 rounded-2xl card h-fit bg-neutral-white">
      <section class="space-y-4">
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <CrownIcon class="text-[40px]" />
            <h2 class="text-h4 font-demi-bold">ارتقاء حساب کاربری</h2>
          </div>
          <p class="text-st-one">
            با ارتقای حساب کاربری به اشتراک ویژه، دسترسی نامحدود به تمامی دوره‌ها و
            منابع آموزشی، محتوای انحصاری، و ابزارهای پیشرفته را خواهید داشت!
          </p>
        </div>
        <div class="flex flex-row w-full gap-4 rtl:flex-row-reverse">
          <PlanCard
            v-bind="plan"
            :key="plan.title"
            v-for="plan of subscription_plans"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0px 0px 12px 0px rgba(34, 35, 40, 0.15);
}
</style>
