export const fetchUser = {
  async fetchUser(userID) {
    const response = await this.$https(`user/${userID }`)
    this.user = response.data.user
  }
}
