<script setup>
import { useConnectionsStore } from 'connections';
import { usePayoutSettingsStore } from 'payoutSettings';
import { watch } from 'vue';

/* ----- Data ----- */
const {
  storeDefaultCommission
} = toRefs(useConnectionsStore());

const {
  commissionTypeOptions,
  storeDefaultCommissionRate,
  updateStoreCommission,
} = toRefs(usePayoutSettingsStore());

const storeDefaultCommissionRateCopy = ref(null);
const isDefaultCommissionChanged = ref(false);

/* ----- Mounted ----- */
onMounted(() => {
  storeDefaultCommissionRate.value = structuredClone(toRaw(storeDefaultCommission.value));
  storeDefaultCommissionRateCopy.value = structuredClone(toRaw(storeDefaultCommissionRate.value));
});

/* ----- Computed ----- */
const defaultCommissionType = computed(() => {
  return storeDefaultCommissionRate?.value.type === 'percentage' ? '%' : '$';
});

/* ----- Watch ----- */
watch(storeDefaultCommissionRate, () => {
  isDefaultCommissionChanged.value = JSON.stringify(storeDefaultCommissionRate.value) !== JSON.stringify(storeDefaultCommissionRateCopy.value);
}, { deep: true });

/* ----- Methods ----- */
const cancelHandler = () => {
  storeDefaultCommissionRate.value = structuredClone(toRaw(storeDefaultCommission.value));
};
</script>

<template>
  <CardWrapper>
    <template #content>
      <div class="grid">
        <div class="col-6">
          <h3>Commission type</h3>
          <p class="text-lg text-light line-height-3 m-0">If no Store or Product Commission is set, Syncio will use the <br> Default Commission rate for Payout calculations</p>
        </div>
        <div class="col-3">
          <Dropdown
            :options="commissionTypeOptions"
            class="w-full"
            optionLabel="name"
            optionValue="type"
            placeholder="Select type"
            v-model="storeDefaultCommissionRate.type">
          </Dropdown>

          <div class="p-inputgroup w-50 mt-4">
            <InputNumber
              :disabled="!storeDefaultCommissionRate.type"
              :maxFractionDigits="2"
              :useGrouping="false"
              placeholder="Enter Rate"
              v-model="storeDefaultCommissionRate.value">
            </InputNumber>
            <span class="p-inputgroup-addon">{{ defaultCommissionType }}</span>
          </div>
        </div>
      </div>

      <Divider />

      <div class="flex justify-content-end pt-1">
        <Button @click="cancelHandler" :disabled="!isDefaultCommissionChanged" outlined label="Cancel" class="mr-3" style="width: 80px;"></Button>
        <Button @click="updateStoreCommission" :disabled="!isDefaultCommissionChanged" label="Save" width="80px" style="width: 100px;"></Button>
      </div>
    </template>
  </CardWrapper>
</template>
