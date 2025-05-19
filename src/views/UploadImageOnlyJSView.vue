<template>
  <div class="text-white">
    <h2>直接用 Axios 上傳課程封面</h2>
    <form @submit.prevent="uploadBanner">
      <input type="file" name="banner" ref="bannerInput" />
      <button type="submit">上傳封面</button>
    </form>
    <p v-if="bannerUrl">圖片連結：<a :href="bannerUrl" target="_blank">{{ bannerUrl }}</a></p>
    <img v-if="bannerUrl" :src="bannerUrl" alt="">
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const bannerUrl = ref('')
const bannerInput = ref<HTMLInputElement | null>(null)

const uploadBanner = async () => {
  const input = bannerInput.value
  if (!input?.files?.length) {
    alert('請選擇圖片')
    return
  }

  const formData = new FormData()
  formData.append('banner', input.files[0])

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/course/upload-course-banner`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
      console.log('response', response);

    bannerUrl.value = response.data?.data.imageUrl
  } catch (err: any) {
    console.error(err)
    alert(err.response?.data?.message || '上傳失敗')
  }
}
</script>
