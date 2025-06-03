import { $http, asyncDo, isResponseOK } from '@/utils/https'
import type { ApiUploadFile, ApiUploadImage, ApiAddCourseTitle } from './interfaces/course'
export namespace ApiCourse {
  export async function addCourseTitle(courseName: string) {
    const [err, result] = await asyncDo(
      $http<ApiAddCourseTitle>('post', `courses/create/title`, { course_name: courseName })
    )
    if (!isResponseOK(err, result, true)) return null

    return result?.data.course
  }
  // 上傳課程封面
  export async function uploadCourseBanner(formData: FormData, courseId: string) {
    const [err, result] = await asyncDo(
      $http<ApiUploadImage>('post', `courses/${courseId}/upload/course-banner-image`, formData)
    )
    if (!isResponseOK(err, result, true)) return null

    return result?.data
  }

  //localhost:8080/api/v1/courses/5a9f94ec-980b-4eb9-af86-05e382d17416/upload/course-banner-image

  // 上傳課程教材（支援多檔）
  export async function uploadCourseMaterials(formData: FormData, courseId: string) {
    const [err, result] = await asyncDo(
      $http<ApiUploadFile>('post', `courses/${courseId}/upload/course-materials`, formData)
    )
    if (!isResponseOK(err, result, true)) return null
    return result?.data
  }
}
