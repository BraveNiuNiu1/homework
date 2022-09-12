<template lang="pug">
<!-- 在Vue3中响应式不要随便用解构赋值 -->
    <header>{{ user.name }}</header>
    <main></main>
</template>

<script setup lang="ts">
// 需要用那就导入
import { useUserStore } from '../stores/user'

const user = useUserStore()
</script>
