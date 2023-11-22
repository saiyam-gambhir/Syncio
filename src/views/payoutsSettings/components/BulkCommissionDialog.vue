<script setup>
/* ----- Props ----- */
const props = defineProps({
  items: {
    type: Array,
    required: true
  },

  itemType: {
    type: String,
    required: true
  },
});

const {
  bulkCommission,
  bulkCommissionsUpdate,
  commissionTypeOptions,
  isBulkCommissionUpdateRequested,
  loadingBulkCommissions,
} = toRefs(usePayoutsSettingsStore());

/* ----- Methods ----- */
const getTitle = () => {
  return `Set commission for ${props.items.length} ${props.items.length <= 1 ? props.itemType : props.itemType}s`
};

const getDefaultCommissionType = (connectionType) => {
  return connectionType === 'percentage' ? '%' : '$';
};

const closeDialogHandler = () => {
  isBulkCommissionUpdateRequested.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isBulkCommissionUpdateRequested" :title="getTitle()" width="500px" @closeDialog="closeDialogHandler">
    <template #body>
      <Dropdown
        :options="commissionTypeOptions"
        optionLabel="name"
        optionValue="type"
        class="w-100"
        placeholder="Select type"
        v-model="bulkCommission.type">
      </Dropdown>

      <div class="p-inputgroup mt-4 w-50">
        <InputNumber
          :maxFractionDigits="2"
          :useGrouping="false"
          class="w-50"
          placeholder="Enter Rate"
          v-model="bulkCommission.val">
        </InputNumber>
        <span class="p-inputgroup-addon">{{ getDefaultCommissionType(bulkCommission.type) }}</span>
      </div>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <Button
          @click="closeDialogHandler"
          class="p-button-secondary p-button-sm"
          label="Cancel">
        </Button>

        <Button
          :loading="loadingBulkCommissions"
          @click="bulkCommissionsUpdate(items, itemType, true);"
          class="mr-0"
          label="Confirm">
        </Button>
      </div>
    </template>
  </DialogWrapper>
</template>
