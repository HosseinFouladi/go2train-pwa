<script lang="ts" setup>
const props = defineProps<{
  avatarUrl: string
  firstName: string
  lastName: string
}>()
</script>

<template>
  <div>
    <div>
      <img :src="props.avatarUrl" alt="User avatar image" />
    </div>
    <div>
      <span>{{props.firstName}} {{ props.lastName }}</span>
      <span>{{props.firstName}} {{ props.lastName }}</span>
    </div>
  </div>
</template>
