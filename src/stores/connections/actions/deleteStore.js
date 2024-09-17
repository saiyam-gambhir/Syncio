export const DELETE_STORE = {
  async DELETE_STORE() {
    const { userId } = useAuthStore();
    const storeType = this.storeType;
    const {
      currentPlanId,
      fetchCurrentPlan,
      loadingPayment,
      loadingPlans,
      plan,
      plans,
      selectedAddonIds,
      shouldShowAddonsDowngradeDialog,
    } = usePlanStore();

    const response = await axiosService.deleteData(`user/${userId}/stores/${this.storeId}/profile`, {
      data: {
        removing_store_id: this.storeId,
      }
    });

    /* Fetch current plan after deactivation */
    await fetchCurrentPlan(userId);

    // User is deactivating a destination store, so we have to again generate charge for source store
    if(storeType === 'destination') {
      try {
        const params = {
          is_onboarding: plan ? false : true,
          option_ids: [],
          plan_id: plans && plans[0].id
        };

        loadingPayment = true;
        const { charge } = await axiosService.postData(`/shopify/store/${this.storeId}/generate-usage-charge`, params);

        if(charge) {
          window.location.href = response.charge?.confirmation_url;
        }
      } catch(error) {
      } finally {
        loadingPayment = false;
      }
    }

    // User is deactivating a source store, so we have to again generate charge for destination store
    if(storeType === 'source') {
      try {
        const params = {
          is_onboarding: plan ? false : true,
          option_ids: selectedAddonIds ? [...Object.values(selectedAddonIds)] : [],
          plan_id: currentPlanId,
        };

        loadingPayment = true;
        const { charge } = await axiosService.postData(`/shopify/store/${this.storeId}/generate-charge`, params);

        if(!charge) { // Free plan
          loadingPlans = true;
          await Promise.all([
            this.fetchCurrentPlan(userId),
            this.fetchConnections()
          ]);
          loadingPlans = false;
          shouldShowAddonsDowngradeDialog = false;
          return;
        }

        if(this.isDestinationStore && charge) {
          window.location.href = charge.confirmation_url;
        }
      } catch(error) {
      } finally {
        loadingPayment = false;
      }
    }
  },
};
