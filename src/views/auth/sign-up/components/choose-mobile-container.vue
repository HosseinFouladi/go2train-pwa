<script setup lang="ts">
import { useRouter } from 'vue-router'
import { VueTelInput } from 'vue-tel-input'

import { Button } from '@/components'

const router = useRouter()
</script>

<template>
  <div class="space-y-6">
    <VueTelInput placeholder="شماره تلفن خود را وارد کنید ..." dir="ltr">
      <template #arrow-icon>
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="vuesax/outline/arrow-down">
            <path
              id="Vector"
              d="M8.15176 12L3.26176 7.10998C3.04426 6.89248 3.04426 6.53248 3.26176 6.31498C3.47926 6.09748 3.83926 6.09748 4.05676 6.31498L8.94676 11.205C9.30676 11.565 9.89176 11.565 10.2518 11.205L15.1418 6.31498C15.3593 6.09748 15.7193 6.09748 15.9368 6.31498C16.1543 6.53248 16.1543 6.89248 15.9368 7.10998L11.0468 12C10.6493 12.3975 10.1243 12.6 9.59926 12.6C9.07426 12.6 8.54926 12.3975 8.15176 12Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </template>
    </VueTelInput>
    <Button
      label="بعدی"
      @click="() => router.push({ path: '/sign-up/confirm-code-mobile' })"
    />
  </div>
</template>

<style>
.vue-tel-input {
  height: 54px !important;
  border-radius: 14px !important;
}

.vue-tel-input > input {
  font-family: 'inter';
  border-radius: 14px !important;
}

.vti__dropdown {
  border-top-left-radius: 14px !important;
  border-bottom-left-radius: 14px !important;
}

.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: var(--secondary-900);
}

.vti__dropdown-list {
  top: 3.4rem !important;
  border-radius: 14px !important;
  max-width: 384px !important;
  border: none !important;
  box-shadow: 0px 4px 6.1px 0px rgba(19, 19, 20, 0.2);
  overflow-x: hidden;
}
.vti__dropdown-item {
  font-family: 'iransans-x';
}

.vti__dropdown-item > strong {
  font-size: 14px;
  font-weight: 400;
}

.vti__search_box {
  width: 100%;
  height: 3rem;
  margin-top: 4px;
  padding-left: 2.5rem;
  border: none;
  border-bottom: 2px solid var(--secondary-100);
}

.vti__search_box_container::before {
  content: ' ';
  display: block;
  top: 14px;
  left: 12px;
  position: absolute;
  background-image: url('@/assets/search-normal.svg');
  background-size: 20px 20px;
  height: 20px;
  width: 20px;
}
</style>
