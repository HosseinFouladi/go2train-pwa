<script lang="ts" setup>
import { computed } from 'vue'

import { CrownIcon } from '@/components/icons'
import { useGetCallbackPlansList } from '@/queries'
import { PlanCard, PlanStatusCard } from './components'
import { useGetCurrentPlan } from '@/queries/profile/current-plan-query'

const { data: plans } = useGetCallbackPlansList()
const { data: currentPlan, isLoading } = useGetCurrentPlan()

const plans_list = computed(() => plans.value?.data.results)
</script>

<template>
  <div class="space-y-6">
    <PlanStatusCard
      v-if="
        (currentPlan?.data.results.priority !==
          currentPlan?.data.results.prev_plan) !==
          null && !isLoading
      "
    />
    <div class="w-full p-6 rounded-2xl paper md:card h-fit bg-neutral-white">
      <div class="block my-10 line-divider md:hidden" />
      <section class="space-y-4">
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <CrownIcon class="text-[40px]" />
            <h2 class="text-h4 font-demi-bold">ارتقاء حساب کاربری</h2>
          </div>
          <p class="text-st-one text-text-400">
            با ارتقای حساب کاربری به اشتراک ویژه، دسترسی نامحدود به تمامی دوره‌ها و
            منابع آموزشی، محتوای انحصاری، و ابزارهای پیشرفته را خواهید داشت!
          </p>
        </div>
        <div dir="rtl" class="hidden sm:flex sm:flex-wrap sm:justify-center">
          <PlanCard
            v-bind="plan"
            :key="plan.id"
            :class="'w-1/2 p-2'"
            v-for="plan of plans_list"
          />
        </div>
        <div class="max-w-[95vw] flex items-center justify-center sm:hidden">
          <Carousel
            :numScroll="1"
            :numVisible="1"
            dir="ltr"
            :showIndicators="false"
            :value="plans_list?.reverse()"
            :containerClass="'max-w-[91vw]'"
          >
            <template #item="slotProps">
              <PlanCard v-bind="slotProps.data" />
            </template>
          </Carousel>
        </div>
      </section>
    </div>
  </div>
</template>
