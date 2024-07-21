<script setup lang="ts">
import type { FieldApi } from "@tanstack/vue-form";

const props = defineProps<{
  state: FieldApi<any, any, any, any>["state"];
}>();
</script>

<template>
  <div style="min-height: 1.5rem" class="d-flex flex-column">
    <span
      class="d-flex flex-column text-danger-500"
      :key="error?.toString()"
      v-for="error of props.state.meta.touchedErrors"
    >
      <span :key="msg.toString()" v-for="msg of error?.toString().split(',')">
        {{ msg }}
      </span>
    </span>
  </div>
</template>
