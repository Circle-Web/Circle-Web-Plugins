<script lang="ts" setup>


/**
 * create onAdd function
 */
const onAdd = () => {
  console.log('onAdd')
}
</script>

<template>
  <div class="ext__robot-main">
    
  </div>
  <div class="ext__robot-add">
    <ElButton type="primary" @click="onAdd">添加机器人</ElButton>
  </div>
</template>

<style lang="scss"></style>