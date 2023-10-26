import { useFilters } from '@/composables/filters';

export const fetchPayoutPreview = {
  async fetchPayoutPreview(orderIds) {
    try {
      const params = {
        current_store_id: this.storeId,
        order_ids: orderIds,
        target_store_id: this.selectedPayoutOrdersStore,
      }

      const { data: { data } } = await this.$https.post('stores/payout/get-preview-payout', { ...params });
      this.payoutCreationDetails = data.flat();

    } catch (error) {

    } finally {

    }
  }
};
