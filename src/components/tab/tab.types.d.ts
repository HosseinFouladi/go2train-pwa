import type { Component } from 'vue'

export type Tab = {
  title: string
  component: Component
}

export type TabProps = {
  tabs: Array<Tab>
}
