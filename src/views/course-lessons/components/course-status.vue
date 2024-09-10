<script lang="ts" setup>
import { computed } from 'vue'
import { separateDigitsByColon } from '@/utils'
import { GoalIcon, ThunderIcon, CupIcon } from '@/components/icons'
import { useUserProfileQuery, useProfileStatisticsQuery } from '@/queries'

const { data: userProfileData, isLoading: userLoading } = useUserProfileQuery()
const { data: statisticsData, isLoading: statsLoading } = useProfileStatisticsQuery()
const score = computed(() => userProfileData.value?.data.results.user.score)
const dailyGoal = computed(() => statisticsData.value?.data.results.daily_goal)
const achievementTotal = computed(
  () => userProfileData.value?.data.results.leaderboard_rank.total
)
const achievementRank = computed(
  () => userProfileData.value?.data.results.leaderboard_rank.your_rank
)
</script>

<template>
  <div class="space-y-2.5">
    <h2 class="hidden text-h6 font-demi-bold text-text-500 xl:block">وضعیت شما</h2>
    <Skeleton v-if="statsLoading || userLoading" height="76px" borderRadius="16px" />
    <div
      v-else
      dir="ltr"
      class="flex h-[76px] w-full border divide-x divide-primary-200 border-primary-500 rounded-2xl"
    >
      <div class="flex-1">
        <div class="flex items-center justify-center w-full gap-1 h-1/2">
          <span class="inline-flex text-st-two text-secondary-900">دستاورد ها</span>
          <CupIcon class="text-primary-500" />
        </div>
        <span
          class="flex items-center justify-center w-full text-h6 font-demi-bold text-primary-500"
        >
          {{ String(achievementRank).toPersianDigits() }} /
          {{ String(achievementTotal).toPersianDigits() }}
        </span>
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-center w-full gap-1 h-1/2">
          <span class="inline-flex text-st-two text-secondary-900">امتیاز</span>
          <ThunderIcon class="text-primary-500" />
        </div>
        <span
          class="flex items-center justify-center w-full text-h6 font-demi-bold text-primary-500"
        >
          {{ separateDigitsByColon(Number(score)).toPersianDigits() }}
        </span>
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-center w-full gap-1 h-1/2">
          <span class="inline-flex text-st-two text-secondary-900">اهداف امروز</span>
          <GoalIcon class="text-primary-500" />
        </div>
        <span
          class="flex items-center justify-center w-full gap-2 text-h6 font-demi-bold text-primary-500"
        >
          <span>دقیقه</span>
          {{
            dailyGoal
              ? String(dailyGoal).toPersianDigits()
              : String(0).toPersianDigits()
          }}
        </span>
      </div>
    </div>
  </div>
</template>
