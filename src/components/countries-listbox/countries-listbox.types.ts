import type { Component } from 'vue'
import type { FieldApi } from '@tanstack/vue-form'

export type CountriesListboxProps = {
  state: FieldApi<any, any, any, any>['state']
  iconRight?: Component
  fluid?: boolean
  options: Array<Record<string, string>>
  isLoading: boolean
  optionLabel: string
  optionIcon?: string
  value: unknown
  disabled: boolean
}
