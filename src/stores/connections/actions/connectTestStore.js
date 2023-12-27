import { useRouter } from 'vue-router';
import * as routes from '@/routes';

export const connectTestStore = {
  async connectTestStore() {
    const params = {
      shopId: this.storeId,
      key: '5d49553267519',
    };

    const router = useRouter();
    const { success } = await axiosService.postData('shop/connectStoreWithKey', params);

    if(success) {
      await router.push({ name: routes.DASHBOARD });
    }
  }
};
