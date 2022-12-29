export const fetchCurrentPlan = {
  async fetchCurrentPlan(userId) {
    const response = await this.$https(`user/${userId}/current-plan`)
    this.plan = response.data.plan
  }
}
