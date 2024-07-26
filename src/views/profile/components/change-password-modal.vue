<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { VueFinalModal } from 'vue-final-modal'
import { InputLabel, InputPassword, InputWrapper } from '@/components'

const props = defineProps<{
  onCancel: () => void
}>()

const form = useForm({
  defaultValues: {
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: ''
  }
})
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex flex-col w-full gap-8 p-2 mx-4 space-y-2 md:p-10 md:max-w-xl md:w-1/4 rounded-3xl bg-neutral-white"
  >
    <form
      @submit="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }
      "
      class="p-6"
    >
      <form.Field name="currentPassword">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="currentPassword" text="رمز عبور فعلی" />
            <InputPassword
              name="currentPassword"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
              placeholder="رمز عبور فعلی"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="newPassword">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="newPassword" text="رمز عبور جدید" />
            <InputPassword
              name="newPassword"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
              placeholder="رمز عبور فعلی"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <form.Field name="passwordConfirmation">
        <template v-slot="{ field, state }">
          <InputWrapper>
            <InputLabel name="passwordConfirmation" text="تکرار رمز عبور جدید" />
            <InputPassword
              name="passwordConfirmation"
              :fluid="true"
              :state="state"
              @blur="field.handleBlur"
              :value="field.state.value"
              @input="(e) => field.handleChange(e.target.value)"
              placeholder="رمز عبور فعلی"
            />
          </InputWrapper>
        </template>
      </form.Field>
      <div class="flex flex-col gap-2 md:flex-row">
        <Button
          fluid
          type="submit"
          label="ثبت تغییرات"
          @click="() => form.handleSubmit()"
        />
        <Button
          fluid
          label="انصراف"
          variant="outlined"
          @click="() => props.onCancel()"
        />
      </div>
    </form>
  </VueFinalModal>
</template>
