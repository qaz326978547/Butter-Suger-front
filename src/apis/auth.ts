import { $http, isResponseOK, asyncDo } from '@/utils/https'
import type { UserProfile, UpdateUser } from './interfaces/auth'
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

  export async function updateUserData(data: UpdateUser) {
    const [err, result] = await asyncDo($http<ApiResponese>('patch', 'users/update', data))
    if (!isResponseOK(err, result, true)) return null
    return result
  }
}
