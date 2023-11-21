export const updateLocation = {
  async updateLocation(payload) {
    const response = await axiosService.postData('stores/update-inventory-location', payload);
  }
};
