export const fetchCurrentPlan = {
  async fetchCurrentPlan(userId) {
    const { plan } = await axiosService.getData(`user/${userId}/current-plan`);
    this.plan = await plan;
    if(this.plan) {
      this.selectedPlan = JSON.parse(JSON.stringify(this.plan.syncio_plan));
    } else {
      this.isOnboarding = true;
    }
  },
};
