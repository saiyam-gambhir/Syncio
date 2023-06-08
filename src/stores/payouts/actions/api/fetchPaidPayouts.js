export const fetchPaidPayouts = {
  async fetchPaidPayouts(page = 1, storeId) {
    try {
      const { data: { payouts, success } } = await this.$https(`stores/payout/all-payout-data/${storeId}?${new URLSearchParams(this.queries).toString()}`, {
        params: {
          limiter: this.limiter,
          page
        }
      })
      if(success && payouts?.length > 0) {
        this.paidPayouts.items = payouts
      }
    } catch (error) {
      throw new Error(error)
    } finally {
      this.paidPayouts.loading = false
    }
  }
}
