import { $http, isResponseOK, asyncDo } from '@/untils/https'
import type { UserProfile } from './interfaces/auth'
import type { ApiResponese } from './interfaces/common'
/* eslint-disable @typescript-eslint/no-namespace */

export namespace ApiAuth {
  export async function getUserInfo() {
    const [err, result] = await asyncDo($http<{ data: UserProfile }>('get', 'users/info'))
    if (!isResponseOK(err, result, true)) return null
    return result?.data
  }

  export async function checkUser() {
    const [err, result] = await asyncDo($http<ApiResponese>('get', 'users/check'))
    if (!isResponseOK(err, result, true)) return null
    return result
  }
}
