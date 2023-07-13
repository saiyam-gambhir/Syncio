import { useConnectionsStore } from '@/stores/connections';

export const fetchProfiles = {
  async fetchProfiles(page = 1) {
    this.loading = true;
    const connections = useConnectionsStore();
    let storeType = connections.storeType === 'destination' ? 'source' : 'destination';

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

    this.searchQuery = `${new URLSearchParams(this.queries).toString()}`;
    const { data: { profiles, success } } = await this.$https(`stores/coco-profiles?${this.searchQuery ? this.searchQuery : ''}`, {
      params: {
        'filters[excluded_store_ids]': connections.storeId,
        'filters[store_type]': storeType,
        page,
      },
    });

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
