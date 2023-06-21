export const fetchPayableOrders = {
  async fetchPayableOrders(storeId) {
    try {
      const {
        data: { payableOrders, success },
      } = await this.$https(`stores/payout/all-store-data/${storeId}`);
      if (success) {
        this.payableOrders.items = Object.keys(payableOrders).map(key => {
          return { ...payableOrders[key], id: +key };
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};
