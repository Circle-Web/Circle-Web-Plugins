import { createRouter, createWebHistory } from 'vue-router'
import ReportShareView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ext/reportShare',
      name: 'reportShare',
      component: ReportShareView
    },
    {
      path: '/ext/sign',
      name: 'sign',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignView.vue')
    },
    {
      path: '/ext/robot',
      name: 'robot',
      component: () => import('../views/RobotView.vue')
    },
    {
      path: '/ext/vote/index',
      name: 'vote',
      component: () => import('../views/vote/VoteView.vue')
    },
    {
      path: '/ext/vote/mainDetail',
      name: 'voteMainDetail',
      component: () => import('../views/vote/VoteMainDetailView.vue')
    },
    {
      path: '/ext/vote/historyRecord',
      name: 'voteHistoryRecord',
      component: () => import('../views/vote/VoteHistoryRecordView.vue')
    },
  ]
})

export default router
