<template>
  <main>
    <h1>登入頁面</h1>
    <button @click="redirectToGoogle" class="btn-google">使用 Google 登入</button>
  </main>
</template>

<script setup lang="ts">
  const redirectToGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/users/auth/google`
  }
</script>
