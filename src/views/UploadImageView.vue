<template>
  <div class="text-white">
    <h2>上傳課程封面</h2>
    <form @submit.prevent="handleBannerUpload">
      <input type="file" @change="e => bannerFile = e.target.files[0]" />
      <button type="submit">上傳封面</button>
    </form>
    <p v-if="bannerUrl">封面圖片連結：</p>
    <img v-if="bannerUrl" :src=" bannerUrl" alt="">

    <hr class="my-4" />

    <h2>上傳課程教材</h2>
    <form @submit.prevent="handleMaterialsUpload">
      <input type="file" multiple @change="e => materialFiles = Array.from(e.target.files)" />
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
import { ApiCourse } from '@/apis/course'

const bannerFile = ref<File | null>(null)
const materialFiles = ref<File[]>([])

const bannerUrl = ref('')
const materialsUrls = ref<string[]>([])

const handleBannerUpload = async () => {
  if (!bannerFile.value) return alert('請選擇圖片')
  const formData = new FormData()
  formData.append('banner', bannerFile.value)
  const data = await ApiCourse.uploadCourseBanner(formData)
  if (data?.imageUrl) bannerUrl.value = data.imageUrl
}

const handleMaterialsUpload = async () => {
  if (!materialFiles.value.length) return alert('請選擇教材檔案')
  const formData = new FormData()
  materialFiles.value.forEach(file => formData.append('materials', file))
  const data = await ApiCourse.uploadCourseMaterials(formData)
  if (data?.files) materialsUrls.value = data.files
}
</script>
