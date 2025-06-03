<template>
  <div class="text-white">
    <h2>新增課程標題</h2>
    <input type="text" v-model="courseData.course_name" placeholder="請輸入課程標題" />
    <button type="button" @click="handleCourseTitle">新增課程</button>
    <div
      class="text-dark flex min-h-[300px] w-full min-w-[80vw] flex-col items-center bg-white p-5"
    >
      <h1 class="text-red">課程資料</h1>
      <pre>{{ JSON.stringify(courseData, null, 2) }}</pre>
    </div>
    <h2>上傳課程封面</h2>
    <form @submit.prevent="handleBannerUpload">
      <input type="file" @change="handleBannerChange" />
      <button type="submit">上傳封面</button>
    </form>
    <p v-if="bannerUrl">封面圖片連結：</p>
    <img v-if="bannerUrl" :src="bannerUrl" alt="banner" />

    <hr class="my-4" />

    <h2>上傳課程教材</h2>
    <form @submit.prevent="handleMaterialsUpload">
      <input type="file" multiple @change="handleMaterialsChange" />
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
  import type { Course } from '@/apis/interfaces/course'

  const bannerFile = ref<File | null>(null)
  const materialFiles = ref<File[]>([])
  const bannerUrl = ref('')
  const materialsUrls = ref<string[]>([])
  const courseData = ref<Course>({
    teacher_id: '',
    course_name: '',
    category_id: null,
    id: '',
    course_status: '',
    created_at: '',
    updated_at: '',
  })
  const handleBannerChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target?.files?.[0]) bannerFile.value = target.files[0]
  }

  const handleMaterialsChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target?.files) materialFiles.value = Array.from(target.files)
  }

  const handleCourseTitle = async () => {
    const title = courseData.value?.course_name.trim()
    if (!title) return alert('請輸入課程標題')
    const data = await ApiCourse.addCourseTitle(title)
    if (data) {
      courseData.value = data
      alert('課程標題新增成功')
    } else {
      alert('新增課程標題失敗')
    }
  }
  const handleBannerUpload = async () => {
    if (!bannerFile.value) return alert('請選擇圖片')
    const formData = new FormData()
    formData.append('banner', bannerFile.value)
    const data = await ApiCourse.uploadCourseBanner(formData, courseData.value.id)
    if (data?.imageUrl) bannerUrl.value = data.imageUrl
  }

  const handleMaterialsUpload = async () => {
    if (!materialFiles.value.length) return alert('請選擇教材檔案')
    const formData = new FormData()
    materialFiles.value.forEach(file => formData.append('materials', file))
    const data = await ApiCourse.uploadCourseMaterials(formData, courseData.value.id)
    if (data?.files) materialsUrls.value = data.files
  }
</script>
