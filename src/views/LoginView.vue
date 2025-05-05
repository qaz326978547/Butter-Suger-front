<template>
  <main>
    <h1>登入頁面</h1>
    <button @click="redirectToGoogle" class="btn-google">使用 Google 登入</button>
  </main>
</template>

<script setup lang="ts">
  const redirectToGoogle = () => {
    window.location.href = 'http://localhost:8080/api/v1/users/auth/google'
  }
</script>
