<template>
    <div>
        <div class="flex flex-col gap-4 ">
            <h5 class="text-h5 font-demi-bold">رتبه بندی و نظرات</h5>
            <div class="flex items-center justify-between gap-8">
                <div class="flex flex-col gap-2">
                    <h1 class="text-sm-h1 text-primary-500 font-extra-bold">۴.۸</h1>
                    <div class="flex gap-1 relative ">
<!--                        <StarIcon class="w-4 h-4 text-primary-500" v-for="item in filledStars" :key="item"/>-->
                      <span v-for="item in filledStars" :key="item">&star;</span>

                      <div class="flex gap-1 absolute  overflow-hidden top-0 right-0  " :style="{width:`${halfStar*100}%`}" >
<!--                        <svg v-for="item in filledStars" :key="item"  class="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                          <path d="M6.92723 1.69302L5.66603 4.2154C5.49405 4.56653 5.03543 4.90333 4.64848 4.96782L2.36256 5.34761C0.900724 5.59125 0.556763 6.6518 1.61015 7.69802L3.38728 9.47515C3.68825 9.77612 3.85307 10.3566 3.75991 10.7722L3.25113 12.9721C2.84984 14.7134 3.77424 15.387 5.3149 14.4769L7.4575 13.2086C7.84446 12.9793 8.48222 12.9793 8.87634 13.2086L11.0189 14.4769C12.5524 15.387 13.484 14.7062 13.0827 12.9721L12.5739 10.7722C12.4808 10.3566 12.6456 9.77612 12.9466 9.47515L14.7237 7.69802C15.7699 6.6518 15.4331 5.59125 13.9713 5.34761L11.6854 4.96782C11.3056 4.90333 10.847 4.56653 10.675 4.2154L9.41378 1.69302C8.72586 0.324333 7.60798 0.324333 6.92723 1.69302Z" fill="#FF9900"/>-->
<!--                        </svg>-->

                        <span class="text-primary-500 fill-primary-500">&star;</span>

                      </div>


                    </div>


                    <span class="text-sm-st-two font-regular text-text-300">۲۴ دیدگاه</span>
                </div>
                <div class="flex flex-col w-full ">
                    <div v-for="item in 5" class="flex items-center gap-3 py-[6px] progress-cotainer">
                        <span>5</span>
                        <ProgressBar class="min-w-[200px] w-full" :value="50"> </ProgressBar>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary-50 ">
                <div class="flex gap-2">
                    <EmptyStarIcon  v-for="item in filledStars" :key="item" class="text-secondary-900"/>

                </div>

                <Button :fluid="false" label="دیدگاه خود را وارد  کنید" variant="outlined" class="comment-button" size="sm"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { StarIcon,EmptyStarIcon } from '@/components/icons';
    import ProgressBar from 'primevue/progressbar';
    import { Button } from '@/components';
    import {computed, ref} from 'vue';
    const value=ref(3.8);

    const filledStars=computed(()=>Math.floor(value.value))
    const halfStar=computed(()=>(value.value)%1)

    console.log(filledStars.value,halfStar.value)

</script>

<style>

    .p-progressbar-value{
      background: #FF9900 !important;
    }

    .p-progressbar{
      height: 6px !important;


      .p-progressbar-label{
        display: none !important;
      }
    }

    .comment-button{
      padding-left: 0.35rem !important;
      padding-right: 0.35rem !important;
    }

</style>