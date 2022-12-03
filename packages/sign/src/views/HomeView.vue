<template>
  <div class="main">
    <div class="top">
    </div>
    <h1 class="div-a">{{ curTitle }}</h1>
    <div class="select">

      <div v-for="(item, index) in array" :key="item" class="item" @click="onSelect(index)">
        <p>{{ item }}</p>
        <p>打卡</p>
      </div>
      <button @click="send">发送</button>
      <div>
      </div>
    </div>
  </div>
</template> 

<script lang="ts" setup>
import { share } from '@/utils/ext';
import { ref } from 'vue';

const array = ["坚持带口罩","学习打卡","上班打卡","自习开始","每日首胜"]
const curTitle = ref("坚持带口罩")

const onSelect = (index: number) => {
  curTitle.value = array[index]
}

const send = () => {
  share({
    title_name:curTitle.value
  })
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.item {
  background-color: greenyellow;
}

.main {
  width: 100%;
  height: 100%;
}

.div-a {
  position: absolute;
  left: 30px;
  top: 30px;
  z-index: 100;
  width: 200px;
  height: 100px;
}

.top {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>