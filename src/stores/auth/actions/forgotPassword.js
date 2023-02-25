export const forgotPassword = {
  async forgotPassword(email) {
    const response = await this.$https.post('forgot-password', { email })
    return response
  }
}
