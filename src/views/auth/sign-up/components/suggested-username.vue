<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    suggestions: Array<string>
    selectSuggestedUsername: (username: string) => void
  }>(),
  {
    suggestions: undefined
  }
)
</script>

<template>
  <div class="space-y-1">
    <p class="text-sm-bt-s">نام کاربری‌های پیشنهادی</p>
    <div class="flex flex-col gap-1 username-container">
      <span
        class="w-full px-3 py-2 rounded cursor-pointer hover:opacity-80 text-st-two"
        :key="username"
        v-for="username in props.suggestions"
        @click="() => selectSuggestedUsername(username)"
      >
        {{ username }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.username-container span:nth-child(even) {
  background-color: #fff5e6;
}

.username-container span:nth-child(odd) {
  background-color: #f0f0f4;
}
</style>
