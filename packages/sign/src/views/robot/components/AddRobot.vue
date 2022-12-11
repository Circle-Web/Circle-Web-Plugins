<script lang="ts" setup>
  import { post } from '@/utils/http';
import {
    ElInput,
    ElForm,
    ElFormItem,
    ElButton,
    type FormInstance,
ElMessage
  } from 'element-plus'
  import {
    reactive,
    ref
  } from 'vue';
import type { IRobot } from '../types';

  const emits = defineEmits({
    close: (params?: any) => void 0
  })

  const props = defineProps({
    username: String,
    serverId: String,
    channelId: String,
  })

  const form = reactive({
    robotName: ''
  })

  /**
   * create rules validate form
   */
  const rules = reactive({
    robotName: [{
        required: true,
        message: '请输入机器人名称',
        trigger: 'blur'
      },
      {
        min: 1,
        max: 20,
        message: '长度在 1 到 20 个字符',
        trigger: 'blur'
      }
    ]
  })

  const loading = ref(false)
  const formRef = ref < FormInstance > ()
  const submit = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true
        post<{robot: IRobot}>('/ext/robot/create', {
          robotName: form.robotName,
          username: props.username,
          serverId: props.serverId,
          channelId: props.channelId
        }).then((res: any) => {
          ElMessage.success('添加机器人成功')
          cancel(res.value.robot)
        }).catch(() => {
          ElMessage.error('添加机器人失败')
        }).finally(() => {
          loading.value = false
        })
      }
    })
  }

  const cancel = (robot?: IRobot) => {
    emits('close', robot)
  }
</script>

<template>
  <div class="ext__robot-dialog">
    <ElForm :model="form" :rules="rules" ref="formRef">
      <ElFormItem prop="robotName">
        <ElInput v-model="form.robotName" placeholder="请输入机器人名称" />
      </ElFormItem>
    </ElForm>
    <div class="ext__robot-dialog-submit">
      <ElButton type="primary" @click="submit" :loading="loading">添加机器人</ElButton>
    </div>
    <div class="ext__robot-dialog-cancel">
      <ElButton type="primary" link @click="cancel()">返回</ElButton>
    </div>
  </div>
</template>

<style lang="scss">
  .ext__robot-dialog {

    .ext__robot-dialog-submit,
    .ext__robot-dialog-cancel {
      text-align: center;
      margin-top: 12px;
      .el-button {
        width: 100%;
      }
    }
  }
</style>