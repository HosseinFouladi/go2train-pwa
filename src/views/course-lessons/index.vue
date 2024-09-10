<script lang="ts" setup>
import { computed } from 'vue'
import { first } from 'lodash'
import { FlagIcon, ArrowRight } from '@/components/icons'
import {
  CourseStatus,
  LessonsList,
  LessonTabs
} from '@/views/course-lessons/components'
import { useCourseSectionsQuery } from '@/queries'
import { useRoute } from 'vue-router'
import { CustomPlayer } from '../profile/courses/components'

const route = useRoute()

const {
  data: courseSections,
  isFetching,
  isPending
} = useCourseSectionsQuery(String(route.params.courseId))

const section = computed(() => {
  return (
    first(
      courseSections.value?.data.filter((item) => item.id == route.query.section_id)
    ) || courseSections.value?.data[0] //if not exist section id in query params it takes first section
  )
})
</script>

<template>
  <div class="flex-col-reverse hidden lg:flex bg-background-default">
    <div class="w-full flex flex-row pt-6 h-full max-w-[1128px] mx-auto gap-6">
      <div class="min-w-[360px] card min-h-56 space-y-6">
        <CourseStatus />
        <LessonsList />
      </div>
      <div class="w-full p-6 card">
        <div class="space-y-3">
          <h2 v-if="section" class="text-h5 font-demi-bold text-text-500">
            {{ section.title }}
          </h2>
          <div
            class="w-full border-2 bg-secondary-50 h-96 rounded-2xl border-secondary-400"
          >
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
              :stream="section?.stream"
            />
          </div>
          <div data-title="lesson_action">
            <div
              @click="() => console.log('')"
              class="flex items-center justify-center gap-1 p-2 cursor-pointer w-fit"
            >
              <span class="">گزارش</span>
              <FlagIcon class="text-[16px]" />
            </div>
          </div>
        </div>
        <LessonTabs />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 p-4 lg:hidden mobile-box">
    <div class="flex justify-between">
      <ArrowRight />
      <h3 class="text-text-400 font-demi-bold text-sm-st-one md:text-h6">لیست دروس</h3>
      <div class=""></div>
    </div>
    <CourseStatus />
    <h1 class="text-h5 text-text-500 font-demi-bold">درسهای دوره</h1>
    <Accordion multiple :value="[0]" v-if="!isFetching && !isPending" class="p-4 accordion">
      <AccordionPanel
        v-for="(session, index) in courseSections?.data"
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
                      <a :href="session?.reading.url" target="_blank" class="md:w-full">
                        <Button
                          fluid
                          size="sm"
                          class="w-[140px] px-0 py-0 text-st-two md:w-full "
                          label="جزوه"
                          variant="outlined"
                        />
                      </a>
                      <a :href="session?.grammar.url" target="_blank"  class="md:w-full">
                        <Button
                          fluid
                          size="sm"
                          class="w-[140px] px-0 py-0 text-st-two md:w-full"
                          label="گرامر"
                          variant="outlined"
                        />
                      </a>
                      <a :href="session?.words.url" target="_blank" class="md:w-full">
                        <Button
                          fluid
                          size="sm"
                          class="w-[140px] px-0 py-0 text-st-two md:w-full"
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
  </div>
</template>


<!-- course/section/{courseId} [*] -->
<!-- user/profile [ * ] -->
<!-- user/cups [ * ] -->
<!-- profile/statistics [ * ] -->
