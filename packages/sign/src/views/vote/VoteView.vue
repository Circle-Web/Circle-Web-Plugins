<template>
    <div style="margin: 20px" />
    <h1 class="center">投票</h1>
    <el-divider />

    <div style="margin: 20px" />
    <el-button @click="addOption" class="add-btn">添加选项</el-button>
    <el-form label-position="right" label-width="100px" :model="vote" style="max-width: 460px">
        <el-form-item label="投票主题" style="width:90%;">
            <el-input v-model="vote.title" />
        </el-form-item>
        <el-form-item :label="`选项${index + 1}`" v-for="(item, index) in vote.options" :key="index">
            <el-input v-model="vote.options[index]" style="width:80%;margin-right:3%" />
            <el-button type="danger" :icon="Delete" style="width:20px;height:20px;" circle @click="deleteOption(index)"
                v-show="deleteBtnHidden" />
        </el-form-item>
        <el-form-item label="选项类型">
            <el-checkbox label="多选" v-model="vote.multipleChoice" />
        </el-form-item>
        <el-form-item label="投票结果">
            <el-checkbox label="公开投票结果" v-model="vote.publicResult" />
        </el-form-item>
    </el-form>
    <div style="margin: 20px" />
    <el-button type="primary" :disabled="createBtnDisabled" @click="create" class="add-btn">发起投票</el-button>
</template>

<script lang="ts" setup>
import { getUserInfo, share } from '@/utils/ext';
import { post } from '@/utils/http';
// import { Delete } from "@element-plus/icons-vue";
import { ElButton, ElCheckbox, ElDivider, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import { reactive, ref, watch } from 'vue';
const createBtnDisabled = ref(true)
const deleteBtnHidden = ref(false)
const vote = reactive({
    title: '',
    options: ['', ''],
    multipleChoice: false,
    publicResult: false,
})

watch(vote, () => {
    createBtnDisabled.value = !(vote.title && vote.options.filter(e => e.trim().length <= 0).length <= 0)
    deleteBtnHidden.value = vote.options.length >= 3
})
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
    if (createBtnDisabled.value) {
        return
    }
    console.log({ vote })
    getUserInfo().then(res => {
        post(`/api/ext/vote/create`, {
            title: vote.title,
            options: vote.options,
            multipleChoice: vote.multipleChoice,
            publicResult: vote.publicResult,
            userId: res.data.userInfo.username
        }).then((res: any) => {
            share({
                customMsgType: 3,
                titleName: vote.title,
                options: vote.options,
                url: `http://127.0.0.1:3000/ext/vote/show?id=${res.value.id}`,
            })
            ElMessage({
                message: `创建成功`,
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

.add-btn {
    text-align: right
}
</style>