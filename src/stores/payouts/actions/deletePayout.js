export const deletePayout = {
  async deletePayout(payoutId) {
    try {
      this.loadingDeletePayout = true;
      const { success } = await axiosService.deleteData(`stores/payout/delete-payout/${payoutId}`);
      if(success) {
        this.isViewPayoutDetailsRequested = false;
        if(this.activeTabIndex === 1) {
          await this.fetchUnpaidPayouts();
        } else if(this.activeTabIndex === 2) {
          await this.fetchPaidPayouts();
        }
      }
    } catch (error) {
    } finally {
      this.loadingDeletePayout = false;
    }
  }
};
