import router from '@/router'

export const login = {
  async login(payload) {
    const response = await this.$https.post('user/login', { ...payload })
    window.sessionStorage.setItem('ID_TOKEN_KEY', response.headers['x-syncio-app-token']);
    if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {

      this.isAuthenticated = true
      this.$https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`
      router.replace('/')
    }
  }
}
