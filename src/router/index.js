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
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/registration/woocommerce/ForgotPassword.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/registration/woocommerce/ResetPassword.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/registration',
      name: 'select-store-type',
      component: () => import('@/views/registration/woocommerce/SelectStoreType.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { ...meta },
    },
    {
      path: '/marketplace',
      name: 'market-place',
      component: import('@/views/marketplace/MarketplaceView.vue'),
      meta: { ...meta },
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
      name: 'product-settings',
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
      path: '/orders/push-settings',
      name: 'push-settings',
      meta: { ...meta },
      component: () => import('@/views/orders/pushSettings/PushSettings.vue')
    },
    {
      path: '/payouts',
      name: 'payouts',
      component: () => import('@/views/payouts/PayoutsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/activity-center',
      name: 'activity-center',
      component: () => import('@/views/activityCenter/ActivityCenterView.vue'),
      meta: { ...meta },
    },
    {
      path: '/account-settings',
      name: 'account-settings',
      component: () => import('@/views/accountSettings/AccountSettingsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/plan-and-billings',
      name: 'plan-and-billings',
      component: () => import('@/views/planAndBillings/PlanAndBillingsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings/SettingsView.vue'),
      meta: { ...meta },
    },
  ]
})

export default router
