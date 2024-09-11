<script setup lang="ts">
import type { CourseSection } from '@/queries/course-sections/types'
import { CustomPlayer } from '@/views/profile/courses/components'

type PropType = {
  courseSections: Array<CourseSection>
}

const props = defineProps<PropType>()
</script>

<template>
  <Accordion multiple :value="[0]" class="p-4 accordion">
    <AccordionPanel
      v-for="(session, index) in props.courseSections"
      :key="session.id"
      :value="index"
    >
      <AccordionHeader>
        <div class="flex flex-row w-full gap-3 px-4 py-1 shadow_list-item">
          <span class="font-demi-bold text-secondary-900 text-st-one">
            {{ String(session.title).toPersianDigits() }}
          </span>
          <span
            v-if="session.examPassed"
            class="flex px-2 py-0.5 gap-1 items-center justify-center bg-success-50 rounded-full"
          >
            <span class="flex items-center justify-center">
              <TickCircle class="text-[14px] text-success-800" />
            </span>
            <span class="text-cp text-success-800">قبول شده</span>
          </span>
          <p
            v-if="session.examMark"
            class="underline underline-offset-4 decoration-2 decoration-success-500 text-success-800"
          >
            نمره: {{ String(session.examMark).toPersianDigits() }}
          </p>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <div class="flex flex-col gap-4">
          <div class="w-full h-[1px] bg-secondary-100"></div>
          <CustomPlayer
            :access_list="[
              {
                id: 0,
                title: 'p240',
                description: '',
                image: '',
                slug: 'has p240 access'
              },
              { id: 1, title: 'p360', description: '', image: '', slug: '' },
              { id: 2, title: 'p720', description: '', image: '', slug: '' },
              { id: 3, title: 'p1080', description: '', image: '', slug: '' }
            ]"
            :stream="session?.stream"
          />
          <div
            @click="() => console.log('')"
            class="flex items-center justify-center gap-1 p-2 cursor-pointer w-fit"
          >
            <span class="">گزارش</span>
            <FlagIcon class="text-[16px]" />
          </div>
          <div class="w-full h-[1px] bg-secondary-100"></div>
          <Accordion value="0">
            <AccordionPanel value="0">
              <AccordionHeader>
                <span class="text-sm-st-two font-demi-bold">آیتم های دوره</span>
              </AccordionHeader>
              <AccordionContent>
                <div class="flex flex-col gap-4">
                  <div class="flex flex-wrap justify-center gap-3">
                    <a
                      :href="session?.reading.url"
                      target="_blank"
                      class="md:w-full"
                    >
                      <Button
                        fluid
                        size="sm"
                        class="w-[120px] px-0 py-0 text-st-two md:w-full"
                        label="جزوه"
                        variant="outlined"
                      />
                    </a>
                    <a
                      :href="session?.grammar.url"
                      target="_blank"
                      class="md:w-full"
                    >
                      <Button
                        fluid
                        size="sm"
                        class="w-[120px] px-0 py-0 text-st-two md:w-full"
                        label="گرامر"
                        variant="outlined"
                      />
                    </a>
                    <a :href="session?.words.url" target="_blank" class="md:w-full">
                      <Button
                        fluid
                        size="sm"
                        class="w-[120px] px-0 py-0 text-st-two md:w-full"
                        label="واژگان"
                        variant="outlined"
                      />
                    </a>
                  </div>
                  <Divider />
                  <div class="grid grid-cols-2 gap-3">
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="کارت واژه"
                      variant="outlined"
                      @click="() => console.log('get words')"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="ویدیو کوتاه"
                      variant="outlined"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="کارت های شنیدنی"
                      variant="outlined"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="کارت های خواندنی"
                      variant="outlined"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="جلسه کلاسی"
                      variant="outlined"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="جلسه گروهی"
                      variant="outlined"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="آزمون"
                      variant="outlined"
                    />
                    <Button
                      fluid
                      disabled
                      class="px-0 py-0 text-st-two"
                      label="حرف زدن با دیلان"
                      variant="outlined"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>

          <Accordion value="0">
            <AccordionPanel value="0">
              <AccordionHeader>
                <span class="text-sm-st-two font-demi-bold">محتوای درس</span>
              </AccordionHeader>
              <AccordionContent>
                <p class="p-4 leading-loose text-text-500 text-st-two">
                  {{ session?.description }}
                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>



<style scoped></style>
