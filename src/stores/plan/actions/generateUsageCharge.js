export const generateUsageCharge = {
  async generateUsageCharge() {
    try {
      const { fetchConnections, storeId } = useConnectionsStore();

      const params = {
        is_onboarding: this.plan ? false : true,
        option_ids: [],
        plan_id: this.plans && this.plans[0].id
      };

      this.loadingPayment = true;
      const { charge } = await axiosService.postData(`/shopify/store/${storeId}/generate-usage-charge`, params);

      if(charge) {
        window.location.href = charge.confirmation_url;
      }
    } catch(error) {
    } finally {
      this.loadingPayment = false;
    }
  }
};
