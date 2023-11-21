import { useAuthStore } from 'auth';

export const fetchSettings = {
  async filterSettings(configurations = [], groupName, storeType = 'destinations') {
    return configurations.filter(({ group, store_type }) => {
      return group === groupName && store_type === storeType;
    });
  },

  checkExsistingSettings(destinationProductSettings, sourceProductSettings) {
    return (destinationProductSettings.length > 0 || sourceProductSettings.length > 0);
  },

  async fetchSettings() {
    if (this.checkExsistingSettings(this.destinationProductSettings, this.sourceProductSettings)) return;

    try {
      this.loading = true;
      const auth = useAuthStore();
      const { success, configurations } = await axiosService.getData(`configurations/${auth.userId}`);
      if (success) {
        this.destinationProductSettings = await this.filterSettings(configurations, 'product');
        this.stringifyDestinationProductSettings = JSON.stringify(this.destinationProductSettings);

        this.destinationVariantSettings = await this.filterSettings(configurations, 'variant');
        this.stringifyDestinationVariantSettings = JSON.stringify(this.destinationVariantSettings);

        this.sourceProductSettings = await this.filterSettings(configurations, 'product', 'source');
        this.stringifySourceProductSettings = JSON.stringify(this.sourceProductSettings);

        this.sourceVariantSettings = await this.filterSettings(configurations, 'variant', 'source');
        this.stringifySourceVariantSettings = JSON.stringify(this.sourceVariantSettings);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loading = false;
    }
  },
};
