<script lang="ts" setup>
import { Container } from '..'
import { Logo, UserAvatar, TokenBadge } from '@/components'



defineProps({
  badge:{type:String},
  avatar:{type:String}
})
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
            :avatar_url="avatar"
            :badge_url="badge"
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
