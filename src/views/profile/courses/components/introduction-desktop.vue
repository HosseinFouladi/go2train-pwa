<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <img :src="AvatarPlaceholder" class="w-8 rounded-lg aspect-square" alt="" />
      <h2 class="text-h4 font-extra-bold">دوره زبان انگلیسی - {{ 'A2' }}</h2>
    </div>
    <p class="flex gap-1 text-h6 font-demi-bold">
      <span class="text-primary-500">مدرس</span>
      <span class="text-text-400">حسام موسوی</span>
    </p>
    <div class="flex flex-col items-end gap-2 text-sm-st-two md:text-st-two">
      <p class="text-text-300">
        {{ showMore ? text : text.slice(0, 160) + '...' }}
      </p>
      <Button
        :fluid="false"
        :label="!showMore ? 'بستن' : 'بیشتراطلاعات'"
        :iconLeft="ArrowLeft"
        variant="text"
        @click="showMore = !showMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { ArrowLeft } from '@/components/icons'
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

<style scoped></style>
