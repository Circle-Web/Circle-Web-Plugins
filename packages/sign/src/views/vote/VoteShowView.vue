<template>
    <div style="margin: 20px" />
    <h1 class="center">投票详情</h1>
    <el-divider />

    <div style="margin: 20px" />
    <div class="title">
        <div style="margin-right:10px;font-size:larger">{{ vote.title }}</div>
        <el-tag>{{ vote.multipleChoice ? '多选' : '单选' }}</el-tag>
    </div>
    <div>
        <div style="font-size:small;color: grey;">{{ vote.userId }} · {{ vote.createTime }} · {{ selectedTotalCount
        }}人已投</div>
    </div>
    <div style="margin: 20px" />
    <div v-for="(item, index) in vote.options" :key="index" class="option">
        <el-checkbox v-if="vote.multipleChoice" v-model="item.select" :label="item.desc" size="large" />
        <el-radio v-else v-model="singleSelect" :label="item.desc" size="large"></el-radio>
        <el-divider />
    </div>
    <div style="margin: 100px" />
    <el-button type="primary" :disabled="selectBtnDisabled" @click="select" class="select-btn"
        v-show="(!selected || vote.finish)">投票</el-button>
</template>

<script lang="ts" setup>
import { getUserInfo } from '@/utils/ext';
import { get, post } from '@/utils/http';
import { ElButton, ElCheckbox, ElDivider, ElMessage, ElRadio, ElTag } from 'element-plus';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const selectBtnDisabled = ref(true)
const vote = reactive({
    id: 0,
    title: '今天吃什么',
    options: [{
        desc: '肌肉',
        selectCount: 11,
        select: false
    }, {
        desc: '鸭肉',
        selectCount: 112,
        select: false
    }, {
        desc: '鸭肉',
        selectCount: 112,
        select: false
    }, {
        desc: '鸭肉',
        selectCount: 112,
        select: false
    }],
    multipleChoice: false,
    publicResult: false,
    finish: false,
    userId: '唐庆宁',
    createTime: "2022-12-08"
})
const selected = ref(false)
let userId = ''
const route = useRoute();
let singleSelect = ref(0)

const selectedTotalCount = computed(() => {
    return vote.options.map(o => o.selectCount).reduce((v1, v2) => v1 + v2)
})

watch(vote.options, () => {
    selectBtnDisabled.value = vote.options.filter(o => o.select).length <= 0
})
onMounted(() => {
    getUserInfo().then(res => {
        if (!res.data) {
            return
        }
        userId = res.data.userInfo.username
        getMainRecord()
    })
})

const getMainRecord = () => {
    get(`/api/ext/vote/mainRecord`, {
        id: route.query.id,
        userId
    }).then((res: any) => {
        selected.value = res.value.selected
        vote.id = res.value.mainRecord.id
        vote.title = res.value.mainRecord.title
        vote.multipleChoice = res.value.mainRecord.multipleChoice
        vote.publicResult = res.value.mainRecord.publicResult
        vote.finish = res.value.mainRecord.finish
        vote.userId = res.value.mainRecord.userId
        vote.createTime = res.value.mainRecord.createTime

        const options = []
        for (let index = 0; index < res.value.mainRecord.options.length; index++) {
            const element = res.value.mainRecord.options[index];
            options.push({
                desc: element,
                selectCount: 0,
                select: false
            })
        }
        for (const iterator of res.value.list) {
            const select: number[] = iterator.select
            for (const index of select) {
                options[index].selectCount++
            }
            if (iterator.userId === userId) {
                // todo：自己已投，修改ui，显示每个选项多少票
            }
        }
        vote.options = options
    }).catch(res => {
        ElMessage({
            message: res.msg,
            type: 'warning',
        })
    })
}

const select = () => {
    if (selectBtnDisabled.value) {
        return
    }
    const select: number[] = []
    for (let index = 0; index < vote.options.length; index++) {
        const element = vote.options[index];
        if (element.select) {
            select.push(index)
        }
    }
    getUserInfo().then(res => {
        post(`/api/ext/vote/select`, {
            id: vote.id,
            select,
            userId
        }).then((res: any) => {
            getMainRecord()
            ElMessage({
                message: `投票成功`,
                type: 'success',
            })
        }).catch(res => {
            ElMessage({
                message: res.msg,
                type: 'warning',
            })
        })
    })

}
</script>
<style >
.center {
    width: 100%;
    margin: 0 auto;
}

.title {
    display: flex;
}

.option {
    width: 100%;
}
</style>