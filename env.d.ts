/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_STAGE_BASE_URL: string
  readonly VITE_API_RELEASE_BASE_URL: string
  readonly VITE_API_PRODUCTION_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
