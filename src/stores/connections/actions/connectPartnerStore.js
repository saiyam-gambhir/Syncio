export const connectPartnerStore = {
  async connectPartnerStore(storeIdentifier) {
    const { data: { success } } = await this.$https.post('stores/connect', {
      current_store_id: this.storeId,
      target_store_identifier: storeIdentifier,
    });

    if(success) await this.fetchConnections();
  }
};
