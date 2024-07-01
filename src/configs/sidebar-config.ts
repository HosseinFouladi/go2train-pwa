import {
  TeacherIcon,
  UserIcon,
  CrownIcon,
  SettingIcon,
  SmsIcon,
  DangerIcon
} from '@/components/icons'
import type { Component } from 'vue'

type SidebarItem = {
  label: string
  icon: Component
  route: string
  theme: 'default' | 'premium'
}

export const SidebarConfig: Array<SidebarItem> = [
  {
    label: 'حساب کاربری',
    icon: UserIcon,
    route: '/account',
    theme: 'default'
  },
  {
    label: 'دوره های آموزشی من',
    icon: TeacherIcon,
    route: '/courses',
    theme: 'default'
  },
  {
    label: 'اشتراک ویژه',
    icon: CrownIcon,
    route: '/subscriptions',
    theme: 'premium'
  },
  {
    label: 'تنظیمات',
    icon: SettingIcon,
    route: '/settings',
    theme: 'default'
  },
  {
    label: 'ارسال ایمیل به پشتیبانی',
    icon: SmsIcon,
    route: '/support',
    theme: 'default'
  },
  {
    label: 'گزارش خرابی',
    icon: DangerIcon,
    route: '/crash-report',
    theme: 'default'
  }
]
