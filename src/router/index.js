import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import LoggedIn from '@/layouts/loggedIn.vue'
import LoggedOut from '@/layouts/loggedOut.vue'

const meta = {
  layout: LoggedIn,
  requireAuth: true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { ...meta },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
      meta: {
        layout: LoggedOut
      }
    }
  ]
})

export default router
