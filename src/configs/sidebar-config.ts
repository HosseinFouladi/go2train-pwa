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
  external?: boolean
}

export const SidebarConfig: Array<SidebarItem> = [
	{
		label: "حساب کاربری",
		icon: UserIcon,
		route: "/account",
		theme: "default",
	},
	{
		label: "دوره های آموزشی من",
		icon: TeacherIcon,
		route: "/user-courses",
		theme: "default",
	},
	{
		label: "اشتراک ویژه",
		icon: CrownIcon,
		route: "/subscriptions",
		theme: "premium",
	},
	{
		label: "تنظیمات",
		icon: SettingIcon,
		route: "/settings",
		theme: "default",
	},
	{
		label: "ارسال ایمیل به پشتیبانی",
		icon: SmsIcon,
		route: "mailto:support@go2train.co",
		theme: "default",
		external: true,
	},
	{
		label: "گزارش خرابی",
		icon: DangerIcon,
		route: "/crash-report",
		theme: "default",
	},
];
