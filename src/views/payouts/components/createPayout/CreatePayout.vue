<script setup>
/* ----- Data ----- */
const {
  isCreatePayoutDetailsRequested,
  loadingCreatePayout,
  payoutCreationDetails,
  selectedPayoutOrdersStoreDetails,
} = toRefs(usePayoutsStore());

const {
  createPayoutHandler,
  scrollToOrdersSection,
} = usePayouts();

const {
  formatCurrency,
  formatDate,
} = useFilters();

const {
  isDestinationStore,
} = toRefs(useConnectionsStore());

const lineItems = ref([]);
const payoutTotal = ref(0);

/* ----- Mounted ----- */
onMounted(() => {
  getFinalPayoutValue();
});

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
const addLineItemHandler = () => {
  lineItems.value.push({
    amount: '',
    description: '',
    name: '',
  });
};

const clearLineItemHandler = (index) => {
  const LINE_ITEM = lineItems.value[index];
  const INDEX = lineItems.value.indexOf(LINE_ITEM);
  lineItems.value.splice(INDEX, 1);
  getFinalPayoutValue();
};

const getFinalPayoutValue = () => {
  const initialValue = 0;
  const lineItemsSum = lineItems.value.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), initialValue);
  payoutTotal.value = props.payoutDetails.payoutsTotal + Number(Number(lineItemsSum).toFixed(2));
};
</script>

<template>
  <Sidebar v-model:visible="isCreatePayoutDetailsRequested" position="right" class="w-sidebar">
    <template #header>
      <h1 class="text-4xl font-bold mb-0 flex align-items-center justify-content-between">
        Payout
      </h1>
    </template>

    <!----- Spinner ----->
    <div v-if="loadingCreatePayout" class="flex align-items-center justify-content-center h-100">
      <Spinner />
    </div>

    <!----- Payout ----->
    <div v-else class="grid mt-4">
      <div class="col-12 md:col-12">

        <CardWrapper class="pb-3">
          <template #content>
            <h3 class="grid mb-0">
              <div class="col-3">Date</div>
              <div class="col-9 font-normal">{{ formatDate(new Date().toJSON()).date }}</div>
            </h3>

            <Divider />

            <h3 class="grid mb-0 mt-1">
              <div class="col-3">Send to</div>
              <template v-if="selectedPayoutOrdersStoreDetails?.store_name">
                <div class="col-9 font-normal flex flex-column">
                  <span>{{ selectedPayoutOrdersStoreDetails.store_name }}</span>
                  <span class="mt-1 text-small">{{ selectedPayoutOrdersStoreDetails.store_domain }}</span>
                </div>
              </template>
              <template v-else>
                <div class="col-9 font-normal">{{ selectedPayoutOrdersStoreDetails?.store_domain }}</div>
              </template>
            </h3>

            <Divider />

            <h3 class="grid mb-0 mt-1">
              <div class="col-3">Amount</div>
              <div class="col-9 font-normal">
                <div class="p-datatable p-component p-datatable-responsive-scroll p-datatable-gridlines" data-scrollselectors=".p-datatable-wrapper" data-pc-name="datatable" data-pc-section="root">
                  <div class="p-datatable-wrapper" data-pc-section="wrapper" style="overflow: auto;">
                    <table role="table" class="p-datatable-table" data-pc-section="table">
                      <thead class="p-datatable-thead" role="rowgroup" data-pc-section="thead" style="position: sticky;">
                        <tr role="row" data-pc-section="headerrow">
                          <th></th>
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
                          <td></td>
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
                          <td></td>
                          <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            Commission
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            <a href="#" class="btn-link font-normal inline-block" @click="scrollToOrdersSection">
                              See orders invoiced
                            </a>
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                            -{{ formatCurrency(payoutDetails.payoutsCommission) }}
                          </td>
                        </tr>

                        <tr v-for="(item, index) in lineItems" class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                          <td>
                            <Button
                              @click="clearLineItemHandler(index)"
                              class="p-button-sm"
                              icon="pi pi-trash"
                              rounded
                              outlined
                              style="width: 30px; height: 30px;"
                              v-tooltip.bottom="'Delete'">
                            </Button>
                          </td>
                          <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            <InputText
                              class="p-inputtext-sm w-full"
                              placeholder="Enter item name"
                              v-model="item.name">
                            </InputText>
                          </td>
                          <td class="text-light" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            <InputText
                              class="p-inputtext-sm w-full"
                              placeholder="Enter description"
                              v-model="item.description">
                            </InputText>
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                            <InputText
                              class="p-inputtext-sm w-50 text-right"
                              placeholder="0.00"
                              @blur="getFinalPayoutValue"
                              v-model="item.amount">
                            </InputText>
                          </td>
                        </tr>

                        <tr class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                          <td></td>
                          <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            <a href="#" class="btn-link font-normal inline-block" @click="addLineItemHandler">
                              Add another line item
                            </a>
                          </td>
                          <td class="text-light" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            e.g. taxes, shipping, deductions etc
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="text-right tabular-nums" style="padding: 1rem 0.75rem !important;">
                          </td>
                        </tr>

                        <tr class="p-datatable-emptymessage" role="row" data-pc-section="emptymessage">
                          <td></td>
                          <td class="font-bold" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1.5rem 0.75rem !important;"></td>
                          <td class="font-bold text-xl" role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" style="padding: 1rem 0.75rem !important;">
                            Amount due
                          </td>
                          <td role="cell" data-pc-section="bodycell" data-pc-name="bodycell" data-p-selection-column="false" data-p-editable-column="false" data-p-cell-editing="false" class="font-bold text-xl text-right tabular-nums" style="padding: 1.5rem 0.75rem !important;">
                            {{ formatCurrency(payoutTotal) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p v-if="isDestinationStore" class="text-light mb-2">You still need to pay the supplier using your chosen payment method outside of Syncio.</p>
              </div>
            </h3>

            <Divider />

            <ul class="flex justify-content-between list-none p-0 m-0" v-if="isDestinationStore">
              <li class="line-height-3 text-light">
                To mark as paid later, use <br> <span class="text-primary">Manage Payout</span> in the <span class="text-primary">Unpaid tab</span>
              </li>
              <li>
                <Button
                  :loading="loadingCreatePayout"
                  @click="createPayoutHandler(lineItems, payoutDetails, false)"
                  class="p-button-success"
                  label="Create"
                  outlined
                  style="height: 43px;">
                </Button>

                <Button
                  :loading="loadingCreatePayout"
                  @click="createPayoutHandler(lineItems, payoutDetails, true)"
                  class="p-button-success ml-4"
                  label="Create and mark as paid"
                  style="height: 43px;">
                </Button>
              </li>
            </ul>
          </template>
        </CardWrapper>

        <OrdersInvoiced :orders="payoutCreationDetails" isPayoutCreate />
      </div>
    </div>
  </Sidebar>
</template>
