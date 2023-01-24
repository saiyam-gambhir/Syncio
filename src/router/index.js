import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import LoggedIn from '@/layouts/loggedIn.vue'
import LoggedOut from '@/layouts/loggedOut.vue'
import { useAuthStore } from '@/stores/auth'

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
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('@/views/connections/ConnectionsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/products/ProductsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/product-settings',
      name: 'productSettings',
      component: () => import('@/views/productSettings/ProductSettingsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/orders/OrdersView.vue'),
      meta: { ...meta },
    },
    {
      path: '/payouts',
      name: 'payouts',
      component: () => import('@/views/payouts/PayoutsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/activity-center',
      name: 'activityCenter',
      component: () => import('@/views/activityCenter/ActivityCenterView.vue'),
      meta: { ...meta },
    },
  ]
})

export default router
