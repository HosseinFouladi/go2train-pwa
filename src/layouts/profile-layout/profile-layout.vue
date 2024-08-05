<script setup lang="ts">
import { useGetUserProfileQuery, type CurrentPlanResponseType } from '@/queries';
import {
  Sidebar,
  Header,
  Container,
  MobileHeader,
  MobileSidebar
} from './components'
import { useQuery } from '@tanstack/vue-query';
import { ApiClient } from '@/utils';
import { ENDPOINTS, type ApiResponseType, type Message } from '@/api';
import { computed } from 'vue';

const { data: profile, isLoading: profileLoading } = useGetUserProfileQuery()

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
  <div class="flex flex-col-reverse lg:flex-row bg-background-default">
    <div class="flex flex-col w-full">
      <Header v-if="isLoadedDatas" class="hidden xl:block" :badge="currentPlan?.data.results[0].icon" :avatar="profile?.data.results.user.avatar"/>
      <MobileHeader  class="xl:hidden" />
      <div
        class="flex flex-col w-full  max-w-[1440px] mx-auto px-4 lg:px-0"
      >
        <Container class="max-w-none">
          <div class="flex flex-row justify-between w-full h-full gap-6 py-8 ">
            <Sidebar class="hidden xl:block" />
            <MobileSidebar  :is-visible="true" class="xl:hidden " />

            <router-view />
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>
