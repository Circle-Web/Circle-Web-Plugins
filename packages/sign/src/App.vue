<template>
  <div class="ext__main">
    <header class="ext__main-header">
      <button class="ext__main-route" @click="route('/reportShare')">社区签到</button>
      <button class="ext__main-route" @click="route('/ext/report')">社区打卡分享</button>
      <button class="ext__main-route" @click="route('/ext/robot')">创建机器人</button>
      <button class="ext__main-route" @click="route('/ext/vote/index')">投票</button>
    </header>
    <RouterView class="ext__container" />
  </div>
</template>


<script lang="ts" setup>
import {
  useRouter
} from 'vue-router';

const router = useRouter()
const route = (path: string) => {
  router.push({
    path
  })
}
</script>

<style lang="scss">
.ext__main {
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .ext__main-header {
    display: flex;
    flex-direction: row;
  }

  .ext__main-route {
    cursor: pointer;
  }

  .ext__container {
    flex: 1;
    overflow-y: hidden;
  }
}
</style>