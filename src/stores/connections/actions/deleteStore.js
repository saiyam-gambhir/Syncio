export const DELETE_STORE = {
  async DELETE_STORE() {
    const { userId } = useAuthStore();
    const response = await axiosService.deleteData(`user/${userId}/stores/${this.storeId}/profile`);
  },
};
