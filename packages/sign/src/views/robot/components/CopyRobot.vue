<script lang="ts" setup>
    import {
        copyText
    } from '@/hooks/copy';
    import {
        ElButton,
        ElMessage
    } from 'element-plus'
    import {
        useRouter
    } from 'vue-router';
    interface IRobot {
        /**
         * 机器人id
         */
        id: number
        /**
         * 创建者id
         */
        userId: string
        /**
         * 机器人昵称
         */
        robotNickname: string
        /**
         * 社区名称
         */
        serverName: string
        /**
         * 频道ID
         */
        channelId: string
        /**
         * 频道名称
         */
        channelName: string
        /**
         * 创建时间
         */
        createTime: number
        /**
         * 更新时间
         */
        updateTime: number
        /**
         * 机器人webhook
         */
        webhook: string
    }

    const props = defineProps < IRobot > ()
    const emits = defineEmits({
        close: (params ? : any) => void 0
    })

    const copy = () => {
        copyText(props.webhook).then(() => {
            ElMessage.success('复制成功')
        }).catch(() => {
            ElMessage.error('复制失败')
        })
    }

    const router = useRouter()
    const detail = () => {
        router.push({
            path: '/ext/robot/detail',
            query: {
                id: props.id
            }
        })
        emits('close')
    }
</script>

<template>
    <div class="ext__robot-dialog-detail">
        <div class="ext__robot-nickname">已添加{{robotNickname}}, 配置WebHook地址后可推送消息到群</div>
        <div class="ext__robot-webhook">
            <div>Webhook地址: </div>
            <div>{{webhook}}</div>
        </div>
        <div class="ext__robot-operator">
            <ElButton type="primary" class="copy-btn" link @click="copy">复制地址</ElButton>
            <ElButton type="primary" link @click="detail">配置说明</ElButton>
        </div>
    </div>
</template>

<style lang="scss">
    .ext__robot-dialog-detail {
        .ext__robot-nickname {
            font-size: 16px;
            color: var(--el-text-color-primary);
        }

        .ext__robot-webhook {
            margin-top: 12px;
            padding: 12px 0px;
            border-top: 1px solid var(--el-border-color-darker);
            border-bottom: 1px solid var(--el-border-color-darker);
        }

        .ext__robot-operator {
            margin-top: 12px;
            text-align: center;
        }
    }
</style>