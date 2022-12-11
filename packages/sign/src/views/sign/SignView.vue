<script lang="ts" setup>
  import {
    useUserStore
  } from '@/stores/user';
  import {
    formatDateTime
  } from '@/utils';
  import {
    get,
    post
  } from '@/utils/http';
  import {
    ElMessage,
    ElButton
  } from 'element-plus';
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref
  } from 'vue';
  import type {
    ISignInfo
  } from './types';
  const userStore = useUserStore()
  const username = computed(() => userStore.baseInfo.userInfo.username)
  const signInfo = reactive < ISignInfo > ({
    day: 0,
    signTime: Date.now(),
    person: 0,
    signToday: false,
    rankIndexToday: 1,
    ownRecordList: []
  })

  /**
   * 格式化签到时间
   */
  const signTime = computed(() => formatDateTime(signInfo.signTime))

  const now = ref(Date.now())
  /**
   * 当前时间
   */
  const nowTime = computed(() => formatDateTime(now.value))

  let timer: number
  onMounted(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      now.value = Date.now()
    }, 1000)
    getSignInData()
  })

  onBeforeUnmount(() => {
    clearInterval(timer)
  })

  /**
   * 获取签到信息
   */
  const getSignInData = () => {
    get < ISignInfo > (`/ext/sign/info`, {
      serverId: userStore.baseInfo.currentChannelInfo.serverId,
      username: username.value
    }).then((res: any) => {
      Object.assign(signInfo, res.value)
    }).catch((err) => {
      ElMessage.warning(err.msg || '网络异常, 获取签到信息失败')
    })
  }

  /**
   * 签到
   */
  const loading = ref(false)
  const signIn = () => {
    loading.value = true
    post < ISignInfo > (`/ext/sign/sign`, {
      serverId: userStore.baseInfo.currentChannelInfo.serverId,
      username: username.value
    }).then((res) => {
      Object.assign(signInfo, res.value)
      signInfo.signToday = true
      ElMessage.success('签到成功')
    }).catch(err => {
      ElMessage.warning(err.msg || '网络异常, 签到失败')
    }).finally(() => {
      loading.value = false
    })
  }
</script>

<template>
  <div class="ext__sign">
    <div v-if="signInfo.signToday" class="ext__sign-already">
      <div class="ext__sign-today">今日已成功打卡!</div>
      <div class="ext__sign-time">{{ signTime }}</div>
      <div class="ext__sign-footer">
        <div class="ext__sign-rank">频道内排名 {{ signInfo.rankIndexToday }} 位</div>
        <div class="ext__sign-day">已连续签到{{signInfo.day}}天</div>
      </div>
    </div>
    <div v-else class="ext__sign-not">
      <div class="ext__sign-now">{{ nowTime }}</div>
      <div class="ext__sign-text">
        已连续签到{{ signInfo.day }}天 | 社区内{{ signInfo.person }}人已签到
      </div>
      <ElButton class="ext__sign-btn" type="primary" :loading="loading" @click="signIn">立即签到</ElButton>
    </div>
  </div>
</template>

<style lang="scss">
  .ext__sign {
    padding: 20px;

    .ext__sign-already {
      .ext__sign-today {
        font-size: 18px;
        color: var(--el-text-color-primary);
      }
      .ext__sign-time {
        font-size: 16px;
        color: var(--el-text-color-secondary);
      }
      .ext__sign-footer {
        font-size: 12px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: var(--el-text-color-placeholder);
      }
    }

    .ext__sign-not {
      .ext__sign-now {
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      .ext__sign-text {
        font-size: 12px;
        margin-top: 8px;
        color: var(--el-text-color-secondary);
      }

      .ext__sign-btn {
        width: 100%;
        margin-top: 16px;
      }
    }
  }
</style>