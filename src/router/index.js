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
      component: () => import('@/views/registration/shopify/EmptyBase.vue'),
      meta: { layout: LoggedOut },
      name: '',
      path: '/shopify',
    },
    {
      component: () => import('@/views/registration/shopify/SelectStoreType.vue'),
      meta: { layout: LoggedOut },
      name: routes.SHOPIFY_SELECT_STORE_TYPE,
      path: routes.SHOPIFY_SELECT_STORE_TYPE,
    },
    {
      component: () => import('@/views/registration/shopify/ConnectOrInviteStore.vue'),
      meta: { layout: LoggedOut },
      name: routes.SHOPIFY_CONNECT_OR_INVITE_STORE,
      path: routes.SHOPIFY_CONNECT_OR_INVITE_STORE,
    },
    {
      component: () => import('@/views/registration/shopify/ConnectYourFirstStore.vue'),
      meta: { layout: LoggedOut },
      name: routes.SHOPIFY_CONNECT_YOUR_FIRST_STORE,
      path: routes.SHOPIFY_CONNECT_YOUR_FIRST_STORE,
    },
    {
      component: () => import('@/views/registration/shopify/SelectPlan.vue'),
      meta: { layout: LoggedOut },
      name: routes.SHOPIFY_SELECT_PLAN,
      path: routes.SHOPIFY_SELECT_PLAN,
    },
    {
      component: () => import('@/views/registration/shopify/InstallationComplete.vue'),
      meta: { layout: LoggedOut, requireAuth: true },
      name: routes.SHOPIFY_INSTALLATION_COMPLETE,
      path: routes.SHOPIFY_INSTALLATION_COMPLETE,
    },
    /* ----- Shopify ----- */

    /* ----- Shopline ----- */
    {
      component: () => import('@/views/registration/shopline/ShoplineEmptyBase.vue'),
      meta: { layout: LoggedOut },
      name: '',
      path: '/shopline',
    },
    {
      component: () => import('@/views/registration/shopline/ShoplineSelectStoreType.vue'),
      meta: { layout: LoggedOut },
      name: routes.SHOPLINE_SELECT_STORE_TYPE,
      path: routes.SHOPLINE_SELECT_STORE_TYPE,
    },
    /* ----- Shopline ----- */

    /* ----- Woocommerce ----- */
    {
      component: () => import('@/views/registration/woocommerce/CreateAccount.vue'),
      meta: { layout: LoggedOut },
      name: routes.WOO_CREATE_ACCOUNT,
      path: routes.WOO_CREATE_ACCOUNT,
    },
    {
      component: () => import('@/views/registration/woocommerce/SelectWooStoreType.vue'),
      meta: { layout: LoggedOut, requireAuth: true, },
      name: routes.WOO_SELECT_STORE_TYPE,
      path: routes.WOO_SELECT_STORE_TYPE,
    },
    {
      component: () => import('@/views/registration/woocommerce/VerifyStoreUrl.vue'),
      meta: { layout: LoggedOut, requireAuth: true, },
      name: routes.WOO_VERIFY_STORE_URL,
      path: routes.WOO_VERIFY_STORE_URL,
    },
    {
      component: () => import('@/views/registration/woocommerce/Permissions.vue'),
      meta: { layout: LoggedOut, requireAuth: true },
      name: routes.WOO_PERMISSIONS,
      path: routes.WOO_PERMISSIONS,
    },
    {
      component: () => import('@/views/registration/woocommerce/WooEntry.vue'),
      meta: { layout: LoggedOut, requireAuth: true, },
      name: '',
      path: routes.WOO_ENTRY
    },
    {
      component: () => import('@/views/registration/woocommerce/InstallationComplete.vue'),
      meta: { layout: LoggedOut, requireAuth: true, },
      name: routes.WOO_INSTALLATION_COMPLETED,
      path: routes.WOO_INSTALLATION_COMPLETED,
    },
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
      component: () => import('@/views/registration/woocommerce/ContinueLater.vue'),
      meta: { layout: LoggedOut, requireAuth: true },
      name: routes.WOO_CONTINUE_LATER,
      path: routes.WOO_CONTINUE_LATER,
    },
    /* ----- Woocommerce ----- */

    /* ----- Marketplace onboarding ----- */
    {
      component: () => import('@/views/registration/marketPlace/ProfileComplete.vue'),
      meta: { layout: LoggedOut },
      name: routes.PROFILE_COMPLETE,
      path: routes.PROFILE_COMPLETE,
    },

    {
      component: () => import('@/views/registration/marketPlace/CreateProfile.vue'),
      meta: { layout: LoggedOut },
      name: routes.CREATE_PROFILE,
      path: routes.CREATE_PROFILE,
    },
    /* ----- Marketplace onboarding ----- */

    /* ----- App ----- */
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
    /* ----- App ----- */
  ],
});

export default router;
