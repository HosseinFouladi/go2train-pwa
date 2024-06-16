export const loginQueryKeys = Object.freeze({
  default: ['login'],
  login: (params: { username: string; password: string }) => [
    ...loginQueryKeys.default,
    params
  ]
})
