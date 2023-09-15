export const fetchPayableOrders = {
  async fetchPayableOrders() {
    try {
      this.payableOrders.loading = true;
      const { data: { payableOrders, success } } = await this.$https(`stores/payout/all-store-data/${this.storeId}`);
      if (success) {
        this.payableOrders.items = Object.keys(payableOrders).map(key => {
          return { ...payableOrders[key], id: +key };
        }) ?? [];
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.payableOrders.loading = false;
    }
  },
};
