import axios from 'axios';

class AxiosService {
  constructor() {
    this.https = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 20000,
    });

    this.https.defaults.headers.common['x-syncio-app-id'] = import.meta.env.VITE_APP_ID;
  }

  async getData(url, params = {}) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;

    try {
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null)
      );
      const response = await this.https.get(url, { params: cleanedParams });
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  async postData(url, params = {}) {
    this.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
    try {
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null)
      );

      const response = await this.https.post(url, { ...cleanedParams });
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }
}

const axiosService = new AxiosService();

export default axiosService;
