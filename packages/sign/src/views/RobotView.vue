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
    onMounted,
    reactive
  } from 'vue';
  import {
    useRouter
  } from 'vue-router';

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
      get('/ext/ext/robot/listRobots', {
        username
      }).then(res => {
        console.log(res)
      }).catch(res => {
        ElMessage.warning(res.msg || '网络异常, 获取机器人列表失败')
      })
    })
  })

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
      list.forEach(v => {
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