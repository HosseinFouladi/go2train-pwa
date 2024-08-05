import { AuthEndpoints } from './auth'
import { ProfileEndpoints } from './profile'
import { PlansEndpoints } from './plans'
import { BugReport } from './reports'
import { AppSettingsEndpoints } from './app-settings'
import { CountryEndpoints } from "./countries";
import { AvatarsEndpoints } from './avatars'

export const ENDPOINTS = {
	Auth: AuthEndpoints,
	Profile: ProfileEndpoints,
	Plans: PlansEndpoints,
	BugReport,
	Settings: AppSettingsEndpoints,
	Country: CountryEndpoints,
	Avatars:AvatarsEndpoints
};
