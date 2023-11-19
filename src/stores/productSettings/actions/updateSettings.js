import { useAuthStore } from 'auth';
import axiosService from '@/composables/axios';

export const updateSettings = {
  async filterSettings(configurations = [], groupName, storeType = 'destinations') {
    return configurations.filter(({ group, store_type }) => {
      return group === groupName && store_type === storeType;
    });
  },

  async updateSettings(payload) {
    try {
      this.loading = true;
      const auth = useAuthStore();
      const params = {
        configurations: [...payload]
      };
      const { success, configurations } = await axiosService.postData(`configurations/${auth.userId}`, params);
      if (success) {
        this.destinationProductSettings = await this.filterSettings(configurations, 'product');
        this.stringifyDestinationProductSettings = JSON.stringify(this.destinationProductSettings);

        this.destinationVariantSettings = await this.filterSettings(configurations, 'variant');
        this.stringifyDestinationVariantSettings = JSON.stringify(this.destinationVariantSettings);

        this.sourceProductSettings = await this.filterSettings(configurations, 'product', 'source');
        this.stringifySourceProductSettings = JSON.stringify(this.sourceProductSettings);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loading = false;
    }
  },
};
