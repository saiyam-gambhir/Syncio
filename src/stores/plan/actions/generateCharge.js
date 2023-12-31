export const generateCharge = {
  async generateCharge() {
    try {
      const { isDestinationStore, storeId } = useConnectionsStore();

      const params = {
        is_onboarding: this.isOnboarding,
        option_ids: [...Object.values(this.selectedAddonIds)],
        plan_id: this.currentPlanId,
      };

      this.loadingPayment = true;
      const { charge } = await axiosService.postData(`/shopify/store/${storeId}/generate-charge`, params);

      if(!charge) { // Free plan
        const { userId } = useAuthStore();
        this.loadingPlans = true;
        await this.fetchCurrentPlan(userId);
        this.loadingPlans = false;
        this.shouldShowAddonsDowngradeDialog = false;
        return;
      }

      if(isDestinationStore && charge) {
        window.location.href = charge.confirmation_url;
      }
    } catch(error) {
    } finally {
      this.loadingPayment = false;
    }
  }
};
