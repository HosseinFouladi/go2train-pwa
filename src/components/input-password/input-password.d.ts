import type { FieldApi } from '@tanstack/vue-form'

export type InputPasswordProps = {
  state: FieldApi<any, any, any, any>['state']
  messages?: Array<string>
  toggle?: boolean
}
