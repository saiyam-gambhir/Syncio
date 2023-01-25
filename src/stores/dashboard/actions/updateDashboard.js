export const updateDashboard = {
  async updateDashboard(payload, storeId) {
    this.loading = true
    const { add_ons, helpful_articles, learn_the_basics } = payload
    if(!add_ons) payload.add_ons = false
    if(!helpful_articles) payload.helpful_articles = false
    if(!learn_the_basics) payload.learn_the_basics = false

    const response = await this.$https.post('stores/update-dashboard-content', {
      ...payload,
      current_store_id: storeId
    })

    await this.fetchDashboard(storeId)
  }
}
