<script lang="ts" setup>
import Navigation from '@/components/navigation/navigation.vue'

</script>

<template>
  <div class="ext__main">
    <Navigation />
    <RouterView class="ext__container" />
  </div>
</template>

<style lang="scss">
.ext__main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .ext__main-header {
    display: flex;
    flex-direction: row;
  }

  .ext__main-route {
    cursor: pointer;
  }

  .ext__container {
    flex: 1;
    overflow-y: hidden;
  }
}
</style>