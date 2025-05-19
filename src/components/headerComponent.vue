<template>
    <header class="fixed left-0 top-0 w-full bg-white z-10 px-10">
        <nav class="flex items-center">
            <router-link class="py-3 px-10" to="/">首頁</router-link>
            <router-link class="py-3 px-10" to="/user">更新使用者資料</router-link>
            <router-link class="py-3 px-10" :to="{ name: 'UploadImage' }">圖片上傳</router-link>
            <router-link class="py-3 px-10" :to="{ name: 'UploadImageOnlyJs' }">圖片上傳(純TS版本)</router-link>



        </nav>
    </header>
</template>


<script setup lang="ts">
</script>
