<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';
import {
        formatDateTime
    } from '@/utils';
    import {
        getBaseInfo
    } from '@/utils/ext';
    import {
        get,
        post
    } from '@/utils/http';
    import {
        CUSTOM_MSG_TYPE,
        share
    } from '@circle/sdk';
    import {
        ElButton,
        ElCheckbox,
        ElMessage,
        ElRadio,
        ElTag,
        ElScrollbar,
        ElProgress,
        ElMessageBox
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
    import type {
        IVoteDetail,
        IVoteOption,
        IVoteResponse
    } from './types';



    const vote = reactive < IVoteDetail < IVoteOption > > ({
        id: 0,
        title: '',
        option: [],
        multipleChoice: false,
        publicResult: false,
        finish: false,
        userId: '',
        createTime: Date.now()
    })

    const isSelfSelect = ref(false)

    let singleSelect = ref(0)

    const createTime = computed(() => formatDateTime(vote.createTime))

    const selectedTotalCount = ref(0)

    const userId = computed(() => userStore.baseInfo.userInfo.username)

    /**
     * 是否本人创建的投票表单
     */
    const isSelfCreated = computed(() => userId.value === vote.userId)

    /**
     * 是否已经结束投票了
     */
    const isFinished = computed(() => vote.finish)

    /**
     * 对于本人来说是否已经结束投票了
     */
    const isSelfFinished = computed(() => isSelfSelect.value || isFinished.value)

    const userStore = useUserStore()
    onMounted(() => {
        getMainRecord()
    })

    const route = useRoute();
    const getMainRecord = () => {
        get < IVoteResponse > (`/ext/vote/mainRecord`, {
            id: route.query.id,
            userId: userId.value
        }).then(({
            value
        }) => {
            const {
                selected,
                mainRecord,
                list
            } = value
            Object.assign(vote, mainRecord)
            isSelfSelect.value = selected

            const option: IVoteOption[] = []
            for (let index = 0; index < mainRecord.option.length; index++) {
                const element = mainRecord.option[index];
                option.push({
                    desc: element,
                    selectCount: 0,
                    select: false,
                    percent: 0
                })
            }

            /**
             * 总共多少人选择了
             */
            selectedTotalCount.value = list.length

            /**
             * 计算所有选票
             */
            for (const item of list) {
                const select: number[] = item.select

                /**
                 * 计算每个选项的票数
                 */
                for (const index of select) {
                    option[index].selectCount++
                    if (item.userId === userId.value) {
                        option[index].select = true
                    }
                    option[index].percent = Math.round(option[index].selectCount / selectedTotalCount
                        .value * 100)
                }

            }

            vote.option = option
        }).catch(res => {
            ElMessage({
                message: res.msg || "网络异常, 请稍后重试",
                type: 'warning',
            })
        })
    }

    const select = () => {
        const select: number[] = []
        for (let index = 0; index < vote.option.length; index++) {
            const element = vote.option[index];
            if (element.select) {
                select.push(index)
            }
        }
        post(`/ext/vote/select`, {
            id: vote.id,
            select,
            userId: userId.value
        }).then(() => {
            getMainRecord()
            ElMessage.success('投票成功')
        }).catch(res => {
            ElMessage({
                message: res.msg,
                type: 'warning',
            })
        })

    }

    const sendMsg = () => {
        share({
            customMsgType: CUSTOM_MSG_TYPE.CARD,
            title: vote.title,
            smallTitle: '投票',
            description: vote.option.map(item => item.desc).join('&'),
            url: `http://localhost:5174/ext/vote/mainDetail?id=${vote.id}`,
        })
    }
    const close = () => {
        ElMessageBox.confirm('确定要结束投票吗?', '提示', {
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '确定'
        }).then(() => {
            post(`/ext/vote/close`, {
                id: route.query.id,
                userId: userId.value
            }).then(() => {
                /**
                 * 结束投票结果
                 */
                vote.finish = true
            }).catch(res => {
                ElMessage.warning(res.msg || '网络异常, 请稍后重试')
            })
        })
    }
</script>

<template>
    <div class="ext__vote-detail">
        <div class="ext__detail-header">
            <div class="ext__detail-title">{{ vote.title }}</div>
            <ElTag size="small">{{ vote.multipleChoice ? '多选' : '单选' }}</ElTag>
            <ElTag v-if="vote.finish" type="info" size="small" class="ext__detail-close">已结束</ElTag>
        </div>
        <div class="ext__detail-info">
            <div class="ext__detail-info-user">{{ vote.userId }}</div>
            <div> · {{ createTime }} · {{ selectedTotalCount}}人已投</div>
        </div>
        <ElScrollbar class="ext__detail-list">
            <template v-if="isSelfFinished">
                <div v-for="(item, index) in vote.option" :key="index" class="ext__detail-option">
                    <div class="ext__option-info">
                        <span class="ext__option-desc">{{ item.desc }}</span>
                        <div class="ext__option-right">
                            <span>{{ item.selectCount }}票</span>
                            <span class="ext__option-percent">{{ item.percent }}%</span>
                        </div>
                    </div>
                    <ElProgress class="ext__option-progress" :percentage="item.percent" :stroke-width="10"
                        :show-text="false" />
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) in vote.option" :key="index" class="ext__detail-option">
                    <ElCheckbox v-if="vote.multipleChoice" v-model="item.select" :label="item.desc" size="large" />
                    <ElRadio v-else v-model="singleSelect" :label="item.desc" size="large"></ElRadio>
                </div>
            </template>
        </ElScrollbar>
        <div class="ext__detail-operator">
            <ElButton v-if="!isSelfFinished" type="primary" @click="select" class="select-btn">投票</ElButton>
            <ElButton v-if="!isFinished" type="primary" @click="sendMsg" class="select-btn">重发到群</ElButton>
            <ElButton v-if="isSelfCreated && !isFinished" @click="close" class="select-btn">结束投票</ElButton>
        </div>
    </div>
</template>


<style lang="scss">
    .ext__vote-detail {
        padding: 20px;
        display: flex;
        flex-direction: column;


        .ext__detail-header {
            display: flex;
            align-items: center;
            flex-direction: row;
        }

        .ext__detail-title {
            font-size: 20px;
            margin-right: 12px;
        }

        .ext__detail-close {
            margin-left: 4px;
        }

        .ext__detail-info {
            font-size: 14px;
            color: #999;
            margin-top: 4px;
            display: flex;
            flex-direction: row;
        }

        .ext__detail-list {
            flex: 1;
        }

        .ext__detail-option {
            margin-top: 16px;
        }

        .ext__option-info {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .ext__option-right {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            font-size: 12px;
            color: var(--el-text-color-placeholder);
        }

        .ext__option-percent {
            margin-left: 4px;
        }

        .ext__option-desc {
            font-size: 16px;
            color: var(--el-text-color-primary);
        }

        .ext__option-progress {
            margin-top: 4px;
        }

        .ext__detail-operator {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            padding-top: 4px;
        }
    }
</style>