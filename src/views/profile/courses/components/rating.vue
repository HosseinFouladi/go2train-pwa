<template>
  <div>
    <div class="flex flex-col gap-4">
      <h5 class="text-h5 font-demi-bold">رتبه بندی و نظرات</h5>
      <div class="flex items-center justify-between gap-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-sm-h1 text-primary-500 font-extra-bold">
            {{ props?.ratings?.scoreAverage }}
          </h1>
          <StarRating
            :rtl="true"
            v-model:rating="value"
            :increment="0.01"
            :show-rating="false"
            :star-size="25"
            active-color="#FF9900"
            read-only
          ></StarRating>

          <span class="text-sm-st-two font-regular text-text-300"
            >{{ props.comments_count }} دیدگاه</span
          >
        </div>
        <div class="flex flex-col w-full">
          <div
            v-for="item in props?.ratings?.data"
            class="flex items-center gap-3 py-[6px] progress-cotainer"
          >
            <span>{{ item.score }}</span>
            <ProgressBar class="min-w-[200px] w-full" :value="item.average">
            </ProgressBar>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary-50"
      >
        <div class="flex gap-2 md:gap-4 xl:gap-8">
          <EmptyStarIcon v-for="item in 5" :key="item" class="text-secondary-900" />
        </div>

        <Button
          :fluid="false"
          label="دیدگاه خود را وارد  کنید"
          variant="outlined"
          class="comment-button"
          size="sm"
          @click="isWriteCommentPopup = !isWriteCommentPopup"
        />
      </div>
    </div>
  </div>

  <Drawer
    v-model:visible="isWriteCommentPopup"
    position="bottom"
    class="md:max-w-[540px] md:rounded-t-2xl"
  >
    <template #container>
      <div class="flex flex-col items-center gap-2 p-4 rounded-t-lg">
        <h2 class="text-h6 font-demi-bold">نظر</h2>
        <div class="h-[1px] w-full bg-secondary-100"></div>
        <div class="flex flex-col w-full gap-6">
          <div>
            <p class="mb-2 text-st-two text-text-500 font-regular">
              برای امتیازدهی ضربه بزنید
            </p>
            <div class="flex justify-between w-full">
              <StarRating
                :rtl="true"
                @update:rating="setRating"
                :increment="1"
                :show-rating="false"
                :star-size="30"
                active-color="#FF9900"
                active-on-click
              ></StarRating>
            </div>
          </div>
          <InputText
            @model-value="getCommentTitle"
            type="text"
            :value="commentTitle"
            placeholder="عنوان"
            :fluid="true"
          />
          <div class="flex flex-col gap-1">
            <text-area
              placeholder="نظر خود را بنویسید"
              @model-value="getCommentMsg"
              maxlength="300"
            />
            <span class="mr-2 text-secondary-600">{{ commentMsg.length }}/300</span>
          </div>
          <div class="flex justify-between">
            <Button label="انصراف" variant="text" @click="cancelCommenting" />
            <Button
              :disabled="!commentMsg || insertingComment||(commentRating<1)"
              label="ارسال نظر"
              @click="handleSubmitComment"
              :isLoading="insertingComment"
            />
          </div>
        </div>
      </div>
    </template>
  </Drawer>
  <Toast dir="rtl" class="text-right" severity="success" position="top-center" />
</template>

<script setup lang="ts">
import { EmptyStarIcon } from '@/components/icons'
import { Textarea, Button, InputText } from '@/components'
import Toast from 'primevue/toast'
import ProgressBar from 'primevue/progressbar'
import { computed, ref } from 'vue'
import StarRating from 'vue-star-rating'
import type { Ratings } from '@/queries'
import Drawer from 'primevue/drawer'
import { useMutation } from '@tanstack/vue-query'
import type { CreateNewCommentParams } from '@/queries'
import { ApiClient } from '@/utils'
import type { ApiResponseTypeV3 } from '@/utils/auth-providers'
import { ENDPOINTS } from '@/api'
import { useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'

type Rate = {
  ratings: Ratings
  comments_count: number
  course_id: number
}

const props = defineProps<Rate>()

const isWriteCommentPopup = ref(false)
const commentTitle = ref('')
const commentMsg = ref('')
const commentRating = ref(0)
const queryClient = useQueryClient()
const toast = useToast()

const value = computed(() => props?.ratings?.scoreAverage)

const setRating = (rating: number) => {
  commentRating.value = rating
}

const getCommentMsg = (msg: string) => {
  commentMsg.value = msg
}

const getCommentTitle = (title: string) => {
  commentTitle.value = title
}

const { mutate: submitComment, isPending: insertingComment } = useMutation({
  mutationFn: (params: CreateNewCommentParams) =>
    ApiClient.post<ApiResponseTypeV3<any>>(
      ENDPOINTS.comments.new_course_comment(props?.course_id),
      {
        ...params
      }
    ).catch((error) => {
      const serverError = error.response.data.message
      for (const e of serverError) {
        toast.add({
          summary: 'خطا درثبت نظر',
          detail: e.content,
          severity: 'info',
          life: 3000
        })
      }
      throw new Error(error)
    }).then(data=>{
      queryClient.invalidateQueries({ queryKey: ['course_comments'] })
      toast.add({
        summary: 'ثبت موفقیت آمیز نظر',
        detail: 'نظرباموفقیت ثبت گردید',
        severity: 'success',
        life: 3000
      })
    }),

})

const cancelCommenting = () => {
  isWriteCommentPopup.value = false
}

const handleSubmitComment = () => {
  submitComment({
    score: commentRating.value,
    comment: commentMsg.value,
    title: commentTitle.value
  })
}
</script>

<style>
.p-progressbar-value {
  background: #ff9900 !important;
}

.p-progressbar {
  height: 6px !important;

  .p-progressbar-label {
    display: none !important;
  }
}

.comment-button {
  padding-left: 0.35rem !important;
  padding-right: 0.35rem !important;
}

.vue-star-rating {
  width: 100%;
  justify-content: space-between;
}
</style>
