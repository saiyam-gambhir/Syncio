<script setup>
/* ----- Data ----- */
const {
  bulkPushOrders,
  bulkPushShippingCost,
  fetchOrders,
  isBulkPushDialogVisible,
  selectedOrders,
} = toRefs(useOrdersStore());

const showCustomFee = ref(false);
const shippingFee = ref(null);

/* ----- Computed ----- */
const existingRules = computed(() => !showCustomFee.value);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isBulkPushDialogVisible.value = false;
};

const onChangeHandler = () => {
  showCustomFee.value = !showCustomFee.value;
};

const bulkPushOrdersHandler = async () => {
  if (showCustomFee.value) {
    bulkPushShippingCost.value = shippingFee.value;
  } else {
    bulkPushShippingCost.value = null;
  }

  await bulkPushOrders.value();
  
  closeDialogHandler();
  selectedOrders.value = [];

  await fetchOrders.value();
};
</script>
<template>
  <DialogWrapper :isVisible="isBulkPushDialogVisible" :title="`${selectedOrders.length} orders selected for bulk push`"
    width="550px" @closeDialog="closeDialogHandler">
    <template #body>
      
      <div class="flex align-items-center">
        <InputSwitch @click="onChangeHandler" class="p-2 mt-4" :modelValue="existingRules" inputId="shipping-rules">
        </InputSwitch>
        <label class="pointer font-semi ml-3 mt-4" for="shipping-rules">Bulk Push With Existing Shipping Rules</label>
      </div>

      <Divider />

      <div class="flex align-items-center">
        <InputSwitch @click="onChangeHandler" class="p-2 mt-4" v-model="showCustomFee" inputId="custom-rate">
        </InputSwitch>
        <label class="pointer font-semi ml-3 mt-4" for="custom-rate">Bulk Push With Custom Rate</label>
        <InputText v-if="showCustomFee" placeholder="Enter a shipping fee (can be $0)" class="ml-2 mt-4 w-50"
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