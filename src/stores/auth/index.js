import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { continueLater } from './actions/continueLater';
import { fetchUser } from './actions/fetchUser';
import { forgotPassword } from './actions/forgotPassword';
import { installationComplete } from './actions/installationComplete';
import { login } from './actions/login';
import { loginWoo } from './actions/loginWoo';
import { registerUser } from './actions/registerUser';
import { registerWooStore } from './actions/registerWooStore';
import { resetPassword } from './actions/resetPassword';
import { saveShopifyToken } from './actions/saveShopifyToken';
import { saveShoplineToken } from './actions/saveShoplineToken';
import { shopifyLogin } from './actions/shopifyLogin';
import { shoplineLogin } from './actions/shoplineLogin';
import { updateStoreType } from './actions/updateStoreType';
import { wooPluginLogin } from './actions/wooPluginLogin';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currencies: ['USD'],
      currency: 'USD',
      forgotEmailErrorMessage: null,
      forgotPasswordForm: { emailNotFound: false, emailSent: false, loading: false },
      isAuthenticated: false,
      isBatteryLowDialogVisible: false,
      isNetworkDialogVisible: false,
      isSwitchingStore: false,
      isUpgradeDialogRequested: false,
      loadingContinueLater: false,
      loadingResetPassword: false,
      locales: 'en-US',
      loginForm: { loading: false },
      registrationForm: { loading: false },
      showLeavingPageDialog: false,
      storeTypes: [
        {
          storeType: 'source',
          description: [
            'Owns the product information and inventory',
            'Sells through other stores',
            'Fulfils and ships orders from other stores',
          ],
          examples: [
            'Drop shipping suppliers',
            'Brands working with resellers',
            'Store providing inventory for expansion stores'
          ],
          btnLabel: 'Select Source store',
        },
        {
          storeType: 'destination',
          description: [
            'Imports product information and inventory',
            'Sells products from other stores/brands',
            'Forwards orders to suppliers for fulfilment',
          ],
          examples: [
            'Drop shipping retailers',
            'Marketplaces selling other brands',
            'Expansion stores (e.g. region-specific versions)'
          ],
          btnLabel: 'Select Destination store',
        }
      ],
      timeZone: 'Australia/Melbourne',
      timeZones: ['Australia/Melbourne'],
      upgradeDialogType: '',
      user: null,
      wooEmailErrorMessage: null,
      wooPasswordErrorMessage: null,
    };
  },

  getters: {
    userId({ user }) {
      return user?.id;
    },

    showOrdersUpgradeDialog({ upgradeDialogType }) {
      return upgradeDialogType === 'orders';
    },

    showPayoutsUpgradeDialog({ upgradeDialogType }) {
      return upgradeDialogType === 'payouts';
    },

    showProductSettingsUpgradeDialog({ upgradeDialogType }) {
      return upgradeDialogType === 'product-settings';
    },
  },

  actions: deepmerge.all([
    continueLater,
    fetchUser,
    forgotPassword,
    installationComplete,
    login,
    loginWoo,
    registerUser,
    registerWooStore,
    resetPassword,
    saveShopifyToken,
    saveShoplineToken,
    shopifyLogin,
    shoplineLogin,
    updateStoreType,
    wooPluginLogin,
  ]),
});
