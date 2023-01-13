<script setup>
import { ref, computed } from 'vue'
import { useConnectionsStore } from '@/stores/connections'
import { useVuelidate } from "@vuelidate/core";
import { required } from '@vuelidate/validators'

/* ===== COMPONENTS ===== */
import DialogWrapper from '@/components/shared/DialogWrapper.vue'

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const fixedRate = ref(0)
const isFixedRateSelected = ref(false)
const isPercentageSelected = ref(true)
const percentageRate = ref(0)
const rules = computed(() => ({
  fixedRate: {
    required
  },
  percentageRate: {
    required
  }
}))
const v$ = useVuelidate(rules, { fixedRate, percentageRate })

/* ===== METHODS ===== */
const closeDialogHandler = () => {
  connectionsStore.isSetCommissionRequested = false
}
</script>

<template>
  <DialogWrapper :isVisible="connectionsStore.isSetCommissionRequested" title="Set commission" width="750px" @closeDialog="closeDialogHandler">
    <template #body>
      <section class="grid">
        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-card shadow-2 border-round p-4">
            <div class="flex align-items-center w-full mb-4">
              <InputSwitch v-model="isPercentageSelected" inputId="percentageCommission" class="mr-3" />
              <label for="percentageCommission">Percentage Commission</label>
            </div>

            <InputNumber v-model="v$.fixedRate.$model" suffix="%" class="w-100" />
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-6">
          <div class="surface-card shadow-2 border-round p-4">
            <div class="flex align-items-center w-full mb-4">
              <InputSwitch v-model="isFixedRateSelected" inputId="fixedPriceCommission" class="mr-3" />
              <label for="fixedPriceCommission">Fixed Price Commission</label>
            </div>
            <InputNumber v-model="v$.percentageRate.$model" mode="currency" currency="USD" locale="en-US" class="w-100" />
          </div>
        </div>
      </section>
    </template>
  </DialogWrapper>
</template>
