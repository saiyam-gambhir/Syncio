<script setup>
import { useForm } from 'vee-validate';
import * as IntercomActions from '@/intercom';
import * as validationMessages from '@/validationMessages';
import * as yup from 'yup';

/* ----- Data ----- */
const {
  pushOrder,
} = toRefs(useOrdersStore());

const {
  storeName,
} = toRefs(useConnectionsStore());

const {
  isOrderLimitReached,
  ordersPushed,
  shouldShowOrderPushLimitDialog,
} = toRefs(usePlanStore());

const loading = ref(false);

const blockedMessages = [
  'not_pushed_location_mismatch',
  'not_pushed_unsync',
  'not_pushed_store_disconnected',
  'marked_as_fulfilled_cannot_push',
  'invalid',
];

/* ----- Validations ----- */
const { errors, meta, defineField } = useForm({
  validationSchema: yup.object({
    shippingCost: yup.string().matches(/^-?\d+(\.\d+)?$/, validationMessages.VALID_NUMBER).matches(/^\d+(\.\d+)?$/, validationMessages.GREATER_THAN_ZERO).required(validationMessages.REQUIRED),
  }),
});

const [shippingCost] = defineField('shippingCost');

/* ----- Props ----- */
const props = defineProps({
  order: {
    type: Object,
    required: true
  },

  store: {
    type: Object,
    required: true
  },
});

/* ----- Emits ----- */
const emits = defineEmits(['onOrderPush']);

/* ----- Methods ----- */
const pushOrderHandler = async (targetStoreId) => {
  if(isOrderLimitReached.value) {
    shouldShowOrderPushLimitDialog.value = true;
    return;
  }

  loading.value = true;
  const payload = {
    orderId: props.order.syncio_order_id,
    shippingCost: shippingCost.value,
    targetStoreId: targetStoreId,
  };

  const success = await pushOrder.value(payload);
  if(success) {
    emits('onOrderPush', true);
    loading.value = false;
    if(ordersPushed.value === 0) {
      Intercom('trackEvent', IntercomActions.FIRST_ORDER_PUSHED_EVENT);
    }
  }
};

const isConnected = (messages) => {
  if (messages.length <= 0) {
    return true;
  }

  return !messages.find(message => (message['key'] === 'pushed_store_disconnected' || message['key'] === 'not_pushed_store_disconnected'));
};

const isSynced = (messages) => {
  if (messages.length <= 0) {
    return true;
  }

  return !messages.find(message => (message['key'] === 'pushed_unsync' || message['key'] === 'not_pushed_unsync'));
};

const isBlocked = (messages) => {
  if (messages.length <= 0) {
    return false;
  }

  return messages.find(message => blockedMessages.includes(message['key'])) || (props.order.fulfillment_status === 'fulfilled' && props.order.push_status === 'failed');
};

const isFailed = (messages) => {
  if (messages.length <= 0) {
    return true;
  }

  return messages.find(message => (message['key'] === 'failed'));
};


const storeStatus = computed(() => {
    const connected = isConnected(props.store.order_fail_reason);
    const synced = isSynced(props.store.order_fail_reason);

  return props.order.customer !== null && props.order.shipping_address !== null && props.store.push_status !== 'pushed' && connected && synced 
});

const shippingFeeStatus = computed(() => {
  const connected = isConnected(props.store.order_fail_reason);
  const synced = isSynced(props.store.order_fail_reason);
  const blocked = isBlocked(props.store.order_fail_reason);

  return props.store.push_status !== 'pushed' && props.store.push_status !== 'blocked' && !blocked && props.order.push_status !== 'invalid' && connected && synced;
});
</script>

<template>
  <div class="flex align-items-start">
    <template v-if="shippingFeeStatus ">
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-dollar" />
            <InputText
              :class="{ 'p-invalid': errors.shippingCost }"
              placeholder="Enter a shipping fee"
              prefix="$ "
              v-if="!!order.customer || !!order.shipping_address"
              v-model="shippingCost">
            </InputText>
          </span>

        <ValidationMessage :error="errors.shippingCost" :class="{ 'mt-3': errors.shippingCost }" style="padding-bottom: 0 !important;" />
      </div>
    </template>

    <template v-if="!isBlocked(store.order_fail_reason)">
      <Button
        :disabled="!meta.valid"
        :loading="loading"
        @click="pushOrderHandler(store.target_store_id, storeName)"
        class="ml-3"
        style="transform: translateY(-1px); height: 38px;"
        v-if="storeStatus">
        <span v-if=!isFailed>Repush Order</span>
        <span v-else>Push Order</span>
      </Button>
    </template>
  </div>
</template>
