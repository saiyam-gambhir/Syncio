import { ref } from 'vue'
import axios from 'axios'

export function useAxios() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const get = async (url, params) => {
    loading.value = true
    try {
      const response = await axios(url, { params })
      data.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    get,
  }
}
