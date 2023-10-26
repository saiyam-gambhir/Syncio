<script setup>
import { usePayoutsStore } from 'payouts';
import { useConnectionsStore } from 'connections';
import { useFilters } from '@/composables/filters';
import { usePayouts } from '../../composables/payouts';

/* ----- Data ----- */
const {
  isCreatePayoutDetailsRequested,
  payoutCreationDetails,
  selectedPayoutOrdersStoreName,
} = toRefs(usePayoutsStore());

const {
  formatCurrency,
  formatDate,
} = useFilters();

const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

/* ----- Props ----- */
const props = defineProps({
  payout: {
    type: Object,
    default: {},
  },

  payoutDetails: {
    type: Object,
    required: true
  }
});

/* ----- Methods ----- */
const printHandler = () => {
  window.print();
};
</script>

<template>
  <Sidebar v-model:visible="isCreatePayoutDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center justify-content-between">
        Payout
      </h1>
    </template>

    <div class="grid mt-4">
      <div class="col-12 md:col-12" v-if="payout">

        <CardWrapper class="pb-3">
          <template #content>
            <h3 class="grid mb-0">
              <div class="col-3">Date</div>
              <div class="col-9 font-normal">{{ formatDate(new Date().toJSON()).date }}</div>
            </h3>

            <Divider />

            <h3 class="grid mb-0">
              <div class="col-3">Send to</div>
              <div class="col-9 font-normal">{{ selectedPayoutOrdersStoreName }}</div>
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
                            {{ formatCurrency(payoutDetails.salesTotal) }}
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
                            -{{ formatCurrency(payoutDetails.payoutsCommission) }}
                          </td>
                        </tr>

                        <!-- <tr v-for="item in payout.payout_line_items" class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                          <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            {{ item.name }}
                          </td>
                          <td class="text-light" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            {{ item.description }}
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                            {{ formatCurrency(item.amount) }}
                          </td>
                        </tr> -->

                        <tr class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                          <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1.5rem 0.75rem !important;"></td>
                          <td class="font-bold text-xl" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            Amount due
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="font-bold text-xl text-right tabular-nums" style="padding: 1.5rem 0.75rem !important;">
                            {{ formatCurrency(payoutDetails.payoutsTotal) }}
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
              <li class="line-height-3 text-light">
                To mark as paid later, use <br> <span class="text-primary">Manage Payout</span> in the <span class="text-primary">Unpaid tab</span>
              </li>
              <li>
                <Button
                  style="height: 43px;"
                  outlined
                  class="p-button-success"
                  label="Create">
                </Button>

                <Button
                  style="height: 43px;"
                  class="p-button-success ml-4"
                  label="Create and mark as paid">
                </Button>
              </li>
            </ul>
          </template>
        </CardWrapper>
        <OrdersInvoiced :orders="payoutCreationDetails" />
      </div>
    </div>
  </Sidebar>
</template>
