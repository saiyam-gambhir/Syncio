export const connectPartnerStore = {
  async connectPartnerStore(storeIdentifier) {
    const params = {
      current_store_id: this.storeId,
      target_store_identifier: storeIdentifier,
    };

    const { success } = await axiosService.postData('stores/connect', params);

    if(success) await this.fetchConnections();
    return success;
  }
};
