import type { Component } from 'vue'

export type ButtonProps = {
  label: string
  fluid?: boolean
  isLoading?: boolean
  size?: 'lg' | 'md' | 'sm' | 'xs'
  mode?: 'danger' | 'success' | 'primary' | 'disabled' | 'secondary'
  variant?: 'filled' | 'outlined' | 'text'
  iconRight?: Component
  iconLeft?: Component
  disabled?: boolean
}
