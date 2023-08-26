import { useAuthStore } from 'auth';

export const fetchPlans = {
  async fetchPlans() {
    try {
      if(this.plans) return;
      const { userId } = useAuthStore();
      this.loadingPlans = true;
      const response = await this.$https(`user/${userId}/plans`);
      const { plans, success } = response.data;
      if (success) this.plans = plans;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loadingPlans = false;
    }
  }
};
