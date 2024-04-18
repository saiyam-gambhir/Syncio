<script setup>
import { useConfirm } from 'primevue/useconfirm';

/* ----- Data ----- */
const confirm = useConfirm();

const {
  formatCurrency,
  formatDate,
} = useFilters();

const {
  confirmPayout,
  deletePayout,
  loadingDeletePayout,
} = toRefs(usePayoutsStore());

const {
  scrollToOrdersSection,
  updatePayoutHandler,
} = usePayouts();

const {
  connectionFilterItems,
  isDestinationStore,
  isSourceStore,
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

const getFinalPayoutAmount = () => {
  const initialValue = 0;
  const lineItemsSum = props.payout?.payout_line_items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), initialValue);
  return props.payout?.payout_total + Number(Number(lineItemsSum).toFixed(2));
};

const confirmDeletePayoutHandler = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this payout?',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger p-button-sm',
    accept: () => {
      deletePayout.value(props.payout.id);
    },
    reject: () => {}
  });
};
</script>

<template>
  <CardWrapper class="pb-3">
    <template #content>
      <h3 class="grid mb-0">
        <div class="col-3">Created on</div>
        <div class="col-9 font-normal">{{ formatDate(payout.updated_at).date }}</div>
      </h3>

      <Divider />

      <h3 class="grid mb-0 mt-1">
        <div class="col-3">Send to</div>
        <template v-if="payoutReceiver?.store_name">
          <div class="col-9 font-normal flex flex-column">
            <span>{{ payoutReceiver.store_name }}</span>
            <span class="mt-1 text-small">{{ payoutReceiver.store_domain }}</span>
          </div>
        </template>
        <template v-else>
          <div class="col-9 font-normal">{{ payoutReceiver?.store_domain }}</div>
        </template>
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
                      <a href="#" class="btn-link font-normal inline-block" @click="scrollToOrdersSection">
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
                      {{ formatCurrency(getFinalPayoutAmount()) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p v-if="isDestinationStore" class="text-light mb-2">You still need to pay the supplier using your chosen payment method outside of Syncio.</p>
          <p v-if="isSourceStore" class="text-light mb-2">This is a record of payout only. You'll need to check you've received payment outside of Syncio.</p>
        </div>
      </h3>

      <Divider v-if="payout.status !== 'payment_confirmed'" />

      <ul class="flex align-items-center justify-content-between list-none p-0 m-0" v-if="isDestinationStore">
        <li v-if="payout.status !== 'payment_confirmed'">
          <ConfirmPopup></ConfirmPopup>
          <Button
            :loading="loadingDeletePayout"
            @click="confirmDeletePayoutHandler($event)"
            class="p-button-danger"
            label="Delete payout">
          </Button>
        </li>
        <li>
          <Button
            v-if="payout.status === 'payout_created' || payout.status === 'unpaid'"
            @click="updatePayoutHandler(payout.id, 'paid')"
            class="p-button-success p-button-lg"
            label="Mark as paid">
          </Button>

          <Button
            v-if="payout.status === 'paid'"
            @click="updatePayoutHandler(payout.id, 'unpaid')"
            class="p-button-warning p-button-lg"
            label="Mark as unpaid">
          </Button>
        </li>
      </ul>

      <ul class="flex justify-content-end list-none p-0 m-0" v-if="isSourceStore">
        <li>
          <Button
            v-if="payout.status === 'payout_created' || payout.status === 'paid'"
            @click="confirmPayout(payout.id)"
            class="p-button-success p-button-lg"
            label="Payment received">
          </Button>
        </li>
      </ul>
    </template>
  </CardWrapper>
</template>
