<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { VueFinalModal } from 'vue-final-modal'
import { Button, InputText } from '@/components'

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
    content-class="flex flex-col items-center max-w-xl gap-8 p-4 mx-4 space-y-2 rounded-lg w-96 bg-neutral-white dark:bg-secondary-900 dark:border-secondary-700"
  >
    <form
      @submit="
        (e) => {
          e.preventDefault()
          form.handleSubmit()
        }
      "
    >
      <form.Field name="currentPassword">
        <template v-slot="{ field, state }">
          <InputText
            :fluid="true"
            :state="state"
            @blur="field.handleBlur"
            :value="field.state.value"
            @input="(e) => field.handleChange(e.target.value)"
            placeholder="رمز عبور فعلی"
          />
        </template>
      </form.Field>
      <form.Field name="newPassword">
        <template v-slot="{ field, state }">
          <InputText
            :fluid="true"
            :state="state"
            @blur="field.handleBlur"
            :value="field.state.value"
            @input="(e) => field.handleChange(e.target.value)"
            placeholder="رمز عبور فعلی"
          />
        </template>
      </form.Field>
      <form.Field name="passwordConfirmation">
        <template v-slot="{ field, state }">
          <InputText
            :fluid="true"
            :state="state"
            @blur="field.handleBlur"
            :value="field.state.value"
            @input="(e) => field.handleChange(e.target.value)"
            placeholder="رمز عبور فعلی"
          />
        </template>
      </form.Field>
    </form>
    <InputText />
    <InputText />
    <Button size="sm" label="ثبت تغییرات" />
  </VueFinalModal>
</template>
