export const setDateRangeFilter = {
  SET_DATE_RANGE_FILTER(dateRange) {
    this.queries = { ...this.queries, 'filters[date_range]': dateRange }
  }
}
