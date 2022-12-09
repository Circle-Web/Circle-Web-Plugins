<script lang="ts" setup>
import { get, post } from '@/utils/http';
import { getBaseInfo } from '@circle/sdk';
import { ElButton, ElDivider, ElMessage, ElTag, ElTooltip } from 'element-plus';
import { onMounted, reactive } from 'vue';
let username = ""
const list = reactive([{
  id: "12",
  userId: "string",
  robotNickname: "i am robot",
  serverName: "英雄联盟",
  channelName: "疾风剑豪",
  webhook: "string",
}])
/**
 * create onAdd function
 */
const onAdd = () => {
  console.log('onAdd')
}

onMounted(() => {
  getBaseInfo().then((res) => {
    username = res.userInfo.username
    get('/api/ext/ext/robot/listRobots', {
      username
    }).then(res => {

    }).catch(res => {
      ElMessage({
        message: res.msg,
        type: 'warning',
      })
    })
  })
})

//todo: 打开详情，展示webhook地址，提供一个推送消息到群的示例
const openDetailView = (id: number) => {

}

// todo: 重置webhook地址
const resetKey = (id: number) => {
  post(`/api/ext/robot/resetKey`, {
    id,
    username
  }).then((res: any) => {
    list.forEach(v => {
      if (v.id === res.robot.id) {
        v.webhook = res.robot.webhook
      }
    })
  }).catch(res => {
    ElMessage({
      message: res.msg,
      type: 'warning',
    })
  })
}
</script>

<template>
  <div style="margin: 20px" />
  <h1 class="center">添加机器人</h1>
  <el-divider />

  <div class="ext__robot-add">
    <el-button type="primary" @click="onAdd">新创建一个机器人</el-button>
  </div>
  <div class="ext__robot-main">
    <h3 class="">当前存在的机器人</h3>
    <el-divider />

    <div v-for="item in list" :key="item.id" @click="openDetailView(item.id)">
      <el-tooltip class="box-item" effect="dark" content="点击获取Webhook地址" placement="top-start">
        <div class="title">
          <div style="margin-right:10px;font-size:larger">{{ item.robotNickname }}</div>
          <el-tag type="info">BOT</el-tag>
        </div>
        <div>正在 [社区-{{ item.serverName }} 频道-{{ item.channelName }}] 中使用</div>
      </el-tooltip>
      <el-divider />
    </div>
  </div>
</template>

<style lang="scss">
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

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>