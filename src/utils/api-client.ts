import axios, {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig
} from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { COOKIE_KEYS } from '@/constants'
import { getUserLocale } from 'get-user-locale'

const CONNECTION_TIMEOUT = 30000

abstract class Base {
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

  protected static instance: AxiosInstance = axios.create(this.DEFAULT_CONFIG)

  static setToken(token: string): void {
    Cookies.set(COOKIE_KEYS.userToken, token, {
      sameSite: 'strict',
      secure: true
    })
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  static removeToken(): void {
    Cookies.remove(COOKIE_KEYS.userToken)
    delete this.instance.defaults.headers.common.Authorization
  }
}

export class ApiClient extends Base {
  private static axiosInstance: AxiosInstance = axios.create(Base.DEFAULT_CONFIG)

  static version(version: 'v2' | 'v3') {
    const baseURL =
      version === 'v2'
        ? import.meta.env.VITE_API_STAGE_BASE_URL_V2
        : import.meta.env.VITE_API_STAGE_BASE_URL_V3
    this.axiosInstance = axios.create({ ...Base.DEFAULT_CONFIG, baseURL })

    return {
      get: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.get<T, R, E>(url, config)
      },
      post: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.post<T, R, E>(url, data, config)
      },
      postFormData: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.post<T, R, E>(url, data, {
          ...config,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      },
      put: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.put<T, R, E>(url, data, config)
      },
      putFormData: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.put<T, R, E>(url, data, {
          ...config,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      },
      delete: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.delete<T, R, E>(url, config)
      },
      patch: <T = void, R = AxiosResponse<T>, E = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
      ) => {
        return this.axiosInstance.patch<T, R, E>(url, data, config)
      }
    }
  }
}
