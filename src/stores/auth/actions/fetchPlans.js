export const fetchPlans = {
  async fetchPlans() {
    try {
      const response = await this.$https(`user/${this.userId}/plans`)
      const { plans, success } = response.data
      if(success) this.plans = plans
    } catch(error) {
      throw new Error(error)
    }
  }
}
