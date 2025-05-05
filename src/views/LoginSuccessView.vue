<template>
  <main>
    <h1 class="text-white">登入成功</h1>
    <p class="text-white">請稍後...</p>
  </main>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const token = route.query.token as string
  const userId = route.query.id as string

  if (token) {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    console.log('登入成功', token, userId)

    router.push('/') // 登入成功導回首頁
  } else {
    router.push('/login') // 無 token 則導回登入頁
  }
</script>
