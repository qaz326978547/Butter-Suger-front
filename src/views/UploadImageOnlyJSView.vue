<template>
  <div class="text-white">
    <h2>直接用 Axios 上傳課程封面</h2>
    <form @submit.prevent="uploadBanner">
      <input type="file" name="banner" ref="bannerInput" />
      <button type="submit">上傳封面</button>
    </form>
    <p v-if="bannerUrl">圖片連結：<a :href="bannerUrl" target="_blank">{{ bannerUrl }}</a></p>
    <img v-if="bannerUrl" :src="bannerUrl" alt="">

    <hr class="my-4" />

    <h2>直接用 Axios 上傳課程教材</h2>
    <form @submit.prevent="uploadMaterials">
      <input type="file" multiple name="materials" ref="materialsInput" />
      <button type="submit">上傳教材</button>
    </form>
    <ul>
      <li v-for="(url, i) in materialsUrls" :key="i">
        <a :href="url" target="_blank">{{ url }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const bannerUrl = ref('')
const materialsUrls = ref<string[]>([])

const bannerInput = ref<HTMLInputElement | null>(null)
const materialsInput = ref<HTMLInputElement | null>(null)

const uploadBanner = async () => {
  const input = bannerInput.value
  if (!input?.files?.length) return alert('請選擇圖片')

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
    bannerUrl.value = response.data?.data.imageUrl
  } catch (err: any) {
    console.error(err)
    alert(err.response?.data?.message || '上傳封面失敗')
  }
}

const uploadMaterials = async () => {
  const input = materialsInput.value
  if (!input?.files?.length) return alert('請選擇教材檔案')

  const formData = new FormData()
  Array.from(input.files).forEach(file => {
    formData.append('materials', file) // 或根據後端要求改成 'materials[]'
  })

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/course/upload-course-materials`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    materialsUrls.value = response.data?.data?.files || []
  } catch (err: any) {
    console.error(err)
    alert(err.response?.data?.message || '上傳教材失敗')
  }
}
</script>
