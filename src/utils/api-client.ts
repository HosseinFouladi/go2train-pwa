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
  protected static DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
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

export abstract class ApiClient extends Base {
  static get<T = void, Error = void, Data = unknown>(
    url: string,
    config?: AxiosRequestConfig<Data>
  ) {
    return this.send<T, Error>(url, { ...config, method: 'get' })
  }

  static async post<T = void, Error = void, Data = unknown>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) {
    return await this.send<T, Error>(url, { ...config, method: 'post', data })
  }

  
  static async postFormData<T = void, Error = void, Data = unknown>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) {
    return await this.send<T, Error>(url, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'post',
      data
    })
  }

  static put<T = void, Error = void, Data = unknown>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) {
    return this.send<T, Error>(url, { ...config, method: 'put', data })
  }

  static putFormData<T = void, Error = void, Data = unknown>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) {
    return this.send<T, Error>(url, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'put',
      data
    })
  }

  static putVideoStream<T = void, Error = void, Data = unknown>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) {
    return this.send<T, Error>(url, {
      ...config,
      headers: {
        'Content-Type': 'binary/octet-stream',
        Authorization: undefined,
        Accept: '*/*'
      },
      method: 'put',
      timeout: 900000,
      data,
      baseURL: ''
    })
  }

  static delete<T = void, Error = void>(url: string, config?: AxiosRequestConfig) {
    return this.send<T, Error>(url, { ...config, method: 'delete' })
  }

  static patch<T = void, Error = void, Data = unknown>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) {
    return this.send<T, Error>(url, { ...config, method: 'patch', data })
  }

  private static async send<T = void, Error = void>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    const token = Cookies.get(COOKIE_KEYS.userToken)

    if (token)
      ApiClient.instance.defaults.headers.common.Authorization = `Bearer ${token}`

    const conf = { ...this.DEFAULT_CONFIG, ...config }
    const response = await ApiClient.instance.request<T, AxiosResponse<T>, Error>({
      ...conf,
      url
    })
    return response.data
  }
}
