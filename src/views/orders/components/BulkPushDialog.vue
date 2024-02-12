<script setup>
/* ----- Data ----- */
const {
  bulkPushCount,
  bulkPushOrders,
  bulkPushShippingCost,
  fetchOrders,
  isBulkPushDialogVisible,
  selectedOrders,
} = toRefs(useOrdersStore());

const existingRules = ref(true);
const showCustomFee = ref(false);
const shippingFee = ref(null);
const bulkPushShippingCostCopy = ref(null);

/* ----- Mounted ----- */
onMounted(() => {
  bulkPushShippingCostCopy.value = bulkPushShippingCost.value;
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isBulkPushDialogVisible.value = false;
};

const onChangeHandler = (type) => {
  switch (type) {
    case 'rules':
      existingRules.value = !existingRules.value;
      showCustomFee.value = !showCustomFee.value;
      break;
    case 'rate':
      showCustomFee.value = !showCustomFee.value;
      existingRules.value = !existingRules.value;
      break;
  }
};

const bulkPushOrdersHandler = async () => {
  if (showCustomFee.value) {
    bulkPushShippingCost.value = shippingFee.value;
  } else {
    bulkPushShippingCost.value = bulkPushShippingCostCopy.value;
  }
  isBulkPushDialogVisible.value = false;
  await bulkPushOrders.value();
  selectedOrders.value = [];
};
</script>
<template>
  <DialogWrapper :isVisible="isBulkPushDialogVisible" :title="`${selectedOrders.length} orders selected for bulk push`"
    width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      
      <div class="flex align-items-center">
        <InputSwitch @click="onChangeHandler('rules')" class="p-2 mt-4" v-model="existingRules" inputId="shipping-rules">
        </InputSwitch>
        <label class="pointer font-semi ml-3 mt-4" for="shipping-rules">Bulk Push With Existing Shipping Rules</label>
      </div>

      <Divider />

      <div class="flex align-items-center">
        <InputSwitch @click="onChangeHandler('rate')" class="p-2 mt-4" v-model="showCustomFee" inputId="custom-rate">
        </InputSwitch>
        <label class="pointer font-semi ml-3 mt-4" for="custom-rate">Bulk Push With Custom Rate</label>
        <InputText v-if="showCustomFee" placeholder="Enter a shipping fee(can be $0)" class="ml-2 mt-4 w-50"
          v-model="shippingFee" type="number">
        </InputText>
      </div>

    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button @click="closeDialogHandler" class="p-button-secondary" label="Cancel">
        </Button>

        <Button @click="bulkPushOrdersHandler" :disabled="!shippingFee && showCustomFee" class="mr-0" label="Push Orders">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
<style>
  /* To remove the arrows in input type="number" */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>