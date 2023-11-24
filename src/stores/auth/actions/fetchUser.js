export const fetchUser = {
  async fetchUser(userID) {
    const response = await axiosService.getData(`user/${userID}`);
    this.user = await response?.user;
  },
};
