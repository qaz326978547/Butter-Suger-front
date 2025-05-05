<template>
  <main>
    <div class="flex">
      <router-link to="/">首頁</router-link>
    </div>

    <button @click="redirectToGoogle" class="btn-google">使用 Google 登入</button>
    <button class="btn-custom bg-emerald text-white" @click="getUserInfo">取得使用者資料</button>
    <button class="btn-custom bg-yellow text-white" @click="checkUser">檢查使用者登入狀態</button>
  </main>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue'
  import { ApiAuth } from '@/apis/auth'
  import { useUserStore } from '@/stores/userStore'

  const userStore = useUserStore()
  const redirectToGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/users/auth/google`
  }

  const getUserInfo = async () => {
    const res = await ApiAuth.getUserInfo()
    if (res) {
      console.log(res)
      userStore.setUser(res)
      console.log('使用者資料', userStore.user)
    } else {
      console.log('error')
    }
  }

  const checkUser = async () => {
    const res = await ApiAuth.checkUser()
    if (res) {
      console.log(res)
    } else {
      console.log('未登入')
    }
  }

  onMounted(async () => {
    if (userStore.isLogin) {
      console.log('已登入')
      getUserInfo()
      console.log('使用者資料', userStore.user)
    } else {
      console.log('未登入')
    }
  })
</script>
