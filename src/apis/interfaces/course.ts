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

export interface UploadFile {
  files: string[] // 檔案網址
}
