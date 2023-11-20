import axiosService from '@/composables/axios';

export const toggleAutoPush = {
  async toggleAutoPush(storeId) {
    const response = await axiosService.postData(`stores/${this.storeId}/orders/auto-push`);
  }
};
