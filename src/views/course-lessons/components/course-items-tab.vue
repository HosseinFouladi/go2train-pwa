<script lang="ts" setup>
import { Button, Divider } from '@/components'
</script>

<template>
  <div data="course_tab_0" class="space-y-4">
    <div class="flex gap-3">
      <Button
        fluid
        size="sm"
        label="جزوه"
        variant="outlined"
        @click="() => console.log('get essays')"
      />
      <Button
        fluid
        size="sm"
        label="گرامر"
        variant="outlined"
        @click="() => console.log('get grammer')"
      />
      <Button
        fluid
        size="sm"
        label="واژگان"
        variant="outlined"
        @click="() => console.log('get words')"
      />
    </div>
    <Divider />
    <div class="grid grid-cols-2 gap-3">
      <Button
        fluid
        disabled
        size="sm"
        label="کارت واژه"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="ویدیو کوتاه"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="کارت های شنیدنی"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="کارت های خواندنی"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="جلسه کلاسی"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="جلسه گروهی"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="آزمون"
        variant="outlined"
        @click="() => console.log('get words')"
      />
      <Button
        fluid
        disabled
        size="sm"
        label="حرف زدن با دیلان"
        variant="outlined"
        @click="() => console.log('get words')"
      />
    </div>
  </div>
</template>
