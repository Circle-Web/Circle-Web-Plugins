import { useUserStore } from '@/stores/user'
import { getBaseInfo } from '@circle/sdk'
import { createRouter, createWebHistory } from 'vue-router'
import ReportShareView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/ext/reportShare'
    },
    {
      path: '/ext/reportShare',
      name: 'reportShare',
      component: ReportShareView,
      meta: {
        title: '打卡',
        isShowBack: false
      }
    },
    {
      path: '/ext/sign',
      name: 'sign',
      component: () => import('../views/sign/SignView.vue'),
      meta: {
        title: '每日签到',
        isShowBack: false
      }
    },
    {
      path: '/ext/robot',
      name: 'robot',
      component: () => import('../views/robot/RobotView.vue'),
      meta: {
        title: '添加机器人',
        isShowBack: false
      }
    },
    {
      path: '/ext/robot/detail',
      name: 'robotDetail',
      component: () => import('../views/robot/RobotDetailView.vue'),
      meta: {
        title: '机器人详情',
        isShowBack: true
      }
    },
    {
      path: '/ext/vote',
      name: 'vote',
      component: () => import('../views/vote/VoteView.vue'),
      meta: {
        title: '投票',
        isShowBack: false
      }
    },
    {
      path: '/ext/vote/mainDetail',
      name: 'voteMainDetail',
      component: () => import('../views/vote/VoteMainDetailView.vue'),
      meta: {
        title: '投票详情',
        isShowBack: false
      }
    },
    {
      path: '/ext/vote/historyRecord',
      name: 'voteHistoryRecord',
      component: () => import('../views/vote/VoteHistoryRecordView.vue'),
      meta: {
        title: '历史投票',
        isShowBack: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.baseInfo.userInfo.username) {
    next()
  } else {
    getBaseInfo().then((res) => {
      userStore.SET_BASE_INFO(res)
      next()
    }).catch((err) => {
      console.log(err)
    })
  }
})

export default router
