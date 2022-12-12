<script lang="ts" setup>
import {ArrowLeftBold} from '@element-plus/icons-vue'
import {ElIcon} from 'element-plus'
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const goBack = () => {
  router.back()
}

const  isShowBack = computed(() => {
  return router.currentRoute.value.meta.isShowBack
})

const title = computed(() => router.currentRoute.value.meta.title)

</script>

<template>
  <div class="navigation__container">
    <ElIcon v-if="isShowBack" class="navigation__logo"  @click="goBack">
        <ArrowLeftBold />
      </ElIcon>
    <div class="navigation__title">{{title}}</div>
    <div></div>
  </div>
</template>

<style lang="scss">
.navigation__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-bottom: 1px solid rgba($color: #ffffff, $alpha: .1);
  .navigation__logo {
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  .navigation__title {
    flex: 1;
    font-size: 18px;
    text-align: center;
  }
}
</style>