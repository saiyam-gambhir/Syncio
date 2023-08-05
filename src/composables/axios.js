import axios from 'axios';

export function useAxios() {
  const $https = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 20000,
  });

  Object.assign($https.defaults.headers.common, {
    'Authorization': `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`,
    'x-syncio-app-id': import.meta.env.VITE_APP_ID,
  });

  const getData = async (url, params = {}) => {
    try {
      const cleanedParams = Object.entries(params).filter(([_, value]) => value !== null).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      const response = await $https(url, { params: cleanedParams });
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  return {
    getData
  };
}
