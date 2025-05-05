// utils/http.ts
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios' // 使用 type 匯入

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' // 定義 HTTP 方法類型
const apiUrl = import.meta.env.VITE_API_BACKEND_URL // 從環境變數獲取 API 基礎 URL
export const apiBaseUrl = `${apiUrl}/api/v1`
const apiTimeoutSec = 10 // 設定 API 超時時間（秒）

const ajax = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // 是否攜帶 Cookie
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: apiTimeoutSec * 1000,
})

/**
 * 🔐 全局攔截器設定
 */
ajax.interceptors.request.use(config => {
  const token = localStorage.getItem('token') // 從 localStorage 獲取 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // 設定 Bearer Token
  }
  return config
})

export async function $http<T = any>(method: Method, url: string, ...payload: any[]): Promise<T> {
  const requestData: AxiosRequestConfig = { url, method }

  if (method.toLowerCase() === 'get') {
    requestData.params = payload[0]
  } else {
    requestData.data = payload[0]
    requestData.params = payload[1]
  }

  try {
    const response = await ajax.request<T>(requestData)
    return response.data
  } catch (err: any) {
    if (err.response) {
      throw err.response
    }
    throw err
  }
}

/**
 * 🧪 判斷是否請求成功
 */
export function isResponseOK(err: any, result: any, alertError: boolean = false) {
  if (err && !result) {
    console.warn(err, result)
    if (err.status === 401) {
      alert(err.data.message)
      return false
    }
    if (alertError) {
      const errData = err.data
      let message = ''
      if (typeof errData === 'string') {
        message = errData
      } else {
        message = errData.message
        try {
          alert(JSON.stringify(errData))
        } catch (err) {
          console.error(err)
        }
      }
      alert(message)
    }
    return false
  }
  return true
}

/**
 * 📦 async/await Promise 錯誤包裝
 */
export function asyncDo<T, E = any>(promise: Promise<T>): Promise<[undefined, T] | [E, undefined]> {
  return promise.then<[undefined, T]>(res => [undefined, res]).catch(err => [err, undefined])
}
