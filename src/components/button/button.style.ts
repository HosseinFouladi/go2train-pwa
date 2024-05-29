import type { ClassValue } from 'clsx'
import type { ButtonProps } from './button'

export type ButtonTheme = Record<
  Required<ButtonProps>['variant'],
  Record<Required<ButtonProps>['mode'], ClassValue>
>

export const buttonTheme: ButtonTheme = {
  filled: {
    danger: 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700 ',
    primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700',
    success: 'bg-success-500 hover:bg-success-600 active:bg-success-700',
    disabled: 'bg-secondary-200 text-neutral-white'
  },
  outlined: {
    danger:
      'bg-neutral-white text-danger-500 hover:bg-danger-50 active:bg-danger-100 border border-danger-500',
    primary:
      'bg-neutral-white text-primary-500 hover:bg-primary-50 active:bg-primary-100 border border-primary-500',
    success:
      'bg-neutral-white text-success-500 hover:bg-success-50 active:bg-success-100 border border-success-500',
    disabled: 'bg-neutral-white text-secondary-200 border border-secondary-200'
  },
  text: {
    danger:
      'bg-tranparent text-danger-500 hover:bg-danger-50 active:bg-danger-100 shadow-none',
    primary:
      'bg-transparent text-primary-500 hover:bg-primary-50 hover:shadow-md active:bg-primary-100 active:shadow-lg shadow-none',
    success:
      'bg-transparent text-success-500 hover:bg-success-50 hover:shadow-md active:bg-success-100 active:shadow-lg shadow-none',
    disabled: 'bg-transparent text-secondary-200 shadow-none'
  }
}
