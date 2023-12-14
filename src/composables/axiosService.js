import { toast } from 'vue3-toastify';
import * as routes from '@/routes';
import axios from 'axios';

const toastOptions = {
  autoClose: 4000,
  closeButton: false,
  dangerouslyHTMLString: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  style: {
    fontSize: '1.1rem',
    fontWeight: '600',
    right: 0,
    top: 0,
  },
  theme: 'dark',
  toastStyle: {
    backgroundColor: '#0e3b4d',
    lineHeight: '1.65rem',
    marginBottom: '.5rem',
  },
  transition: 'slide',
};

const router = useRouter();

class AxiosService {
  constructor() {
    this.https = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 20000,
    });

    this.https.defaults.headers.common['x-syncio-app-id'] = import.meta.env.VITE_APP_ID;

    this.https.interceptors.response.use(
      response => {
        const message = response?.data?.message ?? response.message;
        if(message) {
          if(response?.request?.responseURL.includes('products/unsync')) {
            const options = { ...toastOptions, multiple: false }
            toast(message, { ...options, type: 'success' });
          } else {
            toast(message, { ...toastOptions, type: 'success' });
          }
        }
        return response;
      },
      error => {
        const { status, data } = error.response || {};
        const activityCenter = useActivityCenterStore();
        const auth = useAuthStore();
        const connections = useConnectionsStore();
        const marketPlace = useMarketPlaceStore();
        const orders = useOrdersStore();
        const payouts = usePayoutsStore();
        const plan = usePlanStore();
        const products = useProductsStore();
        const productSettings = useProductSettingsStore();

        switch (status) {
          case 422:
          case 400: {
            const message = data.errors?.[0];

            if(data?.is_duplicate_sku_found) {
              const products = useProductsStore();
              products.$patch({ isDuplicateSkuFound: true });
              return data;
            }

            if (message) {
              toast(message, { ...toastOptions, type: 'error' });
            }

            if(data.redirect_to === 'billing') {
              router.push({ name: routes.PLAN_AND_BILLINGS });
            }

            return data;
          }

          case 403:
            activityCenter.$reset();
            auth.$reset();
            connections.$reset();
            marketPlace.$reset();
            orders.$reset();
            payouts.$reset();
            plan.$reset();
            products.$reset();
            productSettings.$reset();
            sessionStorage.removeItem('ID_TOKEN_KEY');
            sessionStorage.removeItem('USER_ID');
            router.push({ name: routes.LOGIN });
            //return Promise.reject(error);
            return;

          case 502:
            toast('Bad Gateway: The server received an invalid response', { ...toastOptions, type: 'error' });
            return;

          case 500:
            toast('Internal Server Error: An unexpected error occurred on the server', { ...toastOptions, type: 'error' });
            return;
        }
      }
    );
  }

  getCleanedParams(params) {
    return Object.fromEntries(
      Object.entries(params).filter(([_, val]) => val !== null)
    );
  };

  async deleteData(url) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const response = await this.https.delete(url);
      return response.data;
    } catch (error) {}
  };

  async getData(url, params = {}) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const cleanedParams = this.getCleanedParams(params);
      const response = await this.https.get(url, { params: cleanedParams });
      return response.data;
    } catch (error) {}
  };

  async postData(url, params = {}, completeResponse = false) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const cleanedParams = this.getCleanedParams(params);
      const response = await this.https.post(url, { ...cleanedParams });
      return completeResponse ? response : response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  async uploadImage(url, params) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const response = await this.https.post(url, params);
      return response.data;
    } catch (error) {}
  }
}

const axiosService = new AxiosService();
export default axiosService;
