<template>
  <div style="margin: 20px" />
  <h1 class="center">历史投票</h1>
  <el-divider />

  <div class="about">
    <div v-for="item in list" :key="item.id" @click="gotoMainDetail(item.id)">
      <div style="display: flex;">
        <div style="font-size: larger;font-weight: bolder;margin-right: 5px;">{{ item.title }}</div>
        <el-tag type="info">已结束</el-tag>
      </div>
      <div>{{ item.options.join(", ") }}</div>
      <el-divider />
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { get } from '@/utils/http';
import { getBaseInfo } from '@circle/sdk';
import { ElDivider, ElMessage, ElTag } from 'element-plus';
import { onMounted, reactive } from 'vue';

const list = reactive([{
  id: 0,
  title: '今天吃什么',
  options: ['鸡肉', '鸭肉'],
  finish: false
}])

onMounted(() => {
  getBaseInfo().then((res) => {
    get(`/api/ext/vote/historyRecord`, {
      userId: res.userInfo.username,
      channelId: res.currentChannelInfo.channelId
    }).then((res: any) => {
      const arr = []
      for (const iterator of res.value.list) {
        arr.push({
          id: iterator.id,
          title: iterator.title,
          options: iterator.options,
          finish: iterator.finish
        })
      }
    }).catch(res => {
      ElMessage({
        message: res.msg,
        type: 'warning',
      })
    })
  })
})

const gotoMainDetail = (id: number) => {
  router.push({
    path: '/ext/vote/mainRecord',
    params: {
      id
    }
  })
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
