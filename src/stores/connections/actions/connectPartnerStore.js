export const connectPartnerStore = {
  async connectPartnerStore(storeIdentifier) {
    const response = await this.$https.post('stores/connect', {
      current_store_id: this.storeId,
      target_store_identifier: storeIdentifier,
    })
  }
}
