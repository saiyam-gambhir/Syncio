import { useFilters } from '@/composables/filters';

export const fetchPayoutPreview = {
  async fetchPayoutPreview(orderId) {
    try {

      if(this.selectedPayoutOrders.includes(orderId)) return;

      const params = {
        current_store_id: this.storeId,
        order_ids: this.selectedPayoutOrders,
        target_store_id: this.selectedPayoutOrdersStore,
      }

      const { data: { data } } = await this.$https.post('stores/payout/get-preview-payout', { ...params });
      this.payoutCreationDetails = data.flat();

    } catch (error) {

    } finally {

    }
  }
};
