<template>
    <div class="flex flex-col gap-3 p-3 border shadow rounded-2xl border-secondary-200 min-w-[281px]">
        <div class="flex h-full gap-2">
            <div class="relative w-[85px] h-full bg-plan-gold rounded-xl overflow-hidden flex flex-col justify-end p-2">
                <img :src="LoginImg" alt="" class="absolute top-0 left-0 w-full h-full">
                <div class="z-20 flex items-center justify-between">
                    <img :src="AvatarPlaceholder" alt="" class="w-4 rounded-full aspect-square">
                    <div class="flex gap-[2px] items-center ">
                        <StarIcon />
                        <span class="text-primary-200 text-sm-cp font-demi-bold">۴.۵</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2 ">
                <div class="flex flex-col gap-1">
                    <span class="px-2 py-1 border text-sm-cp font-regular rounded-2xl border-success-500 text-success-500 w-fit">به زبان فارسی</span>
                    <h2 class="text-st-two font-extra-bold text-text-500">دوره انگلیسی - A2</h2>
                </div>
                <div class="flex items-center gap-1">
                    <div class="flex">
                        <UserAvatar :avatar_url="CoinImg" :badge_url="AvatarPlaceholder" width="20px" class=""/>
                        <UserAvatar :avatar_url="CoinImg" :badge_url="AvatarPlaceholder" width="20px" class="-mr-2"/>
                        <UserAvatar :avatar_url="CoinImg" :badge_url="AvatarPlaceholder" width="20px" class="-mr-2"/>
                        <UserAvatar :avatar_url="CoinImg" :badge_url="AvatarPlaceholder" width="20px" class="-mr-2"/>
                    </div>
                    <span class=" text-sm-cp font-demi-bold text-accent-600">۴۳۵+</span>
                </div>
                <div class="">
                    <div class="flex gap-2">
                        <ClockIcon class="w-4 h-4 text-secondary-500" /> 
                        <p class="text-sm-cp font-regular">
                            <strong class=" text-sm-cp font-extra-bold">23</strong>
                            ساعت دوره آموزشی
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <PlayIcon class="w-4 h-4"/> 
                        <p class="text-sm-cp font-regular">
                            <strong class=" text-sm-cp font-extra-bold">23</strong>
                            جلسه
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <img :src="AvatarPlaceholder" alt="" class="w-6 rounded-lg aspect-square object-fit">
                    <div class="flex gap-1">
                        <span class="text-sm-cp font-demi-bold text-text-300 ">مدرس :</span>
                        <span class="text-sm-cp font-demi-bold ">فعلا مشخص نشده</span>
                    </div>
                </div>
            </div>
        </div>
        <Button label="ادامه دوره" fluid variant="outlined" />
    </div>
</template>

<script setup lang="ts">
    import {UserAvatar,Button} from "@/components";
    import { PlayIcon,ClockIcon,StarIcon } from "@/components/icons";
    import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
    import CoinImg from '@/assets/images/coin-silver.png'

    import LoginImg from '@/assets/images/login.webp'


</script>

<style scoped>

</style>