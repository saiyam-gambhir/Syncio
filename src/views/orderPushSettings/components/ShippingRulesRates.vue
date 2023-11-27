<script setup>
/* ----- Data ----- */
const newShipping = ref({ rate: null, value: null });

const {
  formatCurrency,
} = useFilters();

const {
  isPushOrderShippingRulesChanged,
  loadingSettings,
  pushOrderShippingRules,
  stringifyPushOrderShippingRules,
  updatePushSettings,
} = toRefs(useOrdersStore());

watch(pushOrderShippingRules, (newValue, oldValue) => {
  if(newValue) {
    isPushOrderShippingRulesChanged.value = JSON.stringify(newValue) !== stringifyPushOrderShippingRules.value;
  }
}, { deep: true });

/* ----- Methods ----- */
const cancelHandler = () => {
  pushOrderShippingRules.value = JSON.parse(stringifyPushOrderShippingRules.value);
};

const updatePushSettingsHandler = async () => {
  const { id, value } = pushOrderShippingRules.value;
  await updatePushSettings.value(value, id);
  isPushOrderShippingRulesChanged.value = false;
};

const deleteShippingRuleHandler = (index) => {
  pushOrderShippingRules.value.value.splice(index, 1);
};

const addShippingRuleHandler = () => {
  pushOrderShippingRules.value.value.push({
    min_order_total: newShipping.value.rate,
    shipping_cost: newShipping.value.value
  })

  pushOrderShippingRules.value.value.sort((a, b) => {
    return a.min_order_total - b.min_order_total;
  });

  newShipping.value = { rate: null, value: null };
};
</script>

<template>
  <p class="line-height-3 mb-5 mt-1 px-3 text-lg">
    By default, we will auto push orders with $0 shipping fees to source stores.<br>
    Manage and set rules below if you want to push orders with a flat rate based on order value.<br>
    Note that this rate will be sent to the source store with your store's local currency.
  </p>

  <CardWrapper v-if="pushOrderShippingRules">
    <template #content>
      <ul class="list-none p-0 m-0">
        <li class="flex align-items-center pt-3">
          <h3 class="w-5">Shipping Rates</h3>
          <h3 class="w-5">Order Value</h3>
          <h3 class="w-2"></h3>
        </li>

        <li class="flex align-items-center py-3 border-top-1 surface-border">
          <div class="w-5">
            <InputNumber
              :maxFractionDigits="2"
              :useGrouping="false"
              class="w-50"
              min="0"
              placeholder="A$ 0.00"
              v-model="newShipping.rate">
            </InputNumber>
          </div>
          <div class="w-5">
            <InputNumber
              :maxFractionDigits="2"
              :useGrouping="false"
              class="w-50"
              min="0"
              placeholder="A$ Min"
              v-model="newShipping.value">
            </InputNumber>
          </div>
          <div class="w-2 text-right">
            <span v-if="!newShipping.rate || !newShipping.value" v-tooltip.left="'To add new rule please fill shipping rate and order value fields.'" class="inline-block">
              <Button
                :disabled="!newShipping.rate || !newShipping.value"
                class="p-button-success p-button-sm"
                label="Add"
                style="width: 66.5px;">
              </Button>
            </span>
            <Button
              v-else
              @click="addShippingRuleHandler"
              class="p-button-success p-button-sm"
              label="Add"
              style="width: 66.5px;">
            </Button>
          </div>
        </li>

        <li v-for="(shippingRule, index) in pushOrderShippingRules.value" :key="index" class="flex align-items-center py-3 border-top-1 surface-border">
          <div class="w-5">{{ formatCurrency(shippingRule.shipping_cost) }}</div>
          <div class="w-5">
            <span v-if="(typeof(pushOrderShippingRules.value[index + 1]) != 'undefined')" class="ml-1">
              {{ formatCurrency(shippingRule.min_order_total) }} to {{ formatCurrency(pushOrderShippingRules.value[index +1].min_order_total) }}
            </span>
            <span class="ml-1" v-else>
              {{ formatCurrency(shippingRule.min_order_total) }} and up
            </span>
          </div>
          <div class="w-2 text-right">
            <Button label="Delete" outlined class="p-button-danger p-button-sm" @click="deleteShippingRuleHandler(index)"></Button>
          </div>
        </li>
      </ul>

      <Divider class="mt-0" />

      <div class="flex">
        <Button label="Cancel" @click="cancelHandler" :disabled="!isPushOrderShippingRulesChanged" outlined></Button>
        <Button :loading="loadingSettings" label="Save" @click="updatePushSettingsHandler" :disabled="!isPushOrderShippingRulesChanged" class="ml-3"></Button>
      </div>
    </template>
  </CardWrapper>
</template>
