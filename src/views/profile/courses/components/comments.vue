<script setup lang="ts">
import { Button, UserAvatar } from '@/components'
import {
  FilterIcon,
  LikeIcon,
  EmptyLikeIcon
} from '@/components/icons'
import { ApiClient, cn } from '@/utils'
import { ref, watch } from 'vue'
import type { Comment, CommentReactionParams } from '@/queries'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ApiResponseTypeV3 } from '@/utils/auth-providers'
import { ENDPOINTS } from '@/api'
import { useTimeAgo } from '@vueuse/core'
import {
  ScrollAreaRoot,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollAreaScrollbar
} from 'radix-vue'

let lastScrollTop = 0

const props = defineProps({
  course_id: { type: String }
})
const emit = defineEmits(['commentsCount'])
const filterMenu = ref()
const commentMore = ref(false)
const replayMore = ref(false)
const page = ref(1)
const commentArray = ref<Array<Comment>>([])
const isFilterMenu = ref(false)
const orderByFilterParam = ref(2)
const orderTypefilterParam = ref<1 | 2>(2)
const filterName = ref('جدیدترین ها')
const currentCommentId = ref('1')

const filterOptions = ref([
  {
    title: 'جدیدترین ها',
    value: '2',
    order: '2'
  },
  {
    title: 'مفیدترین',
    value: '3',
    order: '2'
  },
  {
    title: 'رتبه‌بندی از بیشترین تا کمترین ',
    value: '1',
    order: '1'
  },
  {
    title: ' رتبه‌بندی از کمترین تا بیشترین',
    value: '1',
    order: '2'
  }
])

const filterToggle = (event: Event) => {
  filterMenu.value.toggle(event)
}

const {
  data: comments,
  isPending: commentPending,
  isFetching: commentFetching,
  refetch: commentRefetch
} = useQuery({
  queryKey: ['course_comments'],
  queryFn: () =>
    ApiClient.get<ApiResponseTypeV3<Array<Comment>>>(
      ENDPOINTS.comments.course_comment(props?.course_id),
      {
        params: {
          page: page.value,
          orderBy: orderByFilterParam.value,
          orderType: orderTypefilterParam.value
        }
      }
    ),
  gcTime: 0
})

const { mutate: likeComment, isPending: likePending } = useMutation({
  mutationFn: (params: CommentReactionParams) =>
    ApiClient.post<ApiResponseTypeV3<any>>(ENDPOINTS.comments.comment_reaction, {
      ...params
    }),
  onError(error) {}
})

const handleLike = (commentId: string, isLike: boolean) => {
  //handle like action in client side before waiting to server response:)
  commentArray.value = commentArray.value.map((item) => {
    if (item.id === commentId)
      return {
        ...item,
        isLike: isLike ? false : true,
        likes: isLike ? item.likes - 1 : item.likes + 1
      }
    return { ...item }
  })
  likeComment({ action: isLike ? 0 : 1, commentId })
}
const infiniteScroll = (e: HTMLElement) => {
  const element = document.querySelector('.scroll-wrapper')

  if (!element) return

  if (element.scrollTop < lastScrollTop) {
    // upscroll
    return
  }
  lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop

  if (
    element.scrollTop + element.offsetHeight >= element.scrollHeight - 50 &&
    comments.value?.meta.last_page !== page.value
  ) {
    page.value += 1
    commentRefetch()
  }
}

watch(
  () => comments.value?.data,
  () => {
    if (comments.value?.data) {
      commentArray.value = [...commentArray.value, ...comments.value.data]
    }
    emit('commentsCount', commentArray.value.length)

  }
)
</script>
<template>
  <div>
    <Button
      :label="filterName"
      :iconRight="FilterIcon"
      variant="text"
      class="my-3 xl:hidden"
      @click="isFilterMenu = !isFilterMenu"
    />

    <Button
      :label="filterName"
      :iconRight="FilterIcon"
      variant="text"
      class="hidden my-3 xl:flex"
      @click="filterToggle"
    />
    <Popover ref="filterMenu" id="filterMenu">
      <div class="flex flex-col items-center gap-2 p-4 rounded-t-lg">
        <h2 class="text-h6 font-demi-bold">مرتب کردن بر اساس</h2>
        <div class="h-[1px] w-full bg-secondary-100"></div>
        <ul class="flex flex-col w-full gap-2">
          <li
            v-for="item in filterOptions"
            :key="item.value"
            class="w-full p-4 rounded-lg cursor-pointer text-st-two font-regular hover:bg-secondary-100 text-start"
            :class="
              cn({
                'bg-secondary-100': item.title === filterName
              })
            "
            @click="
              () => {
                isFilterMenu = false
                if (item.title === filterName) return
                orderByFilterParam = item.value
                orderTypefilterParam = item.order
                filterName = item.title
                commentArray = []
                page = 1
                lastScrollTop = 0
                commentRefetch()
              }
            "
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </Popover>
    <ScrollAreaRoot
      class="flex flex-col gap-2 p-4 rounded-2xl bg-secondary-50"
      dir="rtl"
      style="--scrollbar-size: 1px"
    >
      <ScrollAreaViewport
        class="flex flex-col h-[800px] overflow-auto gap-2 scroll-wrapper"
        @scroll="infiniteScroll"

      >
        <div
          v-for="comment in commentArray"
          :key="comment.id"
          class="flex flex-col gap-2"
        >
          <div class="flex justify-between">
            <div class="flex items-center gap-2">
              <UserAvatar
                :avatar_url="comment.user.avatar"
                :badge_url="comment.user.plan.icon"
                width="40px"
              />
              <div class="flex flex-col gap-1">
                <span class="text-sm-st-two font-regular text-text-200">
                  {{ comment.user.name }}</span
                >
                <StarRating
                  :rtl="true"
                  v-model:rating="comment.score"
                  :increment="0.01"
                  :show-rating="false"
                  :star-size="25"
                  active-color="#FF9900"
                ></StarRating>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-sm-st-two font-regular text-text-200" dir="ltr">
                {{ useTimeAgo(comment.createdAt) }}</span
              >
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm-st-two font-regular"> {{ comment.title }}</span>
            <div class="flex gap-1">
              <LikeIcon
                v-if="comment.isLike"
                class="cursor-pointer"
                @click="handleLike(comment.id, comment.isLike)"
              />
              <EmptyLikeIcon
                v-else
                @click="handleLike(comment.id, comment.isLike)"
                class="cursor-pointer"
              />
              <span class="text-sm-st-two font-regular text-success-500">
                {{ comment.likes }}</span
              >
            </div>
          </div>
          <div class="flex flex-col items-end overflow-hidden transition-all">
            <p
              :class="
                cn({
                  'para	': !commentMore
                })
              "
              class="w-full transition text-start"
            >
              {{
                comment.comment.length < 160 || commentMore
                  ? comment.comment
                  : comment.comment.slice(0, 160) + '...'
              }}
            </p>
            <span
              v-if="comment.comment.length >= 160"
              @click="
                () => {
                  commentMore = !commentMore
                  currentCommentId = comment.id
                }
              "
              class="cursor-pointer text-primary-500 text-st-two"
              >{{
                commentMore && comment.id === currentCommentId ? 'بستن' : 'بیشتر'
              }}</span
            >
          </div>
          <div
            v-if="comment?.reply?.text"
            class="p-3 border rounded-lg bg-neutral-white border-secondary-200"
          >
            <div class="flex flex-col items-end overflow-hidden transition-all">
              <p
                :class="
                  cn({
                    'para	': !replayMore
                  })
                "
                class="w-full transition text-start"
                v-if="comment?.reply?.text"
              >
                {{
                  comment?.reply.text.length < 160 || replayMore
                    ? comment?.reply.text
                    : comment?.reply.text.slice(0, 160) + '...'
                }}
              </p>
              <span
                v-if="comment?.reply?.text?.length >= 160"
                @click="replayMore = !replayMore"
                class="cursor-pointer text-primary-500 text-st-two"
                >{{ replayMore ? 'بستن' : 'بیشتر' }}</span
              >
            </div>
          </div>
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar
        class="flex select-none m-1 rounded-full touch-none p-0.5 bg-secondary-50 transition-colors duration-[160ms] ease-out hover:bg-secondary-100 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollAreaThumb
          class="flex-1 bg-secondary-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
        />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
    <Drawer
      v-model:visible="isFilterMenu"
      position="bottom"
      class="md:max-w-[540px] md:rounded-t-2xl"
    >
      <template #container>
        <div class="flex flex-col items-center gap-2 p-4 rounded-t-lg">
          <h2 class="text-h6 font-demi-bold">مرتب کردن بر اساس</h2>
          <div class="h-[1px] w-full bg-secondary-100"></div>
          <ul class="flex flex-col w-full gap-2">
            <li
              v-for="item in filterOptions"
              :key="item.value"
              class="w-full p-4 rounded-lg cursor-pointer text-st-two font-regular hover:bg-secondary-100 text-start"
              :class="
                cn({
                  'bg-secondary-100': item.title === filterName
                })
              "
              @click="
                () => {
                  isFilterMenu = false
                  if (item.title === filterName) return
                  orderByFilterParam = item.value
                  orderTypefilterParam = item.order
                  filterName = item.title
                  commentArray = []
                  page = 1
                  lastScrollTop = 0
                  commentRefetch()
                }
              "
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </template>
    </Drawer>
  </div>
</template>



<style>
.para {
  text-overflow: ellipsis;
}
.p-progressbar-value {
  background: #ff9900 !important;
}

.p-progressbar {
  height: 6px !important;

  .p-progressbar-label {
    display: none !important;
  }
}
</style>
