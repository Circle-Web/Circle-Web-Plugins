<template>
  <div class="main">
    <div v-if=signToday>
      <div>
        我尼个位置系头像啊
      </div>
      <div>用户：{{ username }}</div>
      <h1>今日已成功打卡!</h1>
      <div>{{ signTime }}</div>
      <div>
        <!-- 左右布局啦 -->
        今日社区内排名{{ rankIndexToday }}位
        <div>已签到{{ day }}天</div>
      </div>
    </div>
    <div v-else>
      <div>{{ today }}</div>
      <div>
        已连续签到{{ day }}天 | 社区内{{ person }}人已签到
      </div>
      <button @click="signIn">立即签到</button>
    </div>
  </div>
</template> 

<script lang="ts" setup>
import { getBaseInfo } from '@/utils/ext';
import { get, post } from '@/utils/http';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const today = new Date() // 日/月  星期六
const username = ref("sbcyk")
let serverId = ""

const day = ref(0)
const signTime = ref(new Date()) // 转成时分秒格式
const person = ref(0)
const signToday = ref(false)
const rankIndexToday = ref(2)
const ownRecordList = ref([])

onMounted(() => {
  getSignInData()
})
const getSignInData = () => {
  getBaseInfo().then(res => {
    serverId = res.data.currentChannelInfo.serverId
    username.value = res.data.userInfo.username
    get(`/api/ext/sign/info`, {
      serverId, username: res.data.userInfo.username
    }).then((res: any) => {
      signToday.value = res.value.signToday
      day.value = res.value.day
      person.value = res.value.person
      rankIndexToday.value = res.value.rankIndexToday
      ownRecordList.value = res.value.ownRecordList
      if (signToday.value) {
        signTime.value = new Date(res.value.signTime)
      }
    }).catch(res => {
      ElMessage({
        message: res.msg,
        type: 'warning',
      })
    })
  })
}

const signIn = () => {
  post(`/api/ext/sign/sign`, {
    serverId, username: username.value
  }).then((res: any) => {
    signToday.value = true
    day.value = res.value.day
    rankIndexToday.value = res.value.rankIndexToday
    ownRecordList.value = res.value.ownRecordList
    signTime.value = new Date(res.value.signTime)
  }).catch(res => {
    ElMessage({
      message: res.msg,
      type: 'warning',
    })
  })
}
</script>

<style scoped>
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