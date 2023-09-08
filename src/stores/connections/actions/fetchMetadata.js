export const fetchMetadata = {
  async fetchMetadata() {
    const { data: { data: { permission_link } } } = await this.$https(`stores/${this.storeId}/metadata`);
    if(permission_link) {
      this.shopifyPermissions.link = permission_link;
      this.shopifyPermissions.showPermissionsDialog = true;
    }
  },
};
