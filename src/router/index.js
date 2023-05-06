import { createRouter, createWebHistory } from 'vue-router'
import * as routes from '@/routes'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import LoggedIn from '@/layouts/LoggedIn.vue'
import LoggedOut from '@/layouts/LoggedOut.vue'

const meta = {
  layout: LoggedIn,
  requireAuth: true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: routes.LOGIN,
      component: () => import('@/views/login/LoginView.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/forgot-password',
      name: routes.FORGOT_PASSWORD,
      component: () => import('@/views/registration/woocommerce/ForgotPassword.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/reset-password',
      name: routes.RESET_PASSWORD,
      component: () => import('@/views/registration/woocommerce/ResetPassword.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/registration',
      name: routes.SELECT_STORE_TYPE,
      component: () => import('@/views/registration/woocommerce/SelectStoreType.vue'),
      meta: {
        layout: LoggedOut
      }
    },
    {
      path: '/',
      name: routes.DASHBOARD,
      component: DashboardView,
      meta: { ...meta },
    },
    {
      path: '/marketplace',
      name: routes.MARKETPLACE,
      component: import('@/views/marketplace/MarketplaceView.vue'),
      meta: { ...meta },
    },
    {
      path: '/stores',
      name: routes.STORES,
      component: () => import('@/views/connections/ConnectionsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/products',
      name: routes.PRODUCTS,
      component: () => import('@/views/products/ProductsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/product-settings',
      name: routes.PRODUCT_SETTINGS,
      component: () => import('@/views/productSettings/ProductSettingsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/orders',
      name: routes.ORDERS,
      component: () => import('@/views/orders/OrdersView.vue'),
      meta: { ...meta },
    },
    {
      path: '/orders/push-settings',
      name: routes.PUSH_SETTINGS,
      meta: { ...meta },
      component: () => import('@/views/orders/pushSettings/PushSettings.vue')
    },
    {
      path: '/payouts',
      name: routes.PAYOUTS,
      component: () => import('@/views/payouts/PayoutsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/activity-center',
      name: routes.ACTIVITY_CENTER,
      component: () => import('@/views/activityCenter/ActivityCenterView.vue'),
      meta: { ...meta },
    },
    {
      path: '/account-settings',
      name: routes.ACCOUNT_SETTINGS,
      component: () => import('@/views/accountSettings/AccountSettingsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/plan-and-billings',
      name: routes.PLAN_AND_BILLINGS,
      component: () => import('@/views/planAndBillings/PlanAndBillingsView.vue'),
      meta: { ...meta },
    },
    {
      path: '/settings',
      name: routes.SETTINGS,
      component: () => import('@/views/settings/SettingsView.vue'),
      meta: { ...meta },
    },
  ]
})

export default router
