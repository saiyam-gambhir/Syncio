import axios from 'axios';
import { toast } from 'vue3-toastify';

const toastOptions = {
  autoClose: 5000,
  closeButton: false,
  theme: 'dark',
  transition: 'slide',
  style: {
    fontSize: '1.1rem',
    fontWeight: '600',
    right: 0,
    top: 0,
  },
  toastStyle: {
    backgroundColor: '#0e3b4d',
    lineHeight: '1.65rem',
    marginBottom: '.5rem',
  },
  pauseOnHover: true,
  dangerouslyHTMLString: true,
};

class AxiosService {
  constructor() {
    this.https = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 20000,
    });

    this.https.defaults.headers.common['x-syncio-app-id'] = import.meta.env.VITE_APP_ID;
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
      const message = response?.data?.message ?? response?.message;
      if(message) toast(message, { ...toastOptions, type: 'success' });
      return response.data;
    } catch (error) {
      const message = error?.message;
      if(message) toast(message, { ...toastOptions, type: 'error' });
    }
  };

  async getData(url, params = {}) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;

    try {
      const cleanedParams = this.getCleanedParams(params);
      const response = await this.https.get(url, { params: cleanedParams });
      const message = response?.data?.message ?? response.message;
      if(message) toast(message, { ...toastOptions, type: 'success' });
      return response.data;
    } catch (error) {
      const message = error?.message;
      if(message) toast(message, { ...toastOptions, type: 'error' });
    }
  };

  async postData(url, params = {}) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const cleanedParams = this.getCleanedParams(params);
      const response = await this.https.post(url, { ...cleanedParams });
      const message = response?.data?.message ?? response.message;
      if(message) toast(message.trim(), { ...toastOptions, type: 'success' });
      return response.data;
    } catch (error) {
      const message = error?.message;
      if(message) toast(message, { ...toastOptions, type: 'error' });
    }
  };

  async uploadImage(url, params) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const response = await this.https.post(url, params);
      const message = response?.data?.message ?? response.message;
      if(message) toast(message.trim(), { ...toastOptions, type: 'success' });
      return response.data;
    } catch (error) {
      const message = error?.message;
      if(message) toast(message, { ...toastOptions, type: 'error' });
    }
  }
}

const axiosService = new AxiosService();

export default axiosService;
