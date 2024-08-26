import { AuthEndpoints } from './auth'
import { ProfileEndpoints } from './profile'
import { PlansEndpoints } from './plans'
import { BugReport } from './reports'
import { AppSettingsEndpoints } from './app-settings'
import { CountryEndpoints } from './countries'
import { AvatarsEndpoints } from './avatars'
import { PaymentEndpoints } from './payment'
import { CourseEndpoints } from './courses'
import { LanguageEndpoints } from './languages'

export const ENDPOINTS = {
  Auth: AuthEndpoints,
  Profile: ProfileEndpoints,
  Plans: PlansEndpoints,
  BugReport,
  Settings: AppSettingsEndpoints,
  Country: CountryEndpoints,
  Avatars: AvatarsEndpoints,
  Payment: PaymentEndpoints,
  Course: CourseEndpoints,
  Languages: LanguageEndpoints
}
