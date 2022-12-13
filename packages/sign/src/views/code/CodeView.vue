<script lang="ts" setup>
import {
    ElSelect,
    ElOption,
    ElButton,
    ElMessage
} from 'element-plus'
import {
    ref
} from 'vue';

import Monaco from '@/components/monaco/monaco.vue'
import { share } from '@/utils/ext';
import { CUSTOM_MSG_TYPE } from '@circle/sdk';
import {languageOptions} from '@/components/monaco/env'

/**
 * 目前只支持 ts 和 js
 */
const lang = ref('javascript')

const code = ref('')

const shareCode = () => {
    share({
        customMsgType: CUSTOM_MSG_TYPE.CODE,
        codeContent: code.value,
        codeLang: lang.value
    }).then(() => {
        ElMessage.success('分享成功')
    }).catch(() => {
        ElMessage.error('分享失败')
    })
}

</script>

<template>
    <div class="ext__code">
        <div class="ext__code-header">
            <div class="ext__code-header-select">
                <ElSelect v-model="lang" placeholder="请选择代码语言">
                    <ElOption v-for="option in languageOptions" :key="option.value" :value="option.value" :label="option.label"></ElOption>
                </ElSelect>
            </div>
            <ElButton type="primary" text @click="shareCode">分享代码</ElButton>
        </div>
        <div class="ext__code-monaco">
            <Monaco v-model="code" :language="lang"></Monaco>
        </div>
    </div>
</template>

<style lang="scss">
.ext__code {
    padding: 20px;
    display: flex;
    flex-direction: column;

    .ext__code-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ext__code-monaco {
        margin-top: 12px;
        flex: 1;

        #monaco-editor {
            height: 100%;
        }
    }
}
</style>