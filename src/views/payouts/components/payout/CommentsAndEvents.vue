<script setup>
import { useFilters } from '@/composables/filters';
import { usePayoutsStore } from 'payouts';

/* ----- Data ----- */
const {
  payoutEvents,
} = toRefs(usePayoutsStore());

const {
  formatDate,
} = useFilters();
</script>

<template>
  <CardWrapper class="mt-5">
    <template #content>
      <h1 class="mb-0">Comments and events</h1>

      <DataTable :value="payoutEvents.data" responsiveLayout="scroll" showGridlines class="mt-5">

        <Column header="Date created" style="width: 15%; padding-top: 1rem !important; padding-bottom: 1rem !important;">
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
    </template>
  </CardWrapper>
</template>
