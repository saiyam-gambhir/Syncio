<script setup>
/* ----- Data ----- */
const {
  fetchPayoutEvents,
  payoutEvents,
  loadingPayoutEvents,
} = toRefs(usePayoutsStore());

const {
  formatDate,
} = useFilters();

/* ----- Props ----- */
const props = defineProps({
  payout: {
    type: Object,
    default: {},
  },
});

/* ----- Methods ----- */
const loadMoreEventsHandler = async () => {
  loadingPayoutEvents.value = true;
  await fetchPayoutEvents.value(props.payout.id, payoutEvents.value.pagination?.nextPage);
  loadingPayoutEvents.value = false;
};
</script>

<template>
  <CardWrapper class="mt-5">
    <template #content>
      <h1 class="mb-0">Comments and events</h1>

      <Comment :payoutId="payout.id" />

      <DataTable :value="payoutEvents.data" responsiveLayout="scroll" showGridlines class="mt-5">

        <Column header="Date created (AEST)" style="width: 15%; padding-top: 1rem !important; padding-bottom: 1rem !important;">
          <template #body="{ data: { created_at } }">
            {{ formatDate(created_at).date }} {{ formatDate(created_at).time }}
          </template>
        </Column>

        <Column header="Type" style="width: 10%">
          <template #body="{ data: { type } }">
            <span v-if="type === 'comment'">Comment</span>
            <span v-else>Event</span>
          </template>
        </Column>

        <Column header="Store" style="width: 25%">
          <template #body="{ data: { actor } }">
            {{ actor }}
          </template>
        </Column>

        <Column header="Details" style="width: 50%">
          <template #body="{ data: { body } }">
            {{ body }}
          </template>
        </Column>
      </DataTable>

      <Button
        :loading="loadingPayoutEvents"
        @click="loadMoreEventsHandler"
        class="p-button-lg mt-4"
        label="Load more events"
        outlined
        v-if="payoutEvents.pagination?.nextPage">
      </Button>
    </template>
  </CardWrapper>
</template>
