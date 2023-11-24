export const fetchCurrentPlan = {
  async fetchCurrentPlan(userId) {
    const response = await axiosService.getData(`user/${userId}/current-plan`);
    this.plan = await response?.plan;
    if(this.plan) {
      this.selectedPlan = JSON.parse(JSON.stringify(this.plan.syncio_plan));
    } else {
      this.isOnboarding = true;
    }
  },
};
