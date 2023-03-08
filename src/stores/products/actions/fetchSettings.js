import { useAuthStore } from '@/stores/auth'

export const fetchSettings = {
  async fetchSettings() {
    try {
      const auth = useAuthStore()
      const response = await this.$https(`configurations/${auth.userId}`)
      const { success, configurations } = response.data
      if(success) {
        this.configrations = await configurations
      }
    } catch (error) {}
  }
}
