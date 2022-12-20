<script lang="ts" setup>
import {
  useUserStore
} from '@/stores/user';
import {
  get
} from '@/utils/http';
import {
  ElMessage, ElScrollbar, ElTag
} from 'element-plus';
import {
  onMounted,
  ref
} from 'vue';
import {
  useRouter
} from 'vue-router';
import type {
  IVoteDetail
} from './types';

const list = ref<IVoteDetail[]>([])

interface IHistoryResponse {
  list: IVoteDetail[]
}


const userStore = useUserStore()
onMounted(() => {
  get<IHistoryResponse>(`/ext/vote/historyRecord`, {
    userId: userStore.baseInfo.userInfo.username,
    channelId: userStore.baseInfo.currentChannelInfo.channelId
  }).then((res) => {
    list.value = res.value.list
  }).catch(res => {
    ElMessage.warning(res.msg || '网络异常, 获取投票历史失败')
  })
})

/**
 * 跳转详情
 * @param id 
 */
const router = useRouter()
const gotoMainDetail = (id: number) => {
  router.push({
    path: '/ext/vote/mainDetail',
    query: {
      id
    }
  })
}
</script>

<template>
  <div class="ext__history">
    <ElScrollbar>
      <div class="ext__history-item" v-for="item in list" :key="item.id" @click="gotoMainDetail(item.id)">
        <div class="ext__history-top">
          <div class="ext__history-title">{{ item.title }}</div>
          <ElTag v-if="item.finish" type="info">已结束</ElTag>
          <ElTag v-else>进行中</ElTag>
        </div>
        <div class="ext__history-bottom">{{ item.option.join(', ') }}</div>
      </div>
    </ElScrollbar>
  </div>
</template>


<style lang="scss">
.ext__history {
  padding: 20px 8px;
  box-sizing: border-box;

  .ext__history-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 12px;
    border-bottom: 1px solid var(--el-border-color-darker);

    &:hover {
      background-color: #3d3d3d;
    }
  }

  .ext__history-top {
    display: flex;
    flex-direction: row;
  }

  .ext__history-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }

  .ext__history-bottom {
    font-size: 12px;
    margin-top: 4px;
    color: var(--el-text-color-placeholder);
  }
}
</style>