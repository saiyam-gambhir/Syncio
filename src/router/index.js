import { createRouter, createWebHistory } from 'vue-router';
import * as routes from '@/routes';

/* ----- Components ----- */
import DashboardView from '@/views/dashboard/DashboardView.vue';
import LoggedIn from '@/layouts/LoggedIn.vue';
import LoggedOut from '@/layouts/LoggedOut.vue';
import Onboarding from '@/layouts/Onboarding.vue';

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
      path: routes.LOGIN,
    },
    {
      component: () => import('@/views/registration/PlatformSelection.vue'),
      meta: { layout: LoggedOut },
      name: routes.PLATFORM_SELECTION,
      path: routes.PLATFORM_SELECTION,
    },

    /* ----- Shopify ----- */
    {
      meta: { layout: LoggedOut },
      name: '',
      path: '/shopify',
      children: [
        {
          path: '',
          name: 'shopify',
          component: () => import('@/views/registration/shopify/EmptyBase.vue'),
        },
        {
          path: '/shopify/select-store-type',
          name: '/shopify/select-store-type',
          component: () => import('@/views/registration/shopify/SelectStoreType.vue'),
        }
      ]
    },
    /* ----- Shopify ----- */

    /* ----- Woocommerce ----- */
    {
      component: () => import('@/views/registration/woocommerce/CreateAccount.vue'),
      meta: { layout: LoggedOut },
      name: routes.WOO_CREATE_ACCOUNT,
      path: routes.WOO_CREATE_ACCOUNT,
    },
    /* ----- Woocommerce ----- */

    {
      component: () => import('@/views/registration/woocommerce/ForgotPassword.vue'),
      meta: { layout: LoggedOut },
      name: routes.FORGOT_PASSWORD,
      path: routes.FORGOT_PASSWORD,
    },
    {
      component: () => import('@/views/registration/woocommerce/ResetPassword.vue'),
      meta: { layout: LoggedOut },
      name: routes.RESET_PASSWORD,
      path: routes.RESET_PASSWORD,
    },
    {
      component: DashboardView,
      meta: { ...meta },
      name: routes.DASHBOARD,
      path: routes.DASHBOARD,
    },
    {
      component: () => import('@/views/marketplace/MarketplaceView.vue'),
      meta: { ...meta },
      name: routes.MARKETPLACE,
      path: routes.MARKETPLACE,
    },
    {
      component: () => import('@/views/connections/ConnectionsView.vue'),
      meta: { ...meta },
      name: routes.STORES,
      path: routes.STORES,
    },
    {
      component: () => import('@/views/products/ProductsView.vue'),
      meta: { ...meta },
      name: routes.PRODUCTS,
      path: routes.PRODUCTS,
    },
    {
      component: () => import('@/views/productSettings/ProductSettingsView.vue'),
      meta: { ...meta },
      name: routes.PRODUCT_SETTINGS,
      path: routes.PRODUCT_SETTINGS,
    },
    {
      component: () => import('@/views/planAndBillings/PlanAndBillingsView.vue'),
      meta: { ...meta },
      name: routes.PLAN_AND_BILLINGS,
      path: routes.PLAN_AND_BILLINGS,
    },
    {
      component: () => import('@/views/orders/OrdersView.vue'),
      meta: { ...meta },
      name: routes.ORDERS,
      path: routes.ORDERS,
    },
    {
      component: () => import('@/views/orderPushSettings/OrderPushSettingsView.vue'),
      meta: { ...meta },
      name: routes.ORDER_PUSH_SETTINGS,
      path: routes.ORDER_PUSH_SETTINGS,
    },
    {
      component: () => import('@/views/payouts/PayoutsView.vue'),
      meta: { ...meta },
      name: routes.PAYOUTS,
      path: routes.PAYOUTS,
    },
    {
      component: () => import('@/views/payoutsSettings/PayoutsSettingsView.vue'),
      meta: { ...meta },
      name: routes.PAYOUTS_SETTINGS,
      path: routes.PAYOUTS_SETTINGS,
    },
    {
      component: () => import('@/views/activityCenter/ActivityCenterView.vue'),
      meta: { ...meta },
      name: routes.ACTIVITY_CENTER,
      path: routes.ACTIVITY_CENTER,
    },
    {
      component: () => import('@/views/accountSettings/AccountSettingsView.vue'),
      meta: { ...meta },
      name: routes.ACCOUNT_SETTINGS,
      path: routes.ACCOUNT_SETTINGS,
    },
    {
      component: () => import('@/views/marketplaceSettings/MarketplaceSettingsView.vue'),
      meta: { ...meta },
      name: routes.MARKETPLACE_SETTINGS,
      path: routes.MARKETPLACE_SETTINGS,
    },
    {
      component: () => import('@/views/notificationSettings/NotificationSettingsView.vue'),
      meta: { ...meta },
      name: routes.NOTIFICATION_SETTINGS,
      path: routes.NOTIFICATION_SETTINGS,
    },
    {
      component: () => import('@/views/settings/SettingsView.vue'),
      meta: { ...meta },
      name: routes.SETTINGS,
      path: routes.SETTINGS,
    },
  ],
});

export default router;
