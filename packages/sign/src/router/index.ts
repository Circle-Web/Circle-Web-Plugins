import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/daka',
      name: 'daka',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DakaView.vue')
    },
    {
      path: '/robot',
      name: 'robot',
      component: () => import('../views/RobotView.vue')
    },
    {
      path: '/ext/vote/index',
      name: 'vote',
      component: () => import('../views/vote/VoteView.vue')
    },
    {
      path: '/ext/vote/show',
      name: 'voteShow',
      component: () => import('../views/vote/VoteShowView.vue')
    },
  ]
})

export default router
