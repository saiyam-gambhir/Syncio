import axiosService from '@/composables/axios';

export const updateLocation = {
  async updateLocation(payload) {
    const response = await axiosService.post('stores/update-inventory-location', payload);
  }
};
