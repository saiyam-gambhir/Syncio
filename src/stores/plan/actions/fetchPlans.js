export const fetchPlans = {
  async fetchPlans() {
    try {
      const { userId } = useAuthStore();
      this.loadingPlans = true;
      const { plans, success } = await axiosService.getData(`user/${userId}/plans`);
      if (success) this.plans = plans;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loadingPlans = false;
    }
  }
};
