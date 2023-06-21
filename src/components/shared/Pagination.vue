<script setup>
import { onMounted, ref, watch } from 'vue';

/* ----- Components ----- */
import IconPageFirst from '@/components/icons/IconPageFirst.vue';
import IconPageLast from '@/components/icons/IconPageLast.vue';
import IconPageNext from '@/components/icons/IconPageNext.vue';
import IconPagePrev from '@/components/icons/IconPagePrev.vue';

/* ----- Props ----- */
const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
});

/* ----- Data ----- */
const entriesEndingAt = ref(null);
const entriesStartingFrom = ref(null);

/* ----- EMITS ----- */
const emits = defineEmits(['updateCurrentPage']);

/* ----- MOUNTED ----- */
onMounted(() => setEntries());

/* ----- WATCHERS ----- */
watch(
  () => props.pagination,
  (newValue, oldValue) => {
    setEntries();
  }
);

/* ----- Methods ----- */
const goToFirstPage = () => {
  emits('updateCurrentPage', 1);
};

const goToLastPage = () => {
  emits(
    'updateCurrentPage',
    Math.ceil(props.pagination.total_count / props.pagination.per_page)
  );
};

const goToPrevPage = () => {
  emits('updateCurrentPage', +props.pagination.current_page - 1);
};

const goToNextPage = () => {
  emits('updateCurrentPage', +props.pagination.current_page + 1);
};

const setEntries = () => {
  const { current_page, next_page_url, per_page, total_count } =
    props.pagination;
  if (!current_page) return;

  entriesStartingFrom.value = +per_page * +current_page - (+per_page - 1);
  if (total_count < per_page) entriesEndingAt.value = total_count;
  else entriesEndingAt.value = +per_page * +current_page;

  if (!next_page_url) {
    entriesEndingAt.value = total_count;
  }
};
</script>

<template>
  <div class="pagination flex align-items-center justify-content-between" v-if="pagination && pagination.total_count > 0">
    <!-- <h6 class="m-0" v-if="pagination"><span v-if="pagination.total_count > 0">{{ entriesStartingFrom }} - {{ entriesEndingAt }} of</span> {{ pagination.total_count }}</h6> -->
    <ul class="flex pl-0 m-0 w-full">
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
