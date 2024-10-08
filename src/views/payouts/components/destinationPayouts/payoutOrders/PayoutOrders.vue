<script setup>
/* ----- Data ----- */
const {
  formatCurrency,
} = useFilters();

const {
  fetchPayoutOrdersHandler,
  fetchPayoutPreviewHandler,
} = usePayouts();

const {
  isCreatePayoutDetailsRequested,
  payoutOrders,
  selectedPayoutOrders,
  selectedPayoutOrdersStore,
} = toRefs(usePayoutsStore());

const {
  isCheckboxSelected,
  onInputHandler,
} = useCheckbox();

/* ----- Computed ----- */
const arePayoutOrdersSelected = computed(() => {
  return selectedPayoutOrders.value?.length > 0;
});

const selectedPayoutsDetails = computed(() => {
  const initialValues = { payoutsCommission: 0, payoutsTotal: 0, salesTotal: 0, taxTotal: 0 };

  return selectedPayoutOrders.value.reduce((accumulator, order) => {
    return {
      payoutsCommission: accumulator.payoutsCommission + +order.commission,
      payoutsTotal: accumulator.payoutsTotal + +order.payout_amount,
      salesTotal: accumulator.salesTotal + +order.sales,
      taxTotal: accumulator.taxTotal + +order.tax,
    };
  }, initialValues);
});

/* ----- Methods ----- */
const clearSelectionHandler = () => {
  selectedPayoutOrders.value = [];
};

const isRowSelectedHandler = (data) => {
  return isCheckboxSelected(data, selectedPayoutOrders.value, 'order_id');
};

const updateCurrentPageHandler = page => {
  fetchPayoutOrdersHandler(page, selectedPayoutOrdersStore.value);
};
</script>

<template>

  <template v-if="arePayoutOrdersSelected">
    <div class="py-4 flex">
      <CardWrapper style="width: 12.5rem;">
        <template #content>
          <h2 class="m-0 font-semibold">{{ selectedPayoutOrders?.length }}</h2>
          <h3 class="m-0 mt-2 font-normal">{{ selectedPayoutOrders?.length > 1 ? 'Orders' : 'Order' }} selected</h3>
        </template>
      </CardWrapper>

      <CardWrapper style="width: 15rem;" class="ml-4">
        <template #content>
          <h2 class="m-0 font-semibold">{{ formatCurrency(selectedPayoutsDetails.payoutsTotal) }}</h2>
          <h3 class="m-0 mt-2 font-normal">Payout total</h3>
        </template>
      </CardWrapper>

      <CardWrapper style="width: 15rem;" class="ml-4">
        <template #content>
          <h2 class="m-0 font-semibold">{{ formatCurrency(selectedPayoutsDetails.payoutsCommission) }}</h2>
          <h3 class="m-0 mt-2 font-normal">Commissions</h3>
        </template>
      </CardWrapper>
    </div>
    <Button
      @click="fetchPayoutPreviewHandler(null)"
      class="p-button-success mb-4"
      style="align-self: flex-end; height: 50px; width: 29rem; font-size: 1.25rem;"
      label="Create payout">
    </Button>

    <Button
      @click="clearSelectionHandler"
      class="ml-4"
      icon="pi pi-times"
      rounded
      outlined
      style="vertical-align: top !important; margin-top: .45rem;"
      size="10px"
      v-tooltip.bottom="'Clear selection'">
    </Button>
  </template>

  <PayoutOrdersSkeleton v-if="payoutOrders?.loading" />

  <DataTable v-else :value="payoutOrders?.items" responsiveLayout="scroll" showGridlines :rowClass="isRowSelectedHandler">
    <template #empty>
      <div class="px-4 py-8 text-center">
        <h2 class="mt-0 mb-4">Payouts Not Found!</h2>
      </div>
    </template>

    <template #header>
      <PayoutOrdersHeader />
    </template>

    <Column style="width: 5%">
      <template #body="{ data }">
        <CheckboxWrapper
          :isChecked="isCheckboxSelected(data, selectedPayoutOrders, 'order_id') === 'selected'"
          @onInput="onInputHandler(data, selectedPayoutOrders, 'order_id')">
        </CheckboxWrapper>
      </template>
    </Column>

    <Column header="Date (AEST)" style="width: 15%">
      <template #body="{ data: { date } }">
        {{ date }}
      </template>
    </Column>

    <Column header="Age" style="width: 12.5%;">
      <template #body="{ data: { age } }">
        {{ age }}
      </template>
    </Column>

    <Column header="Order #" style="width: 12.5%">
      <template #body="{ data: { order_number } }">
        {{ order_number }}
      </template>
    </Column>

    <Column header="Sales" style="width: 12.5%">
      <template #body="{ data: { sales } }">
        <span class="tabular-nums">
          {{ formatCurrency(sales) }}
        </span>
      </template>
    </Column>

    <Column header="Commission" style="width: 12.5%;">
      <template #body="{ data: { commission } }">
        <span class="tabular-nums display-commission">+ {{ formatCurrency(commission) }}</span>
      </template>
    </Column>

    <Column header="Payout amount" style="width: 12.5%">
      <template #body="{ data: { payout_amount } }">
        <strong class="tabular-nums">{{ formatCurrency(payout_amount) }}</strong>
      </template>
    </Column>

    <Column header="Actions" style="width: 17.5%" class="text-right">
      <template #body="{ data }">
        <span v-if="arePayoutOrdersSelected" v-tooltip.top="'Clear bulk selection to create single order payout.'" class="inline-block">
          <Button
            disabled
            class="p-button-sm p-button-success"
            label="Create payout">
          </Button>
        </span>
        <Button
          v-else
          @click="fetchPayoutPreviewHandler(data)"
          class="p-button-sm p-button-success"
          label="Create payout">
        </Button>
      </template>
    </Column>
  </DataTable>

  <Pagination
    :pagination="payoutOrders.pagination"
    @updateCurrentPage="updateCurrentPageHandler"
    v-if="payoutOrders?.pagination">
  </Pagination>

  <CreatePayout v-if="isCreatePayoutDetailsRequested" :payoutDetails="selectedPayoutsDetails" />
</template>
