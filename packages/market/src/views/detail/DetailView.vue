<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  console.log("route: ", route);
});
</script>

<template>
  <main class="sc__detail"></main>
</template>

<style lang="scss"></style>
