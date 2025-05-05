import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserProfile } from '@/apis/interfaces/auth'
export const useUserStore = defineStore('user', () => {
  const user = ref<UserProfile>()
  const isLogin = computed(() => {
    if (localStorage.getItem('token')) {
      return true
    }
    return false
  })
  const setUser = (userInfo: UserProfile) => {
    user.value = userInfo
  }

  return {
    user,
    isLogin,
    setUser,
  }
})
