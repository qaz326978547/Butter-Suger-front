import type { ApiResponese } from './common'
export interface UploadImage {
  imageUrl: string // 圖片網址
}

export interface ApiUploadImage extends ApiResponese {
  data: UploadImage
}

export interface ApiUploadFile extends ApiResponese {
  data: UploadFile
}

export interface ApiAddCourseTitle extends ApiResponese {
  data: {
    course: Course // 新增的課程資訊
  }
}
export interface Course {
  teacher_id: string // 教師ID
  course_name: string // 課程名稱
  category_id: string | null // 分類ID
  id: string // 課程ID
  course_status: string // 課程狀態
  created_at: string // 創建時間
  updated_at: string // 更新時間
}

export interface UploadFile {
  files: string[] // 檔案網址
}
