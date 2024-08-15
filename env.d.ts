/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_STAGE_BASE_URL: string;
	readonly VITE_API_RELEASE_BASE_URL: string;
	readonly VITE_API_PRODUCTION_BASE_URL: string;
	readonly VITE_GOOGLE_CLIENT_ID: string;
	readonly VITE_APPLE_CLIENT_ID: string;
	readonly VITE_API_STAGE_BASE_URL_V3: string;
	readonly VITE_APPLE_CLIENT_REDIRECT_URI: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
