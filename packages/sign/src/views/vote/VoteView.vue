<script lang="ts" setup>
    import {
        getBaseInfo,
        share
    } from '@/utils/ext';
    import {
        post
    } from '@/utils/http';
    import {
        CUSTOM_MSG_TYPE
    } from '@circle/sdk';
    import {
        CirclePlusFilled,
        RemoveFilled,
    } from "@element-plus/icons-vue";
    import {
        ElButton,
        ElCheckbox,
        ElForm,
        ElFormItem,
        ElInput,
        ElMessage,
        ElIcon
    } from 'element-plus';
    import {
        computed,
        reactive
    } from 'vue';
import { useRouter } from 'vue-router';
    const vote = reactive({
        title: '',
        options: ['', ''],
        multipleChoice: false,
        publicResult: false,
    })

    const isDisabledCreateBtn = computed(() => {
        return !(vote.title && vote.options.every(e => e.trim()))
    })

    const isShowDelBtn = computed(() => vote.options.length > 2)

    const addOption = () => {
        if (vote.options.length >= 10) {
            return
        }
        vote.options.push("")
    }
    const deleteOption = (index: number) => {
        vote.options.splice(index, 1)
    }
    const create = () => {
        getBaseInfo().then((res) => {
            post(`/ext/vote/create`, {
                title: vote.title,
                options: vote.options,
                multipleChoice: vote.multipleChoice,
                publicResult: vote.publicResult,
                userId: res.userInfo.username,
                channelId: res.currentChannelInfo.channelId
            }).then((result: any) => {
                share({
                    customMsgType: CUSTOM_MSG_TYPE.CARD,
                    title: vote.title,
                    smallTitle: '投票',
                    description: vote.options.join('&'),
                    url: `http://121.37.205.80:4173/#/ext/vote/mainDetail?id=${result.value.record.id}`,
                })
                ElMessage.success('创建成功')
            }).catch(res => {
                ElMessage.warning(res.msg)
            })
        })
    }

    const router = useRouter()
    const getHistoryRecord = () => {
        router.push({
            path: '/ext/vote/historyRecord'
        })
    }
</script>

<template>
    <div class="ext__vote">
        <ElForm label-position="right" label-width="80px" :model="vote">
            <ElFormItem label="投票主题">
                <ElInput v-model="vote.title" />
            </ElFormItem>
            <ElFormItem :label="`选项${index + 1}`" v-for="(item, index) in vote.options" :key="index"
                class="ext__vote-option">
                <ElInput v-model="vote.options[index]" />
                <ElIcon class="ext__vote-del" @click="deleteOption(index)" v-show="isShowDelBtn">
                    <RemoveFilled />
                </ElIcon>
            </ElFormItem>
            <div class="ext__vote-add">
                <ElIcon>
                    <CirclePlusFilled />
                </ElIcon>
                <span @click="addOption" class="ext__vote-add-text">添加选项</span>
            </div>
            <ElFormItem label="选项类型">
                <el-checkbox label="多选" v-model="vote.multipleChoice" />
            </ElFormItem>
            <ElFormItem label="投票结果">
                <el-checkbox label="公开投票结果" v-model="vote.publicResult" />
            </ElFormItem>
        </ElForm>
        <div class="ext__vote-operator">
            <ElButton type="primary" link @click="getHistoryRecord">历史投票</ElButton>
            <ElButton type="primary" :disabled="isDisabledCreateBtn" @click="create">发起投票</ElButton>
        </div>
    </div>
</template>

<style lang="scss">
    .ext__vote {
        box-sizing: border-box;
        padding: 12px 32px;

        .ext__vote-option {
            .el-input__wrapper {
                padding-right: 32px;
            }
        }

        .ext__vote-add {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            .ext__vote-add-text {
                margin-left: 4px;
            }
            &:hover {
                color: var(--el-color-primary);
            }
        }

        .ext__vote-operator {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .ext__vote-del {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;

            &:hover {
                color: var(--el-color-primary);
            }
        }
    }
</style>