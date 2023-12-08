export const updateLocation = {
  async updateLocation(payload) {
    this.loadingLocationChange = true;
    const response = await axiosService.postData('stores/update-inventory-location', payload);
    if(response.success) {
      this.loadingLocationChange = this.isLocationChangeRequested = false;
      this.isLocationChanged = true;
    }
  }
};
