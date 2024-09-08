<script lang="ts" setup>
import { Container } from '..'
import { Logo, UserAvatar } from '@/components'
import { useQuery } from '@tanstack/vue-query'
import { ApiClient } from '@/utils'
import { ENDPOINTS, type ApiResponseType, type Message } from '@/api'
import { computed } from 'vue'
import {useGetUserProfileQuery} from '@/queries/profile/user-profile.query'
import { useUserProfileQuery, type CurrentPlanResponseType } from '@/queries'

const { data: profile, isLoading: profileLoading } = useUserProfileQuery()

const {
  data: currentPlan,
  isPending,
  isFetching
} = useQuery({
  queryKey: ['current-plan'],
  queryFn: () =>
    ApiClient.get<ApiResponseType<Array<CurrentPlanResponseType>, Message>>(
      ENDPOINTS.Profile.CurrentPlan
    )
})

const isLoadedDatas = computed(
  () =>
    !profileLoading.value &&
    profile.value?.data &&
    !isPending.value &&
    !isFetching.value &&
    currentPlan.value?.data
)
</script>

<template>
  <header class="w-full bg-neutral-white">
    <Container>
      <nav
        class="flex items-center justify-between py-6 mx-auto max-w-[1440px]"
        aria-label="Profile Navigation"
      >
        <Logo class="w-[180px] h-[48px]" />
        <div class="flex flex-row items-center gap-4 rtl:flex-row-reverse">
          <UserAvatar
            v-if="isLoadedDatas"
            :avatar_url="profile?.data.results.user.avatar as string"
            :badge_url="currentPlan?.data.results[0].icon as string"
          />
          <!-- Icon Button Should Be Placed Here -->
          <!-- <TokenBadge :token_count="20" /> -->
        </div>
      </nav>
    </Container>
  </header>
</template>

<style scoped>
header {
  box-shadow: 0px 4px 10px 0px rgba(34, 35, 40, 0.15);
}
</style>
