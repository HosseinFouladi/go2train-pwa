<template>
    <div class="flex flex-col ">
        <Header class="hidden xl:block" />
        <MobileHeader  class="xl:hidden" />
        <router-view/>
        <MobileSidebar  :is-visible="true" class="xl:hidden " />

    </div>
</template>

<script setup lang="ts">
import {
  Header,
  MobileHeader,
  MobileSidebar
  
} from './components'
</script>

<style scoped>

</style>