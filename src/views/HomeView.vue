<template>
  <main>
    <div>
      <button @click="redirectToGoogle" class="btn-google">使用 Google 登入</button>
      <button v-if="userStore.isLogin" class="btn-custom bg-emerald text-white" @click="logout">
        登出
      </button>
      <button class="btn-custom bg-emerald text-white" @click="getUserInfo">取得使用者資料</button>
      <button class="btn-custom bg-yellow text-white" @click="checkUser">檢查使用者登入狀態</button>
    </div>
    <div
      class="text-dark flex min-h-[300px] w-full min-w-[80vw] flex-col items-center bg-white p-5"
    >
      <h1 class="text-red">{{ responseTitle }}</h1>
      <pre>{{ JSON.stringify(response, null, 2) }}</pre>
    </div>
  </main>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { ApiAuth } from '@/apis/auth'
  import { useUserStore } from '@/stores/userStore'
  const response = ref()
  const responseTitle = ref('回傳資料')
  const userStore = useUserStore()
  const redirectToGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/users/auth/google`
  }

  const getUserInfo = async () => {
    const res = await ApiAuth.getUserInfo()
    if (res) {
      console.log(res)
      userStore.setUser(res)
      response.value = res
      responseTitle.value = '使用者資料'
      console.log('使用者資料', userStore.user)
    } else {
      console.log('error')
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    alert('登出成功')
    response.value = null
    responseTitle.value = '登出成功'
    userStore.setUser({
      id: '',
      name: '',
      nickname: '',
      email: '',
      phone: '',
      address: '',
      birthday: '',
      profile_image_url: '',
    })
  }

  const checkUser = async () => {
    const res = await ApiAuth.checkUser()
    if (res) {
      console.log(res)
      response.value = res
      responseTitle.value = '使用者登入狀態'
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
