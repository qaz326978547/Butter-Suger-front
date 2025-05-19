import { $http, asyncDo, isResponseOK } from '@/utils/https'
import type { ApiResponese } from './interfaces/common'

export namespace ApiCourse {
  // 上傳課程封面
  export async function uploadCourseBanner(formData: FormData) {
    const [err, result] = await asyncDo(
      $http<ApiResponese>('post', 'course/upload-course-banner', formData)
    )
    if (!isResponseOK(err, result, true)) return null
    return result.data
  }

  // 上傳課程教材（支援多檔）
  export async function uploadCourseMaterials(formData: FormData) {
    const [err, result] = await asyncDo(
      $http<ApiResponese>('post', 'course/upload-course-materials', formData)
    )
    if (!isResponseOK(err, result, true)) return null
    return result.data
  }
}



