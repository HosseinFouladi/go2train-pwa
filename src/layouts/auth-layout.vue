<script setup lang="ts"></script>

<template>
  <div class="flex flex-row justify-between w-full h-full min-h-screen bg-background-default">
    <div class="w-full bg-primary-500"></div>
    <div class="w-full bg-secondary-500">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
