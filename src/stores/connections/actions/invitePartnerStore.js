export const invitePartnerStore = {
  async invitePartnerStore(partnerStoreEmail) {
    const response = await this.$https.post('stores/invite-to-connect', {
      store_id: this.storeId,
      to_email: partnerStoreEmail,
    });
  }
};
