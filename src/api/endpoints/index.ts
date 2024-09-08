import { AuthEndpoints } from './auth'
import { ProfileEndpoints } from './profile'
import { PlansEndpoints } from './plans'
import { BugReport } from './reports'
import { AppSettingsEndpoints } from './app-settings'
import { CountryEndpoints } from './countries'
import { AvatarsEndpoints } from './avatars'
import { CourseEndpoints } from './courses'
import { CommentsEndPoint } from './comment'
import { LanguageEndpoints } from './languages'
import { PaymentEndpoints } from './payment'
import { UserEndpoints } from './user'

export const ENDPOINTS = {
	Auth: AuthEndpoints,
	Profile: ProfileEndpoints,
	Plans: PlansEndpoints,
	BugReport,
	Settings: AppSettingsEndpoints,
	Country: CountryEndpoints,
	Avatars:AvatarsEndpoints,
	Course:CourseEndpoints,
	comments:CommentsEndPoint,
	Payment: PaymentEndpoints,
  Languages: LanguageEndpoints,
  User: UserEndpoints,
  Courses: CourseEndpoints,

};

