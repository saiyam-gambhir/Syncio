<script setup>
/* ----- Props ----- */
const props = defineProps({
  disablePerPage: {
    type: Boolean,
    default: false,
  },

  pagination: {
    type: Object,
    required: true,
  },

  perPage: {
    type: Boolean,
    default: false,
  },

  showInfo: {
    type: Boolean,
    default: true
  },

  noWrap: {
    type: Boolean,
    default: false,
  }
});

/* ----- Data ----- */
const entriesEndingAt = ref(null);
const entriesStartingFrom = ref(null);
const perPageOptions = [25, 50, 100];

/* ----- Emits ----- */
const emits = defineEmits(['updateCurrentPage']);

/* ----- Mounted ----- */
onMounted(() => setEntries());

/* ----- Watchers ----- */
watch(() => props.pagination, (newValue, oldValue) => {
  setEntries();
});

/* ----- Methods ----- */
const goToFirstPage = () => {
  emits('updateCurrentPage', 1, props.pagination.per_page);
};

const goToLastPage = () => {
  emits('updateCurrentPage', Math.ceil(props.pagination.total_count / props.pagination.per_page), props.pagination.per_page);
};

const goToPrevPage = () => {
  emits('updateCurrentPage', +props.pagination.current_page - 1, props.pagination.per_page);
};

const goToNextPage = () => {
  emits('updateCurrentPage', +props.pagination.current_page + 1, props.pagination.per_page);
};

const setEntries = () => {
  const { current_page, next_page_url, per_page, total_count } = props.pagination;
  if (!current_page) return;

  const currentPage = +current_page;
  const perPage = +per_page;
  entriesStartingFrom.value = perPage * currentPage - (perPage - 1);
  entriesEndingAt.value = total_count < perPage ? total_count : perPage * currentPage;

  if (!next_page_url) entriesEndingAt.value = total_count;
};
</script>

<template>
  <div class="pagination flex align-items-center justify-content-between" v-if="pagination && pagination.total_count > 0">
    <h4 class="m-0 font-semibold" v-if="pagination && showInfo" :style="{ 'white-space': noWrap ? 'nowrap' : 'normal', 'padding-right': noWrap ? '1.2rem' : '0'}">
      <Dropdown
        :disabled="disablePerPage"
        :options="perPageOptions"
        @change="goToFirstPage"
        class="p-inputtext-sm mr-3"
        v-if="perPage"
        v-model="pagination.per_page">
      </Dropdown>
      <span v-if="pagination.total_count > 0">{{ entriesStartingFrom }} - {{ entriesEndingAt }} of</span> {{ pagination.total_count }} Entries
    </h4>

    <slot name="footer"></slot>

    <ul class="flex pl-0 m-0 pagination__actions">
      <li class="page pagination__first" @click="goToFirstPage" :class="{ disabled: !pagination.previous_page_url }">
        <IconPageFirst />
      </li>
      <li class="page pagination__prev" @click="goToPrevPage" :class="{ disabled: !pagination.previous_page_url }">
        <IconPagePrev />
      </li>
      <li class="page pagination__page">
        {{ pagination.current_page }}
      </li>
      <li class="page pagination__next" @click="goToNextPage" :class="{ disabled: !pagination.next_page_url }">
        <IconPageNext />
      </li>
      <li class="page pagination__last" @click="goToLastPage" :class="{ disabled: !pagination.next_page_url }">
        <IconPageLast />
      </li>
    </ul>
  </div>
</template>
