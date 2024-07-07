<script setup lang="ts">
import { Sidebar, Header, Container } from './components'
</script>

<template>
  <div class="flex flex-col-reverse min-h-screen lg:flex-row bg-background-default">
    <div class="flex flex-col w-full">
      <Header />
      <div
        class="flex flex-col w-full min-h-screen max-w-[1440px] mx-auto px-4 lg:px-0"
      >
        <Container>
          <div class="flex flex-row gap-6 py-8 justify-between w-full h-full">
            <Sidebar />
            <router-view />
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
