import type { Component } from 'vue'

export type DropdownProps = {
  placeHolder: string
  fluid?: boolean
  iconRight?: Component
  optionIconRight?: Component
  optionIconLeft?: Component
  options: Array<Options>,
  isLoading:boolean
}

type Options = { id: number; name: string; unavailable: boolean }
