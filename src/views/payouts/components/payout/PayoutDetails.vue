<script setup>
import { useConnectionsStore } from 'connections';
import { useFilters } from '@/composables/filters';
import { usePayouts } from '../../composables/payouts';

/* ----- Data ----- */
const {
  formatCurrency,
  formatDate,
} = useFilters();

const {
  updatePayoutHandler,
} = usePayouts();

const {
  connectionFilterItems,
  isDestinationStore,
} = toRefs(useConnectionsStore());

/* ----- Props ----- */
const props = defineProps({
  payout: {
    type: Object,
    default: {},
  },
});

/* ----- Computed ----- */
const payoutReceiver = computed(() => {
  const storeId = isDestinationStore.value ? props.payout?.source_store_id : props.payout?.destination_store_id;
  const receiver = connectionFilterItems.value.find(receiver => receiver.id === storeId);
  return receiver;
});
</script>

<template>
  <CardWrapper class="pb-3">
    <template #content>
      <h3 class="grid mb-0">
        <div class="col-3">Created on</div>
        <div class="col-9 font-normal">{{ formatDate(payout.updated_at).date }} at {{ formatDate(payout.updated_at).time }}</div>
      </h3>

      <Divider />

      <h3 class="grid mb-0">
        <div class="col-3">Send to</div>
        <div class="col-9 font-normal">{{ payoutReceiver?.store_domain }}</div>
      </h3>

      <Divider />

      <h3 class="grid mb-0">
        <div class="col-3">Amount</div>
        <div class="col-9 font-normal">
          <div class="p-datatable p-component p-datatable-responsive-scroll p-datatable-gridlines" data-scrollselectors=".p-datatable-wrapper" data-pc-name="datatable" data-pc-section="root">
            <div class="p-datatable-wrapper" data-pc-section="wrapper" style="overflow: auto;">
              <table role="table" class="p-datatable-table" data-pc-section="table">
                <thead class="p-datatable-thead" role="rowgroup" data-pc-section="thead" style="position: sticky;">
                  <tr role="row" data-pc-section="headerrow">
                    <th class="" role="columnheader" data-pc-section="headercell" data-pc-name="headercell" data-p-resizable-column="false" data-p-filter-column="false" data-p-reorderable-column="false" style="width: 35%;">
                      <div class="p-column-header-content" data-pc-section="headercontent">
                        <span class="p-column-title" data-pc-section="headertitle">Item</span>
                      </div>
                    </th>
                    <th role="columnheader" data-pc-section="headercell" data-pc-name="headercell" data-p-resizable-column="false" data-p-filter-column="false" data-p-reorderable-column="false" style="width: 35%;">
                      <div class="p-column-header-content" data-pc-section="headercontent">
                        <span class="p-column-title" data-pc-section="headertitle">Description</span>
                      </div>
                    </th>
                    <th role="columnheader" data-pc-section="headercell" data-pc-name="headercell" data-p-resizable-column="false" data-p-filter-column="false" data-p-reorderable-column="false" style="width: 30%;">
                      <div class="p-column-header-content justify-content-end" data-pc-section="headercontent">
                        <span class="p-column-title" data-pc-section="headertitle">Amount($)</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody class="p-datatable-tbody" role="rowgroup" data-pc-section="tbody">
                  <tr class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                    <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      Sales value
                    </td>
                    <td class="text-light" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      Subtotal
                    </td>
                    <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                      {{ formatCurrency(payout.sale_total) }}
                    </td>
                  </tr>

                  <tr class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                    <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      Commission
                    </td>
                    <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      <a href="#" class="btn-link font-normal inline-block">
                        See orders invoiced
                      </a>
                    </td>
                    <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                      -{{ formatCurrency(payout.commission_total) }}
                    </td>
                  </tr>

                  <tr v-for="item in payout.payout_line_items" class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                    <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      {{ item.name }}
                    </td>
                    <td class="text-light" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      {{ item.description }}
                    </td>
                    <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                      {{ formatCurrency(item.amount) }}
                    </td>
                  </tr>

                  <tr class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                    <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1.5rem 0.75rem !important;"></td>
                    <td class="font-bold text-xl" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                      Amount due
                    </td>
                    <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="font-bold text-xl text-right tabular-nums" style="padding: 1.5rem 0.75rem !important;">
                      {{ formatCurrency(payout.payout_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </h3>

      <Divider />

      <ul class="flex justify-content-between list-none p-0 m-0" v-if="isDestinationStore">
        <li>
          <Button
            class="p-button-danger"
            label="Delete">
          </Button>
        </li>
        <li>
          <Button
            v-if="payout.status === 'payout_created' || payout.status === 'unpaid'"
            @click="updatePayoutHandler(payout.id, 'paid')"
            class="p-button-success"
            label="Mark as paid">
          </Button>

          <Button
            v-if="payout.status === 'paid'"
            @click="updatePayoutHandler(payout.id, 'unpaid')"
            class="p-button-warning"
            label="Mark as unpaid">
          </Button>
        </li>
      </ul>
    </template>
  </CardWrapper>
</template>
