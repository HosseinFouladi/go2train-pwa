<template>
  <div
    class="relative flex flex-col justify-end md:justify-start md:pt-16 md:px-16 w-full px-4 py-8 h-[326px]"
  >
    <div class="absolute top-0 left-0 z-20 w-full h-full overlay"></div>
    <img
      :src="LoginImg"
      alt="header-img"
      class="absolute top-0 left-0 z-10 w-full h-full object-cover"
    />
    <div class="z-30 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <img :src="AvatarPlaceholder" class="w-8 rounded-lg aspect-square" alt="" />
        <h2 class="text-neutral-white text-h6 font-demi-bold">
          دوره زبان انگلیسی - {{ 'A2' }}
        </h2>
      </div>
      <div
        class="flex gap-1 text-neutral-white px-2 py-[2px] text-sm-st-two font-regular rounded-2xl gadget"
      >
        <StarIcon />
        4.5
      </div>
      <div class="flex flex-col items-end gap-2 text-sm-st-two md:text-st-two">
        <p class="text-neutral-white">
          {{ text.slice(0, 160) + '...' }}
        </p>
        <Button
          :fluid="false"
          label=" ادامه مطلب"
          :iconLeft="ArrowLeft"
          variant="text"
          @click="showMore = true"
        />
      </div>
    </div>
    <Drawer
      v-model:visible="showMore"
      position="bottom"
      class="md:max-w-[540px] md:rounded-t-2xl"
    >
      <template #container>
        <div class="flex flex-col items-center gap-2 p-4 rounded-t-lg">
          <h2 class="text-h6 font-demi-bold">دوره زبان انگلیسی - {{ 'A2' }}</h2>
          <div class="h-[1px] w-full bg-secondary-100"></div>
          <p
            class="text-right text-sm-st-two font-regular text-secondary-900 md:text-st-one md:text-text-500"
          >
            {{ text }}
          </p>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import LoginImg from '@/assets/images/login.webp'
import { StarIcon, ArrowLeft } from '@/components/icons'
import { Button } from '@/components'
import { ref } from 'vue'

const showMore = ref(false)
const text = ref(
  '            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده\n' +
    '            از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و\n' +
    '            سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای\n' +
    '            متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه\n' +
    '            درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با\n' +
    '            نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان\n' +
    '            خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید\n' +
    '            داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان\n' +
    '            رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات\n' +
    '            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
)
</script>

<style>
.overlay {
  background: linear-gradient(
    180deg,
    rgba(14, 14, 16, 0.5) 0%,
    rgba(14, 14, 14, 0.6) 49%,
    rgba(14, 14, 14, 0.9) 90%
  );
}
.gadget {
  background: rgba(34, 35, 40, 0.8);
  width: fit-content;
}

.p-drawer-bottom .p-drawer {
  height: auto !important;
}
</style>
