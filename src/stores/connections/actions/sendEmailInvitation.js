export const sendEmailInvitation = {
  async sendEmailInvitation(payload) {
    const response = this.$https.post('stores/invite-to-connect', { ...payload })
  }
}
