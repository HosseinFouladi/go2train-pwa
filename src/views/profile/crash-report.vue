<template>
  <div class="flex flex-col gap-4 p-6 md:card">
    <h4 class="text-sm-h5 font-demi-bold md:text-h4">گزارش خرابی</h4>
    <p class="text-sm-st-one text-text-300 xl:text-st-one">
      تلاش شبانه روزی ما برای ایجاد پلتفرم آموزشی کاملی‌ست که بتواند پاسخگوی نیاز های
      شما باشد. در صورت وجود اختلال در سیستم لطفا گزارش خود را ثبت کنید تا در
      سریعترین زمام ممکن پیگیری شود.
    </p>
    <div class="flex flex-col gap-2">
      <label for="dropdown" class="text-sm-st-two font-demi-bold">عنوان خرابی</label>
      <drop-down
        :iconRight="CategoryIcon"
        :iconLeft="ArrowDownIcon"
        :options="options"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="dropdown" class="text-sm-st-two font-demi-bold"
        >لطفا مشکل مورد نظر را بنویسید
      </label>
      <text-area
        :iconRight="CategoryIcon"
        :iconLeft="ArrowDownIcon"
        :options="options"
      />
    </div>
    <div class="flex justify-end">
      <Button label="ثبت گزارش" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryIcon from '@/components/icons/category/index.vue'
import ArrowDownIcon from '@/components/icons/arrow-down/index.vue'

//TODO: this option will come from api
const options = ref([
  { id: 1, name: 'مشکلات اپلیکیشن', unavailable: false },
  { id: 2, name: ' مشکلات ویدئو', unavailable: false },
  { id: 3, name: 'مشکلات جزوات', unavailable: false },
  { id: 4, name: 'مشکلات آزمون ', unavailable: false },
  { id: 5, name: 'سایر', unavailable: false }
])
</script>

<style lang="scss" scoped></style>
