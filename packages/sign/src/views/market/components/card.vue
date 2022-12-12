<script lang="ts" setup>
    import {
        ElCard,
        ElButton
    } from 'element-plus'


    defineProps({
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        logo: {
            type: String,
            default: ''
        }
    })

    const install = () => {
        
    }

</script>

<template>
    <ElCard class="ext__card" shadow="hover">
        <template #header>
            <div class="ext__card-header">
                <span class="ext__card-title">插件名称</span>
                <ElButton type="warning" text @click="install">安装插件</ElButton>
            </div>
        </template>
        <div class="ext__card-body">
            <div class="ext__card-logo">
                <img src="http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516352696" alt="">
            </div>
            <div class="ext__card-description">测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131</div>
        </div>
    </ElCard>
</template>

<style lang="scss">

.ext__card {
    --el-card-padding: 12px;
    cursor: pointer;
    .ext__card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ext__card-title {
            flex: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    .ext__card-body {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        .ext__card-logo {
            width: 70px;
            height: 70px;
            display: inline-block;
            background-color: #3d3d3d;
            margin-right: 12px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .ext__card-description {
            flex: 1;
            color: var(--el-text-color-secondary);
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            line-clamp: 3;
            -webkit-line-clamp: 3; //显示几行
        }
    }
}
</style>