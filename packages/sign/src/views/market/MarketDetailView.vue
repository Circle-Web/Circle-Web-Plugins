<script lang="ts" setup>
import {ElButton} from 'element-plus'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
    fetchPluginDetail()
})

/**
 * fetch plugin detail
 */
const route = useRoute()
const fetchPluginDetail = () => {
    const id = route.query.id
    console.log('id', id)
}

</script>

<template>
  <div class="ext__market-detail">
    <div class="ext__detail-header">
        <div class="ext__header-left">
            <div class="ext__header-logo">
                <img src="http://rmf3cjpb1.hn-bkt.clouddn.com/logo/1_1670516352696">
            </div>
            <div class="ext__header-info">
                <div class="ext__header-title">插件名称</div>
                <div class="ext__hedaer-author">插件作者</div>
            </div>
        </div>
        <!-- TODO 是否已安装改插件 -->
        <ElButton class="ext__header-right" type="warning" text>安装插件</ElButton>
    </div>
    <div class="ext__detail-body">
        <div class="ext__detail-description">测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131测试12131</div>
    </div>
  </div>
</template>

<style lang="scss">
.ext__market-detail {
    padding: 20px;
    .ext__detail-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .ext__header-left {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            .ext__header-logo {
                width: 80px;
                height: 80px;
                border-radius: 4px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .ext__header-info {
                flex: 1;
                margin-left: 12px;
                .ext__header-title {
                    width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 16px;
                    font-weight: bold;
                    color: var(--el-text-color-primary);
                }
                .ext__hedaer-author {
                    font-size: 14px;
                    margin-top: 4px;
                    width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    color: var(--el-text-color-secondary);
                }
            }
        }
        .ext__header-right {
            width: 120px;
            height: 40px;
            font-size: 14px;
        }
    }
    .ext__detail-body {
        margin-top: 20px;
        .ext__detail-description {
            font-size: 14px;
            color: var(--el-text-color-secondary);
        }
    }
}
</style>