import { googleTokenLogin } from 'vue3-google-login'

import { ENDPOINTS } from "@/api";
import { ApiClient } from "@/utils";

export type ApiResponseTypeV3<T> = {
	data: T;
	message: Array<Message>;
	meta?:{
		simple_paginate: boolean
		per_page: number
		count: number
		current_page: number
		next_page: any
		prev_page: number
		total: number
		last_page: number
	}
};

export interface Message {
	id: string;
	content: string;
}

export type ExternalAuthResponseType = {
  token: string
  user: User
}

export type User = {
  id: string
  name: string
  email: string
  mobile: string
  score: number
  prefer_language: number
  role: string
}

export const loginWithGoogle = async (cb?: (token: string) => void) => {
  googleTokenLogin({
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
  })
    .then((response) => {
      const { access_token } = response
      // provider value -> google: 1, apple: 2
      ApiClient.post<ApiResponseTypeV3<ExternalAuthResponseType>>(
        ENDPOINTS.Auth.External,
        {
          token: access_token,
          provider: 1
        }
      ).then((response) => cb && typeof cb === 'function' && cb(response.data.token))
    })
    .catch((err) => console.warn(err.message))
}

export const loginWithApple = async () => {
  // @ts-ignore
  await window.AppleID.auth.signIn()
}
