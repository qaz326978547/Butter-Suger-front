<template>
  <router-link to="/" class="mb-4 text-blue-500">回首頁</router-link>
  <div class="flex flex-col items-center justify-center">
    <h1 class="mb-4 text-2xl font-bold">更新使用者資料</h1>
    <div class="text-red flex w-full max-w-md flex-col rounded bg-white p-4 shadow">
      <label for="name" class="mb-2">姓名</label>
      <input
        type="text"
        id="name"
        v-model="userInput.name"
        class="mb-4 rounded border p-2 text-black"
      />

      <label for="email" class="mb-2">電子郵件</label>
      <input
        type="email"
        id="email"
        v-model="userInput.email"
        class="mb-4 rounded border p-2 text-black"
        disabled
      />

      <label for="phone" class="mb-2">電話</label>
      <input
        type="tel"
        id="phone"
        v-model="userInput.phone"
        class="mb-4 rounded border p-2 text-black"
      />

      <label for="address" class="mb-2">地址</label>
      <input
        type="text"
        id="address"
        v-model="userInput.address"
        class="mb-4 rounded border p-2 text-black"
      />
      <label for="birthday" class="mb-2">生日</label>
      <input
        type="date"
        id="birthday"
        v-model="userInput.birthday"
        class="mb-4 rounded border p-2 text-black"
      />
      <label for="profile_image_url" class="mb-2">頭像網址</label>
      <input
        type="text"
        id="profile_image_url"
        v-model="userInput.profile_image_url"
        class="mb-4 rounded border p-2 text-black"
      />
    </div>
    <button class="block px-4 py-2" @click="updateUserData(userInput)">更新使用者資料</button>
    <div
      class="text-dark flex min-h-[300px] w-full min-w-[80vw] flex-col items-center bg-white p-5"
    >
      <h1 class="text-red">使用者資料</h1>
      <pre>{{ JSON.stringify(userData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { ApiAuth } from '@/apis/auth'
  import { useUserStore } from '@/stores/userStore'
  import type { UpdateUser } from '@/apis/interfaces/auth'

  const userStore = useUserStore()
  const userData = ref()
  const userInput = ref<UpdateUser>({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    address: '',
    birthday: '', // 注意這裡是 Date
    profile_image_url: '',
  })

  const getUserInfo = async () => {
    const res = await ApiAuth.getUserInfo()
    if (res) {
      userData.value = res
      userInput.value = {
        name: res.name,
        nickname: res.nickname,
        email: res.email,
        phone: res.phone,
        address: res.address,
        birthday: res.birthday
          ? new Date(res.birthday).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        profile_image_url: res.profile_image_url,
      }
    }
  }
  const updateUserData = async (data: UpdateUser) => {
    const res = await ApiAuth.updateUserData(data)
    if (res) {
      console.log('更新使用者資料', res)
      alert(res.message)
      getUserInfo()
    } else {
      console.log('更新失敗')
    }
  }

  onMounted(async () => {
    if (userStore.isLogin) {
      getUserInfo()
    }
  })
</script>
