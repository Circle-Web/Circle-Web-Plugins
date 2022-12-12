<script lang="ts" setup>
import ExtCard from './components/card.vue'
import {ElScrollbar} from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()
const toDetail = (id: number) => {
  router.push({
    path: '/ext/market/detail',
    query: {
      id
    }
  })
}

</script>

<template>
  <div class="ext__market">
    <ElScrollbar class="ext__market-list">
        <ExtCard @click="toDetail(1)"></ExtCard>
        <ExtCard @click="toDetail(1)"></ExtCard>
        <ExtCard @click="toDetail(1)"></ExtCard>
    </ElScrollbar>
  </div>
</template>

<style lang="scss">
.ext__market {
  padding: 20px 0px;
  .ext__market-list {
    padding: 0px 20px;
  }
  .ext__card {
    &:not(:first-child) {
        margin-top: 20px;
    }
  }
}
</style>