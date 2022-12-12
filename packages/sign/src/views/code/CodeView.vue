<script lang="ts" setup>
    import {
        ElSelect,
        ElOption,
        ElButton
    } from 'element-plus'
    import {
        ref
    } from 'vue';

    import Monaco from '@/components/monaco/monaco.vue'
import { share } from '@/utils/ext';

    /**
     * 目前只支持 ts 和 js
     */
    const lang = ref('javascript')

    const code = ref('')

    const shareCode = () => {
        console.log('分享代码')
        share()
    }

</script>

<template>
    <div class="ext__code">
        <div class="ext__code-header">
            <div class="ext__code-header-select">
                <ElSelect v-model="lang" placeholder="请选择代码语言">
                    <ElOption label="JavaScript" value="javascript"></ElOption>
                    <ElOption label="TypeScript" value="typescript"></ElOption>
                    <ElOption label="css" value="css"></ElOption>
                    <ElOption label="scss" value="scss"></ElOption>
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