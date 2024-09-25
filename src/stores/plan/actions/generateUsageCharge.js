export const generateUsageCharge = {
  async generateUsageCharge() {
    try {
      const { isUniversalStore, storeId } = useConnectionsStore();
      const optionsIds = this.selectedAddonIds ? [...Object.values(this.selectedAddonIds)] : this.plan?.active_addons.map(plan => plan.module_id);

      const universalStoreParams = {};
      const params = {};

      if(isUniversalStore) {
        universalStoreParams.is_onboarding = this.plan ? false : true;
        universalStoreParams.option_ids = optionsIds || [];
        universalStoreParams.plan_id = this.plans.find(_plan => _plan.name.toLowerCase() === this.plan.name.toLowerCase())?.id;
      } else {
        params.is_onboarding = this.plan ? false : true;
        params.option_ids = [];
        params.plan_id = this.plans && this.plans[0].id;
      }

      const response = await axiosService.postData(`/shopify/store/${storeId}/generate-usage-charge`, isUniversalStore ? universalStoreParams : params);

      if(response.charge?.confirmation_url) {
        window.location.href = response.charge.confirmation_url;
      }
    } catch(error) {
    } finally {
      this.loadingPayment = false;
    }
  }
};
