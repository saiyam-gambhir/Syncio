export const updateLocation = {
  async updateLocation(payload) {
    const response = await this.$https.post(
      'stores/update-inventory-location',
      { ...payload }
    );
    await this.fetchConnections();
    this.isLocationChangeRequested = false;
  },
};
