export const fetchCurrentPlan = {
  async fetchCurrentPlan(userId) {
    const response = await this.$https(`user/${userId}/current-plan`);
    this.plan = response.data.plan;
    if(this.plan) {
      this.selectedPlan = JSON.parse(JSON.stringify(this.plan.syncio_plan));
    }
  },
};
