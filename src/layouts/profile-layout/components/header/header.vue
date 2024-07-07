<script lang="ts" setup>
import { Container } from '..'
import { Logo, UserAvatar, TokenBadge } from '@/components'

const user_avatar = {
  avatar_url:
    'https://cdn.pixabay.com/photo/2017/06/06/16/48/woman-2377742_960_720.jpg',
  badge_url:
    'https://train-release.file.g2storage.com/plan/icon/r3QYKaakG9mNwRwUBPHABH2XyqWHh2Ck2yc72OrG.png'
}
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
            :avatar_url="user_avatar.avatar_url"
            :badge_url="user_avatar.badge_url"
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
