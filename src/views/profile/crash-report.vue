<script setup lang="ts">
import { ref } from 'vue'

import { first } from 'remeda'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import CategoryIcon from '@/components/icons/category/index.vue'
import ArrowDownIcon from '@/components/icons/arrow-down/index.vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ApiClient } from '@/utils'
import { ENDPOINTS } from '@/api'
import type { ApiResponseType, Message } from '@/api'
import type {
  BugReportCategories,
  BugReportStoreParams
} from '@/queries/bug-reports'
import { useForm } from '@tanstack/vue-form'
import FormFieldInfo from '@/components/form-field-info/FormFieldInfo.vue'

type Category = {
  id: number
  name: string
  unavailable: boolean
}
const categoryId = ref<number>(0)
const message = ref<string>('')

const getSelectedCategory = (category: Category) => {
  categoryId.value = category.id
  form.fieldInfo.category_id.instance?.handleChange(category.id)
}

const getMessage = (msg: string) => {
  message.value = msg
  form.fieldInfo.message.instance?.handleChange(msg)
}

const form = useForm({
  defaultValues: {
    category_id: 0,
    message: ''
  },
  onSubmit: () => {
    storeBug({ category_id: categoryId.value, message: message.value })
  },
})

const {
  data: categories,
  isPending,
  isFetching
} = useQuery({
  queryKey: ['bug-reports'],
  queryFn: () =>
    ApiClient.get<ApiResponseType<Array<BugReportCategories>, Message>>(
      ENDPOINTS.BugReport.bug_list
    ),
  select: (data) => {
    const res = data.data.results.map((item) => {
      return { id: item.id, name: item.title, unavailable: false }
    })
    return res
  }
})

const { mutate: storeBug, isPending: isStoreBugPending } = useMutation({
  mutationFn: (params: BugReportStoreParams) =>
    ApiClient.postForm(ENDPOINTS.BugReport.store_bug, {
      ...params
    }),
  onSuccess(props) {
    // @ts-ignore
    const msg = first(props.message).content
    Swal.fire({
      icon: 'success',
      title: 'عملیات موفق',
      text: msg,
      confirmButtonText: 'باشه',
      backdrop: true,
      customClass: {
        title: '!text-h5 !font-demi-bold !font-iransans',
        htmlContainer: '!text-st-two !text-secondary-700',
        popup: 'appearance-none rounded-3xl',
        confirmButton: 'text-primary-500 !text-bt-s !font-demi-bold',
        icon: 'appearance-none'
      },
      buttonsStyling: false
    }).then(() => {
    })
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 p-6 md:card">
    <h4 class="text-sm-h5 font-demi-bold md:text-h4">گزارش خرابی</h4>
    <p class="text-sm-st-one text-text-300 xl:text-st-one">
      تلاش شبانه روزی ما برای ایجاد پلتفرم آموزشی کاملی‌ست که بتواند پاسخگوی نیاز های
      شما باشد. در صورت وجود اختلال در سیستم لطفا گزارش خود را ثبت کنید تا در
      سریعترین زمام ممکن پیگیری شود.
    </p>
    <form
      class="flex flex-col gap-4"
      @submit="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }
      "
    >
      <form.Field
        name="category_id"
        :validators="{
          onChange: ({ value }) =>
            !value ? 'این فیلد نمی تواند خالی باشد  ' : undefined,
          onChangeAsyncDebounceMs: 500
        }"
      >
        <template v-slot="{ field, state }">
          <div class="flex flex-col gap-2">
            <label for="dropdown" class="text-sm-st-two font-demi-bold"
              >عنوان خرابی</label
            >
            <drop-down
              :isLoading="isPending||isFetching"
              :iconRight="CategoryIcon"
              :iconLeft="ArrowDownIcon"
              :options="categories"
              :name="field.name"
              :value="field.state.value"
              v-model="field.state.value"
              @blur="field.handleBlur"
              @input="
                (e) => field.handleChange((e.target as HTMLInputElement).value)
              "
              @model-value="getSelectedCategory"
            />
            <FormFieldInfo :state="state" />
          </div>
        </template>
      </form.Field>

      <form.Field
        name="message"
        :validators="{
          onChange: ({ value }) =>
            !value ? 'این فیلد نمی تواند خالی باشد  ' : undefined,
          onChangeAsyncDebounceMs: 500
        }"
      >
        <template v-slot="{ field, state }">
          <div class="flex flex-col gap-2">
            <label for="dropdown" class="text-sm-st-two font-demi-bold"
              >لطفا مشکل مورد نظر را بنویسید
            </label>
            <text-area
              :name="field.name"
              :value="field.state.value"
              @blur="field.handleBlur"
              @model-value="getMessage"
            />
            <FormFieldInfo :state="state" />
          </div>
        </template>
      </form.Field>
    </form>
    <form.Subscribe>
      <div class="flex justify-end">
        <Button
          type="submit"
          label="ثبت گزارش"
          :isLoading="isStoreBugPending"
          @click="form.handleSubmit()"

        />
      </div>
    </form.Subscribe>
  </div>
</template>


