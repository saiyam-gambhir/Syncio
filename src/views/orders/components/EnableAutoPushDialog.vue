<script setup>
import { useFilters } from '@/composables/filters';
import { useOrders } from '../composables/orders';
import { useOrdersStore } from '@/stores/orders';

/* ----- Components ----- */
import DialogWrapper from '@/components/shared/DialogWrapper.vue';

/* ----- Data ----- */
const { formatCurrency } = useFilters();
const { isEnableAutoPushRequested, pushSettings } = toRefs(useOrdersStore());
const { setAutoPushStatus, toggleAutoPush } = useOrders();

/* ----- Computed ----- */
const visiblePushSetting = computed(() => {
  return pushSettings.value.filter(setting => setting.key !== 'auto_push_order');
});

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isEnableAutoPushRequested.value = false;
  setTimeout(() => {
    setAutoPushStatus()
  }, 100);
};
</script>

<template>
  <DialogWrapper :isVisible="isEnableAutoPushRequested" title="Your orders will be automatically pushed with these settings" width="650px" @closeDialog="closeDialogHandler">
    <template #body>
      <div class="text-left">
        <div v-for="(setting, index) in visiblePushSetting" class="mt-3">
          <h3>{{ index + 1 }}: {{ setting.title }}</h3>
          <p v-if="setting.key === 'push_order_email_option'" class="mt-1 mb-6 ml-3">Push order email with <strong>{{ setting.custom_value }}</strong></p>
          <ul v-if="setting.key === 'push_order_shipping_rules'" class="p-0 ml-5 m-0 mb-6">
            <li v-for="(shippingRule, index) in setting.value" :key="index" class="pl-0 mb-2">
              {{ formatCurrency(shippingRule.shipping_cost) }} for orders from
              <span v-if="(typeof(setting.value[index + 1]) != 'undefined')" class="ml-1">
                {{ formatCurrency(shippingRule.min_order_total) }} to {{ formatCurrency(setting.value[index +1].min_order_total) }}
              </span>
              <span class="ml-1" v-else>
                {{ formatCurrency(shippingRule.min_order_total) }} and up
              </span>
            </li>
          </ul>
          <div v-if="setting.key === 'custom_shipping_tags'" class="ml-3 mb-3">
            <Tag severity="info" rounded class="mr-2 mb-3" v-for="key in Object.keys(JSON.parse(setting.value))">{{ key }}</Tag>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-between">
        <div>
          <Button label="Cancel" class="p-button-secondary" @click="closeDialogHandler"></Button>
        </div>
        <div>
          <router-link to="/orders/push-settings">
            <Button outlined label="Change Settings" class="mr-3"></Button>
          </router-link>
          <Button label="Confirm" class="mr-0" @click="toggleAutoPush"></Button>
        </div>
      </div>
    </template>
  </DialogWrapper>
</template>
