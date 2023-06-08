export const setStatusFilter = {
  SET_STATUS_FILTER(status) {
    this.queries = { ...this.queries, 'filters[status]': status }
  }
}
