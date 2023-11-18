import axiosService from '@/composables/axios';

export const invitePartnerStore = {
  async invitePartnerStore(partnerStoreEmail) {
    const params = {
      store_id: this.storeId,
      to_email: partnerStoreEmail,
    };

    const response = await axiosService.postData('stores/invite-to-connect', params);
  }
};
