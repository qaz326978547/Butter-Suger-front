// import { ApiResponese } from './common'
export interface UserProfile {
  id: string
  name: string
  nickname: string
  email: string
  profile_image_url: string
  phone?: string // 選填
  birthday?: Date | string // 選填，
  sex?: 'male' | 'female' // 選填，限定字串
  address?: string // 選填
}

// export interface UserInfo extends ApiResponese {
//   data: UserProfile
// }
export interface UpdateUser {
  name: string // 必填
  nickname?: string // 選填
  email: string // 必填
  phone?: string // 選填
  birthday?: string // 選填
  sex?: 'male' | 'female' // 選填，限定字串
  address?: string // 選填
  profile_image_url?: string | null // 選填
}
