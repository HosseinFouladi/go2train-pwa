<script setup lang="ts">
import {
  Sidebar,
  Header,
  Container,
  MobileHeader,
  MobileSidebar
} from './components'

</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row bg-background-default">
    <div class="flex flex-col w-full">
      <Header  />
      <MobileHeader  class="xl:hidden" />
      <div
        class="flex flex-col w-full  max-w-[1440px] mx-auto px-4 lg:px-0"
      >
        <Container>
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
