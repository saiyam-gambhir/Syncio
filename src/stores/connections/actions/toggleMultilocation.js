import axiosService from '@/composables/axios';

export const toggleMultilocation = {
  async toggleMultilocation() {
    let toggleValue = this.isMultilocationEnabled === 'On';
    this.loadingConnections = true;
    const params = {
      value: toggleValue
    };
    const response = await axiosService.postData(`stores/${this.storeId}/multi-locations/toggle`, params);
    await this.fetchConnections();
  },
};
