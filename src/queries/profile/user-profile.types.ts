export type UserProfileApiResponseType = {
	user: User;
	active_course: unknown;
	leaderboard_rank: LeaderboardRank;
	roadmap_statistics: RoadmapStatistics;
	notifications_count: number;
	all_courses: AllCourses;
};

export type User = {
	id: number;
	name: string;
	email: string;
	mobile: string;
	username: string;
	avatar: string;
	score: number;
	prefer_language: number;
	is_register_complete: boolean;
	invite_code: string;
	role: string;
	followings_count: number;
	followers_count: number;
	location: string;
	is_whitelist: boolean;
	living_country: unknown;
	birth_country: unknown;
	immigration_country: unknown;
	bio: unknown;
	login_method: string;
};

export type LeaderboardRank = {
	total: number;
	your_rank: number;
};

export type RoadmapStatistics = {
	total: number;
	complete: number;
};

export type AllCourses = {
	active_courses: Array<ActiveCourse>;
	finished_courses: Array<unknown>;
	archived_courses: Array<unknown>;
};

export type ActiveCourse = {
	id: number;
	title: string;
	poster: string;
	full_poster: string;
	short_description: unknown;
	price: number;
	old_price: number;
	score: number;
	teacher: Teacher;
	language: Language;
	to_language: ToLanguage;
	level: Level;
	bought: boolean;
	section_total_hours: number;
	is_active: number;
	users_count: number;
	sections_count: number;
	sections_pass_count: number;
	unfinished_sections_count: number;
	date_of_release: unknown;
	date_of_release_jalali: unknown;
};

export type Teacher = {
	id: number;
	title: string;
	name: unknown;
	avatar: string;
	bio: unknown;
	score: unknown;
	intro_video: IntroVideo;
	users_count: number;
};

export type IntroVideo = Record<string, unknown>;

export type Language = {
	id: number;
	name: string;
	image: string;
	fa_name: string;
	rtl: unknown;
	show: boolean;
};

export type ToLanguage = {
	id: number;
	name: string;
	image: string;
	fa_name: string;
	rtl: unknown;
	show: boolean;
};

export type Level = {
	id: number;
	title: string;
	priority: number;
};

export type UpdateUserProfileParams = {
	username: string;
	name: string;
	living_country: number;
	birth_country: number;
	immigration_country: number;
	bio: string;
	avatar?: File;
	avatar_id: number;
};