import axios, {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosHeaderValue
} from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { COOKIE_KEYS } from '@/constants'
import { getUserLocale } from 'get-user-locale'

const CONNECTION_TIMEOUT = 30000

export class ApiClient {
  static DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_STAGE_BASE_URL,
    timeout: CONNECTION_TIMEOUT,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': getUserLocale()
    },
    paramsSerializer: (params) => qs.stringify(params, { indices: false })
  }

  private static axiosInstance: AxiosInstance = axios.create(this.DEFAULT_CONFIG)

  static setToken(token: string): void {
    Cookies.set(COOKIE_KEYS.userToken, token, {
      sameSite: 'strict',
      secure: true
    })
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  static getToken(): AxiosHeaderValue | undefined {
    return this.axiosInstance.defaults.headers.common.Authorization
  }

  static removeToken(): void {
    Cookies.remove(COOKIE_KEYS.userToken)
    delete this.axiosInstance.defaults.headers.common.Authorization
  }

  static version(version: 'v2' | 'v3') {
    const baseURL =
      version === 'v2'
        ? import.meta.env.VITE_API_STAGE_BASE_URL_V2
        : import.meta.env.VITE_API_STAGE_BASE_URL_V3

    return {
      get: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.get<T, R, E>(url, { ...config, baseURL })
      },
      post: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.post<T, R, E>(url, data, { ...config, baseURL })
      },
      postFormData: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.post<T, R, E>(url, data, {
          ...{ ...config, baseURL },
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      },
      put: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.put<T, R, E>(url, data, { ...config, baseURL })
      },
      putFormData: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.put<T, R, E>(url, data, {
          ...{ ...config, baseURL },
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      },
      delete: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.delete<T, R, E>(url, { ...config, baseURL })
      },
      patch: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.patch<T, R, E>(url, data, { ...config, baseURL })
      }
    }
  }
}
