<script lang="ts" setup>
import {
  get,
  post
} from '@/utils/http';
import {
  getBaseInfo
} from '@circle/sdk';
import {
  ElButton,
  ElDivider,
  ElMessage,
  ElTag
} from 'element-plus';
import {
  onMounted, ref,
  type Ref
} from 'vue';
import {
  useRouter
} from 'vue-router';
let username = ""
const list: Ref<any[]> = ref([])
/**
 * create onAdd function
 */
const onAdd = () => {
  // todo 弹二级窗口填写机器人名称，点击按钮创建
  getBaseInfo().then((res) => {
    const serverId = res.currentChannelInfo.serverId
    const channelId = res.currentChannelInfo.channelId
    post('/ext/robot/create', {
      username,
      serverId,
      channelId,
      robotName: 'robotName'
    }).then(res => {
      getRobotList()
    }).catch(res => {
      ElMessage.warning(res.msg || '网络异常, 创建机器人失败')
    })
  })
}

onMounted(() => {
  getBaseInfo().then((res) => {
    username = res.userInfo.username
    getRobotList()
  })
})

const getRobotList = () => {
  get('/ext/robot/listRobots', {
    username
  }).then((res: any) => {
    console.log(res.value.list)
    list.value = res.value.list
  }).catch(res => {
    ElMessage.warning(res.msg || '网络异常, 获取机器人列表失败')
  })
}

//todo: 打开详情，展示webhook地址，提供一个推送消息到群的示例
const router = useRouter()
const openDetailView = (id: string) => {
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
    username
  }).then((res: any) => {
    list.value.forEach((v: any) => {
      if (v.id === res.robot.id) {
        v.webhook = res.robot.webhook
      }
    })
  }).catch(res => {
    ElMessage.warning(res.msg || '网络异常, 重置webhook地址失败')
  })
}
</script>

<template>
  <div class="ext__robot-title"></div>
  <div class="ext__robot-add">
    <el-button type="primary" @click="onAdd">新创建一个机器人</el-button>
  </div>
  <div class="ext__robot-main">
    <h3 class="">当前存在的机器人</h3>
    <el-divider />

    <div class="ext__robot-item" v-for="item in list" :key="item.id" @click="openDetailView(item.id)">
      <!-- <el-tooltip class="box-item" effect="dark" content="点击获取Webhook地址">
        
      </el-tooltip> -->
      <div class="title">
        <div style="margin-right:10px;font-size:larger">{{ item.robotNickname }}</div>
        <el-tag type="info">BOT</el-tag>
      </div>
      <div>正在 [社区-{{ item.serverName }} 频道-{{ item.channelName }}] 中使用</div>
      <el-divider />
    </div>
  </div>
</template>

<style lang="scss">
.ext__robot-title {
  padding: 12px;
  width: 100%;
  text-align: center;
}

.title {
  display: flex;
}

.tooltip-base-box {
  width: 600px;
}

.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ext__robot-item {
  cursor: pointer;
}

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>