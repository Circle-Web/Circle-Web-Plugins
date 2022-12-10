<script lang="ts" setup>
  import MyDialog from '@/components/dialog/dialog';
  import {
    get,
    post
  } from '@/utils/http';
  import {
    getBaseInfo
  } from '@circle/sdk';
  import {
    ElButton,
    ElScrollbar,
    ElMessage,
    ElTag
  } from 'element-plus';
  import {
    computed,
    onBeforeMount,
    onMounted,
    ref
  } from 'vue';
  import {
    useRouter
  } from 'vue-router';
  import type {
    IRobot, IRobotListResponse
  } from './types';

  import AddRobot from './components/AddRobot.vue'
  import {
    useUserStore
  } from '@/stores/user';

  const list = ref < IRobot[] > ([])
  const userStore = useUserStore()
  const username = computed(() => userStore.baseInfo.userInfo.username)

  const getRobotList = () => {
    get<IRobotListResponse>('/ext/robot/listRobots', {
      username: username.value
    }).then(res => {
      list.value = res.value.list
    }).catch(res => {
      ElMessage.warning(res.msg || '网络异常, 获取机器人列表失败')
    })
  }

  onMounted(() => {
    getRobotList()
  })


  //todo: 打开详情，展示webhook地址，提供一个推送消息到群的示例
  const router = useRouter()
  const openDetailView = (id: number) => {
    router.push({
      path: '/ext/robot/detail',
      query: {
        id
      }
    })
  }

  // todo: 重置webhook地址
  const resetKey = (id: number) => {
    post(`/ext/robot/resetKey`, {
      id,
      username: username.value
    }).then((res: any) => {
      list.value.forEach(v => {
        if (v.id === res.robot.id) {
          v.webhook = res.robot.webhook
        }
      })
    }).catch(res => {
      ElMessage.warning(res.msg || '网络异常, 重置webhook地址失败')
    })
  }

  /**
   * create onAdd function
   */
  const onAdd = () => {
    MyDialog({
      title: '创建机器人',
      defaultSlot: AddRobot,
      wrapperProps: {
        serverId: userStore.baseInfo.currentChannelInfo.serverId,
        channelId: userStore.baseInfo.currentChannelInfo.channelId,
        username: username.value
      }
    }).then(() => {
      /**
       * 添加完成后刷新列表
       */
      getRobotList()
    })
  }
</script>

<template>
  <div class="ext__robot">
    <ElButton type="primary" class="ext__robot-add" @click="onAdd">新创建一个机器人</ElButton>
    <ElScrollbar class="ext__robot-list">
      <div class="ext__robot-item" v-for="item in list" :key="item.id" @click="openDetailView(item.id)">
        <div class="ext__robot-info">
          <div class="ext__robot-nickname">{{ item.robotNickname }}</div>
          <ElTag type="info" size="small">BOT</ElTag>
        </div>
        <div class="ext__robot-desc">正在 [社区-{{ item.serverName }} 频道-{{ item.channelName }}] 中使用</div>
      </div>
    </ElScrollbar>
  </div>
</template>

<style lang="scss">
  .ext__robot {
    padding: 20px;
    display: flex;
    flex-direction: column;

    .ext__robot-add {
      width: 100%;
    }

    .ext__robot-list {
      flex: 1;
      margin-top: 20px;
      
    }

    .ext__robot-item {
      cursor: pointer;
      padding: 12px;
      border-radius: 4px;
      border-bottom: 1px solid var(--el-border-color-darker);
      &:hover {
        background-color: #3d3d3d;
      }
    }

    .ext__robot-info {
      display: flex;
      align-items: center;
    }

    .ext__robot-nickname {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 4px;
      font-size: 16px;
      font-weight: bold;
      color: var(--color-text-primary);
    }

    .ext__robot-desc {
      font-size: 12px;
      margin-top: 4px;
      color: var(--color-text-secondary);
    }
  }
</style>