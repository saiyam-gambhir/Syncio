import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { activateCharge } from './actions/activateCharge';
import { fetchCurrentPlan } from './actions/fetchCurrentPlan';
import { fetchPlans } from './actions/fetchPlans';
import { generateCharge } from './actions/generateCharge';
import { generateUsageCharge } from './actions/generateUsageCharge';

export const usePlanStore = defineStore('plan', {
  state: () => {
    return {
      highlightedAddon: null,
      isOnboarding: false,
      isWooPlanDialogRequested: false,
      loadingPayment: false,
      loadingPlans: false,
      plan: null,
      plans: null,
      selectedAddonIds: null,
      selectedPlan: null,
      shouldShowAddonsDowngradeDialog: false,
      shouldShowOrderPushLimitDialog: false,
      shouldShowPayoutsLimitDialog: false,
      shouldShowProductSyncLimitDialog: false,
    };
  },

  getters: {
    productsSynced({ plan }) {
      return +plan?.product_mappers_count || 0;
    },

    productsSyncedLimit({ plan }) {
      return +plan?.syncio_plan?.sync_product_limit || 0;
    },

    ordersPushed() {
      return this.activeAddons?.order?.current_usage;
    },

    ordersPushLimit() {
      return this.activeAddons?.order?.usage_count_limit;
    },

    ordersAvailableToPush() {
      const limit = +this.ordersPushLimit - +this.ordersPushed;
      return limit > -1 ? limit : 0;
    },

    isOrderLimitReached({ plan }) {
      if(plan) {
        let ordersPlan = plan.active_addons.filter(plan => plan.name === 'Orders')[0]
        return ordersPlan && ((+ordersPlan.current_usage >= +ordersPlan.usage_count_limit) && ordersPlan.usage_count_limit !== -1);
      }
    },

    isPayoutsLimitReached({ plan }) {
      if(plan) {
        let payoutsPlan = plan.active_addons.filter(plan => plan.name === 'Payouts')[0]
        return payoutsPlan && ((+payoutsPlan.current_usage >= +payoutsPlan.usage_count_limit) && payoutsPlan.usage_count_limit !== -1);
      }
    },

    payoutsProcessed() {
      return this.activeAddons?.payout?.current_usage;
    },

    payoutsProcessLimit() {
      return this.activeAddons?.payout?.usage_count_limit;
    },

    activeAddons({ plan }) {
      let order = null;
      let payout = null;
      let product = null;

      plan?.active_addons.forEach(addon => {
        switch (addon.name) {
          case 'Orders':
            order = { ...addon };
            break;
          case 'Payouts':
            payout = { ...addon };
            break;
          default:
            product = { ...addon };
        }
      });

      if(!plan && this.plans?.length > 0) {
        const avaialbleAddons = this.plans[0]?.available_addons;
        const addons = {
          order: avaialbleAddons.order && avaialbleAddons.order[0],
          payout: avaialbleAddons.payout && avaialbleAddons.payout[0],
          product: avaialbleAddons.product && avaialbleAddons.product[0],
        };

        return addons;
      }

      return {
        order,
        payout,
        product,
      };
    },

    addons({ plan }) {
      const ordersAddon = plan?.active_addons.find(addon => addon.name.toLowerCase() === 'orders');
      const payoutsAddon = plan?.active_addons.find(addon => addon.name.toLowerCase() === 'payouts');
      const settingsAddon = plan?.active_addons.find(addon => addon.name.toLowerCase() === 'product settings');

      const isOrderModuleAvailable = !!ordersAddon;
      const isOrderModulePaid = isOrderModuleAvailable && (ordersAddon.price_per_month > 0 || ordersAddon.usage_count_limit === -1);

      const isPayoutsModuleAvailable = !!payoutsAddon;
      const isPayoutsModulePaid = isPayoutsModuleAvailable && (payoutsAddon.price_per_month > 0 || payoutsAddon.usage_count_limit === -1);

      const isSettingsModuleAvailable = !!settingsAddon;
      const isSettingsModulePaid = isSettingsModuleAvailable && (settingsAddon.price_per_month > 0 || settingsAddon.usage_count_limit === -1);

      return {
        isOrderModuleAvailable,
        isOrderModulePaid,
        isPayoutsModuleAvailable,
        isPayoutsModulePaid,
        isSettingsModuleAvailable,
        isSettingsModulePaid,
      }
    },

    currentPlanId({ selectedPlan }) {
      return selectedPlan?.id;
    },

    wooPlanSelectionLink() {
      return `${import.meta.env.VITE_WOO_BILLING_URL}/?jwt=${window.sessionStorage.getItem('ID_TOKEN_KEY')}`;
    },
  },

  actions: deepmerge.all([
    activateCharge,
    fetchCurrentPlan,
    fetchPlans,
    generateCharge,
    generateUsageCharge,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'plan',
        storage: sessionStorage,
        paths: [
          'plans',
        ],
      },
    ],
  },
});
