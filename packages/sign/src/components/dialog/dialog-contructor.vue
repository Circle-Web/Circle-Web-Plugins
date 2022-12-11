<script lang="ts" setup>
import {ElDialog} from "element-plus";
import type {Component} from "vue";

withDefaults(
    defineProps<{
        defaultSlot: Component;
        footerSlot?: Component;
        title?: string;
        width?: string;
        showClose?: boolean;
        wrapperProps?: Record<string, any>;
    }>(),
    {
        width: "300px",
        showClose: false
    }
);

const emits = defineEmits<{
    (event: "close", data?: any): void;
    (event: "open"): void;
}>();

const handleOpened = async () => {
    emits("open");
};
const close = (data: any) => {
    emits("close", data);
};
</script>
<template>
    <ElDialog
        class="my-dialog__body"
        :show-close="showClose"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :model-value="true"
        :modal="false"
        draggable
        :title="title"
        :width="width"
        @opened="handleOpened"
        @close="close"
    >
        <component :is="defaultSlot" @close="close" v-bind="wrapperProps"></component>
        <template v-if="footerSlot" #footer>
            <component :is="footerSlot"></component>
        </template>
    </ElDialog>
</template>

<style lang="scss">
.my-dialog__body {
    
    .el-dialog__header {
        margin: 0;
        padding: 8px;
        text-align: center;
    }
    .el-dialog__body {
        padding: 12px 20px;
    }
}
</style>
