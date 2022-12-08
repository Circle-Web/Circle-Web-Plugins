<template>
  <div class="ext__share">

    <ElScrollbar>
      <div class="ext__cur-header">
        <img :src="current.backgroundUrl">
        <div class="ext__cur-title">{{current.curTitle}}</div>
      </div>
      <div class="ext__share-list">
        <div v-for="(item, index) in signList" :key="index" class="ext__share-item" @click="onSelect(index)">
          <img :src="item.backgroundUrl" />
          <div class="ext__share-item-title">{{item.title}}</div>
        </div>
      </div>
    </ElScrollbar>

    <div class="ext__share-footer">
      <ElButton type="primary" @click="send" :loading="loading">发送</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    share
  } from '@/utils/ext';
  import {
    reactive,
    ref
  } from 'vue';
  import {
    ElButton,
    ElMessage,
    ElScrollbar
  } from 'element-plus'

  const signList = [{
      title: '坚持戴口罩',
      backgroundUrl: 'http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516271601'
    },
    {
      title: '学习打卡',
      backgroundUrl: 'http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516306583'
    },
    {
      title: '上班打卡',
      backgroundUrl: 'http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516326591'
    },
    {
      title: '每日首胜',
      backgroundUrl: 'http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516342398'
    },
    {
      title: '天气',
      backgroundUrl: 'http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516352696'
    }
  ]

  const current = reactive({
    curTitle: signList[0].title,
    backgroundUrl: signList[0].backgroundUrl
  })

  const onSelect = (index: number) => {
    current.backgroundUrl = signList[index].backgroundUrl
    current.curTitle = signList[index].title
  }

  const loading = ref(false)

  const send = () => {
    loading.value = true
    share({
      title: current.curTitle,
      backgroundUrl: current.backgroundUrl
    }).then(res => {
      ElMessage.success('分享成功')
      console.log('res: ', res)
    }).catch(err => {
      ElMessage.error(err.msg)
      console.log('err: ', err)
    }).finally(() => {
      loading.value = false
    })
  }
</script>

<style lang="scss">
  .ext__share {
    display: flex;
    flex-direction: column;

    .ext__cur-header {
      width: 100%;
      height: 200px;
      background-color: brown;
      position: relative;
      margin-top: 12px;
      border-radius: 4px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .ext__cur-title {
      position: absolute;
      left: 12px;
      bottom: 12px;
      color: #000;
      font-weight: bold;
    }

    .ext__share-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      flex: 1;
      overflow-y: auto;
    }

    .ext__share-item {
      width: 48%;
      margin-top: 12px;
      background-color: chocolate;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      flex-direction: column;

      img {
        height: 200px;
        width: 100%;
        object-fit: cover;
      }

      .ext__share-item-title {
        text-align: center;
        padding: 4px;
      }
    }

    .ext__share-footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding: 12px;
    }
  }
</style>