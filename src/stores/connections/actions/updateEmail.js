export const updateEmail = {
  async updateEmail(email) {
    try {
      this.loadingEmail = true;
      await axiosService.postData(`stores/${this.storeId}`, { email: email });
    } catch (err) {} finally {
      this.loadingEmail = false;
    }
  }
}