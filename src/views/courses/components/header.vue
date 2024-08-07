<template>
    <div class="relative flex flex-col justify-end w-full px-4 py-6">
        <div class="absolute top-0 left-0 w-full h-full overlay"></div>
        <img :src="AvatarPlaceholder" alt="header-img" class="absolute top-0 left-0 w-full h-full">
        <div class="flex flex-col gap-4 ">
            <div class="flex items-center gap-2">
                <img :src="AvatarPlaceholder" class="rounded-lg" alt="">
                <h2 class="text-white text-h6 font-demi-bold">دوره زبان انگلیسی - {{ 'A2' }}</h2>
            </div>
            <div class="flex px-2 py-[2px] text-sm-st-two font-regular rounded-2xl"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

</script>

<style scoped>
    .overlay{
        background: linear-gradient(180deg, rgba(14,14,16,0.5) 0%, rgba(14,14,14,0.6) 49%, rgba(14,14,14,0.9) 90%);

    }
</style>