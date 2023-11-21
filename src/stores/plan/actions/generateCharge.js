export const generateCharge = {
  async generateCharge() {

    const {
      isDestinationStore,
      storeId,
    } = useConnectionsStore();

    const params = {
      is_onboarding: this.isOnboarding,
      option_ids: [...Object.values(this.selectedAddonIds)],
      plan_id: this.currentPlanId,
    };

    this.loadingPayment = true;
    const { charge } = await axiosService.postData(`/shopify/store/${storeId}/generate-charge`, params);
    this.loadingPayment = false;

    if(!charge) {
      this.loadingPlans = true;
      await this.fetchCurrentPlan(this.userId);
      this.loadingPlans = false;
      return;
    }

    if(isDestinationStore && charge) {
      window.location.href = charge.confirmation_url;
    }
  }
}
