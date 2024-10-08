import type { Component } from 'vue'
import type { ClassValue } from 'clsx'

export type ButtonProps = {
  label: string | Component
  fluid?: boolean
  isLoading?: boolean
  size?: 'lg' | 'md' | 'sm' | 'xs'
  mode?: 'danger' | 'success' | 'primary' | 'disabled' | 'secondary'|'accent'
  variant?: 'filled' | 'outlined' | 'text'
  iconRight?: Component
  iconLeft?: Component
  disabled?: boolean
}

export type ButtonTheme = Record<
  Required<ButtonProps>['variant'],
  Record<Required<ButtonProps>['mode'], ClassValue>
>
