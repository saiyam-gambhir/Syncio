export const createPayout = {
  async createPayout(payload, markAsPaid) {

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
      markAsPaid ? this.activeTavIndex = 2 : this.activeTavIndex = 1;
    }
  }
};
