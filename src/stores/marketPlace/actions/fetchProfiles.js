export const fetchProfiles = {
  async fetchProfiles(page = 1) {
    this.loading = true;
    let storeType = this.storeType === 'destination' ? 'source' : 'destination';

    for (let param in this.queries) {
      if (
        this.queries[param] === undefined ||
        this.queries[param] === null ||
        this.queries[param] === '' ||
        this.queries[param] === 'All'
      ) {
        delete this.queries[param];
      }
    }

    const sortByFilter = this.queries['sortBy'] === 'date_new_to_old' ? 'date_new_to_old' : 'date_old_to_new';

    const params = {
      'filters[category]': this.queries['filters[category]'],
      'filters[country_name]': this.queries['filters[country_name]']?.name,
      'filters[excluded_store_ids]': this.storeId,
      'filters[product_count]': this.queries['filters[product_count]'],
      'filters[store_type]': storeType,
      'limiter': 16,
      'page': typeof(page) === 'object' ? 1 : page,
      [sortByFilter]: true,
    };

    const { profiles, success } = await axiosService.getData(`stores/coco-profiles`, params);

    if (success) {
      const { current_page, data, next_page_url, prev_page_url, total } = profiles;
      const pagination = {
        current_page: current_page,
        next_page_url: next_page_url,
        previous_page_url: prev_page_url,
        per_page: this.queries.limiter,
        total_count: total,
      };
      this.profiles = data;
      this.pagination = pagination;
    }

    this.loading = false;
  },
};
