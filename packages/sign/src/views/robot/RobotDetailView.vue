<script lang="ts" setup>
  import {
    copyText
  } from '@/hooks/copy';
  import {
    useUserStore
  } from '@/stores/user';
  import {
    get,
    post
  } from '@/utils/http';
  import {
    ElMessage,
    ElLoading as vLoading,
    ElTag,
    ElButton,
    ElTabs,
    ElTabPane,
    ElInput
  } from 'element-plus';
  import {
    computed,
    onMounted,
    reactive,
    ref
  } from 'vue';
  import {
    useRoute
  } from 'vue-router';
  import {
    getExample
  } from './const';
  import type {
    IRobot
  } from './types';

  import Prism from 'prismjs'


  const userStore = useUserStore()
  const username = computed(() => userStore.baseInfo.userInfo.username)
  const robot = reactive < Partial < IRobot >> ({})

  const loading = ref(false)
  const route = useRoute()
  const getDetail = () => {
    const id = route.query.id
    get < {
      robot: IRobot
    } > ('/ext/robot/robotDetail', {
      id,
      username: username.value
    }).then((res) => {
      Object.assign(robot, res.value.robot)
    }).catch(res => {
      ElMessage.warning(res.msg || '网络异常, 获取机器人详情失败')
    })
  }

  onMounted(() => {
    getDetail()
  })

  const resetLoading = ref(false)
  const resetKey = () => {
    resetLoading.value = true
    post < {
      robot: IRobot
    } > (`/ext/robot/resetKey`, {
      id: robot.id,
      username: username.value
    }).then((res: any) => {
      Object.assign(robot, res.value.robot)
      ElMessage.success('重置webhook地址成功')
    }).catch(res => {
      ElMessage.warning(res.msg || '网络异常, 重置webhook地址失败')
    }).finally(() => {
      resetLoading.value = false
    })
  }

  /**
   * 复制webhook地址
   */
  const copy = () => {
    copyText(robot.webhook!).then(() => {
      ElMessage.success('复制成功')
    }).catch(() => {
      ElMessage.warning('复制失败')
    })
  }

  /**
   *  发送消息
   */
  const activeName = ref('example')
  const msg = ref('Hi, I am a robot')
  const pushLoading = ref(false)
  const push = () => {
    if (!robot.webhook) {
      return
    }
    pushLoading.value = true
    post(robot.webhook!, {
      type: 'txt',
      body: {
        msg: msg.value
      }
    }).then(() => {
      ElMessage.success('发送示例消息成功')
    }).catch((err) => {
      ElMessage.error(`发送示例消息失败: ${err.msg || '网络异常'}}`)
    }).finally(() => {
      pushLoading.value = false
    })
  }


  /**
   * example
   */
  const highlightCode = computed(() => Prism.highlight(getExample(robot.webhook!), Prism.languages.typescript,
    'typescript'))
</script>

<template>
  <div class="ext__robot-detail" v-loading="loading">
    <div class="ext__robot-nickname">
      <span>{{ robot.robotNickname }}</span>
      <ElTag type="info" size="small" class="ext__robot-tag">BOT</ElTag>
    </div>
    <div class="ext__robot-webhook">
      <span class="ext__robot-webhook-text">Webhook地址: {{ robot.webhook }}</span>
      <div class="ext__robot-webhook-btn">
        <ElButton type="primary" class="copy-btn" link @click="copy">复制</ElButton>
        <ElButton type="primary" link @click="resetKey" :loading="resetLoading">重置</ElButton>
      </div>
    </div>
    <ElTabs v-model="activeName" class="ext__robot-tabs">
      <ElTabPane label="推送消息示例" name="example">
        <div class="ext__robot-desc">机器人支持webhook协议的自定义接入, 实现业务相关通知的自动推送到对应的频道</div>
        <div class="ext__robot-desc">你也可以在下面手动试试推送消息到对应的频道</div>
        <ElInput type="textarea" v-model="msg" :autosize="{ minRows: 3, maxRows: 4 }" placeholder="请输入消息内容"
          resize="none" class="ext__robot-input" />
        <ElButton class="ext__robot-push" type="primary" @click="push" :loading="pushLoading">推送消息到群</ElButton>
      </ElTabPane>
      <ElTabPane label="机器人推送参数" name="params">
        <div class="ext__robot-code typescript" v-html="highlightCode"></div>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss">
  .ext__robot-detail {
    padding: 20px;

    .ext__robot-nickname {
      color: var(--el-text-color-primary);
      font-size: 16px;
      display: flex;
      align-items: center;

      .ext__robot-tag {
        margin-left: 4px;
      }
    }

    .ext__robot-webhook {
      display: flex;
      align-items: center;
      margin-top: 12px;

      .ext__robot-webhook-text {
        flex: 1;
        color: var(--el-text-color-placeholder);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .ext__robot-webhook-btn {
        margin-left: 4px;
      }
    }

    .ext__robot-tabs {
      .ext__robot-desc {
        color: var(--el-text-color-placeholder);
      }

      .ext__robot-input {
        margin-top: 12px;
      }

      .ext__robot-push {
        width: 100%;
        margin-top: 12px;
      }
    }
  }
</style>