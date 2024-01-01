export const createPayout = {
  async createPayout(payload, markAsPaid) {

    try {
      this.loadingCreatePayout = true;
      const { payoutLineItems, payoutsTotal, salesTotal, taxTotal } = payload;

      const params = {
        commission_record_ids: this.selectedPayoutOrders.map(order => order.id),
        current_store_id: this.storeId,
        mark_as_paid: markAsPaid,
        payout_line_items: payoutLineItems,
        payout_total: payoutsTotal,
        sale_total: salesTotal,
        source_store_id: this.selectedPayoutOrdersStore,
        tax_total: taxTotal,
      };

      const { success } = await axiosService.postData(`stores/payout/create-payout`, params);
      if(success) {
        this.isCreatePayoutDetailsRequested = false;
        this.selectedPayoutOrders = [];
        this.arePayableOrdersVisible = true;
        markAsPaid ? this.activeTabIndex = 2 : this.activeTabIndex = 1;
      }
    } catch(error) {
    } finally {
      this.loadingCreatePayout = false;
    }
  }
};
