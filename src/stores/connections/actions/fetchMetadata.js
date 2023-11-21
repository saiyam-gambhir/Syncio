export const fetchMetadata = {
  async fetchMetadata() {
    const { data: { permission_link } } = await axiosService.getData(`stores/${this.storeId}/metadata`);
    if(permission_link) {
      this.shopifyPermissions.link = permission_link;
      this.shopifyPermissions.showPermissionsDialog = true;
    }
  },
};
