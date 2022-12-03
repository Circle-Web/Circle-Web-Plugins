<template>
  <button @click="route('/')">社区打卡分享</button>
  <button @click="route('/daka')">社区签到</button>
  <RouterView />
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const route = (path: string) => {
  router.push({ path })
}
</script>