<template>
  <div>
    <Button
      label="جدیدترین"
      :iconRight="FilterIcon"
      variant="text"
      class="my-3"
      @click="toggle"
    />
    <Menu ref="filterMenu" id="overlay_menu" :model="items" :popup="true" />
    <div class="flex flex-col gap-2 p-4 rounded-2xl bg-secondary-50">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <UserAvatar :avatar_url="''" :badge_url="''" width="40px" />
            <div class="flex flex-col gap-1">
              <span class="text-sm-st-two font-regular text-text-200"
                >حسام رضاخواه</span
              >
              <div class="flex gap-1">
                <StarIcon
                  class="w-4 h-4 text-primary-500"
                  v-for="item in 5"
                  :key="item"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-sm-st-two font-regular text-text-200"> ۲ دقیقه</span>
            <div @click="toggleMore">
              <MoreIcon />
            </div>
            <Menu ref="moreMenu" id="setting_menu" :model="items" :popup="true" />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm-st-two font-regular">خیلی خوب</span>
          <div class="flex gap-1">
            <LikeIcon />
            <span class="text-sm-st-two font-regular text-success-500"
              >خیلی خوب</span
            >
          </div>
        </div>
        <div class="flex flex-col items-end overflow-hidden transition-all ">
          <p
            :class="
              cn({
                'para	': !commentMore
              })
            "
            class="transition"
          >
            {{ commentMore ? lorem : lorem.slice(0, 160) + '...' }}
          </p>
          <span
            @click="commentMore = !commentMore"
            class="text-primary-500 text-st-two"
            >{{ commentMore ? 'بستن' : 'بیشتر' }}</span
          >
        </div>
        <div class="p-3 border rounded-lg bg-neutral-white border-secondary-200">
          <div class="flex flex-col items-end overflow-hidden transition-all">
            <p
              :class="
                cn({
                  'para	': !commentMore
                })
              "
              class="transition"
            >
              {{ commentMore ? lorem : lorem.slice(0, 160) + '...' }}
            </p>
            <span
              @click="commentMore = !commentMore"
              class="text-primary-500 text-st-two"
              >{{ commentMore ? 'بستن' : 'بیشتر' }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, UserAvatar } from '@/components'
import { FilterIcon, StarIcon, LikeIcon, MoreIcon } from '@/components/icons'
import { cn } from '@/utils'
import { ref } from 'vue'
const filterMenu = ref()
const moreMenu = ref()
const commentMore = ref(false)

const lorem = ref(
  ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف  بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال  و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت  بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در  زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری  موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز  شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود  طراحی اساسا مورد استفاده قرار گیرد.ادگی  نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون  بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می  باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان  جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان'
)

const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Export',
        icon: 'pi pi-upload'
      }
    ]
  }
])

const toggle = (event) => {
  filterMenu.value.toggle(event)
}

const toggleMore = (event) => {
  moreMenu.value.toggle(event)
}
</script>

<style scoped>
.para {
  text-overflow: ellipsis;
}
</style>
