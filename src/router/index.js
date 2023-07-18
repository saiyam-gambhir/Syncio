import { createRouter, createWebHistory } from 'vue-router';
import * as routes from '@/routes';

/* ----- Components ----- */
import DashboardView from '@/views/dashboard/DashboardView.vue';
import LoggedIn from '@/layouts/LoggedIn.vue';
import LoggedOut from '@/layouts/LoggedOut.vue';

/* ----- Data ----- */
const meta = {
  layout: LoggedIn,
  requireAuth: true,
};

/* ----- Routes ----- */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import('@/views/login/LoginView.vue'),
      meta: { layout: LoggedOut },
      name: routes.LOGIN,
      path: '/login',
    },
    {
      component: () => import('@/views/registration/woocommerce/ForgotPassword.vue'),
      meta: { layout: LoggedOut },
      name: routes.FORGOT_PASSWORD,
      path: '/forgot-password',
    },
    {
      component: () => import('@/views/registration/woocommerce/ResetPassword.vue'),
      meta: { layout: LoggedOut },
      name: routes.RESET_PASSWORD,
      path: '/reset-password',
    },
    {
      component: () => import('@/views/registration/woocommerce/SelectStoreType.vue'),
      meta: { layout: LoggedOut },
      name: routes.SELECT_STORE_TYPE,
      path: '/registration',
    },
    {
      component: DashboardView,
      meta: { ...meta },
      name: routes.DASHBOARD,
      path: '/',
    },
    {
      component: () => import('@/views/marketplace/MarketplaceView.vue'),
      meta: { ...meta },
      name: routes.MARKETPLACE,
      path: '/marketplace',
    },
    {
      component: () => import('@/views/connections/ConnectionsView.vue'),
      meta: { ...meta },
      name: routes.STORES,
      path: '/stores',
    },
    {
      component: () => import('@/views/products/ProductsView.vue'),
      meta: { ...meta },
      name: routes.PRODUCTS,
      path: '/products',
    },
    {
      component: () => import('@/views/productSettings/ProductSettingsView.vue'),
      meta: { ...meta },
      name: routes.PRODUCT_SETTINGS,
      path: '/settings/product-settings',
    },
    {
      component: () => import('@/views/orders/OrdersView.vue'),
      meta: { ...meta },
      name: routes.ORDERS,
      path: '/orders',
    },
    {
      component: () => import('@/views/orders/pushSettings/PushSettings.vue'),
      meta: { ...meta },
      name: routes.PUSH_SETTINGS,
      path: '/orders/push-settings',
    },
    {
      component: () => import('@/views/payouts/PayoutsView.vue'),
      meta: { ...meta },
      name: routes.PAYOUTS,
      path: '/payouts',
    },
    {
      component: () => import('@/views/activityCenter/ActivityCenterView.vue'),
      meta: { ...meta },
      name: routes.ACTIVITY_CENTER,
      path: '/activity-center',
    },
    {
      component: () => import('@/views/settings/accountSettings/AccountSettingsView.vue'),
      meta: { ...meta },
      name: routes.ACCOUNT_SETTINGS,
      path: '/settings/account-settings',
    },
    {
      component: () => import('@/views/settings/planAndBillings/PlanAndBillingsView.vue'),
      meta: { ...meta },
      name: routes.PLAN_AND_BILLINGS,
      path: '/settings/plan-and-billings',
    },
    {
      component: () => import('@/views/settings/marketplaceSettings/MarketplaceSettingsView.vue'),
      meta: { ...meta },
      name: routes.MARKETPLACE_SETTINGS,
      path: '/settings/marketplace-settings',
    },
    {
      component: () => import('@/views/settings/notificationSettings/NotificationSettingsView.vue'),
      meta: { ...meta },
      name: routes.NOTIFICATION_SETTINGS,
      path: '/settings/notification-settings',
    },
    {
      component: () => import('@/views/settings/SettingsView.vue'),
      meta: { ...meta },
      name: routes.SETTINGS,
      path: '/settings',
    },
  ],
});

export default router;
