export const generateCharge = {
  async generateCharge() {
    try {
      const { fetchConnections, isDestinationStore, storeId } = useConnectionsStore();

      const params = {
        is_onboarding: this.plan ? false : true,
        option_ids: this.selectedAddonIds ? [...Object.values(this.selectedAddonIds)] : [],
        plan_id: this.currentPlanId,
      };

      this.loadingPayment = true;
      const { charge } = await axiosService.postData(`/shopify/store/${storeId}/generate-charge`, params);

      if(!charge) { // Free plan
        const { userId } = useAuthStore();
        this.loadingPlans = true;
        await Promise.all([
          this.fetchCurrentPlan(userId),
          fetchConnections()
        ]);
        this.loadingPlans = false;
        this.shouldShowAddonsDowngradeDialog = false;
        return;
      }

      if(charge) {
        window.location.href = charge.confirmation_url;
      }
    } catch(error) {
    } finally {
      this.loadingPayment = false;
    }
  }
};
