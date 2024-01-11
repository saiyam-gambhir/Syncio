<script setup>
/* ----- Data ----- */
const {
  pushOrder,
} = toRefs(useOrdersStore());

const {
  storeName,
} = useConnectionsStore();

const loading = ref(false);
const shippingCost = ref(null);

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

  targetStoreId: {
    type: String,
    required: true,
  }
});

/* ----- Emits ----- */
const emits = defineEmits(['onOrderPush']);

/* ----- Methods ----- */
const pushOrderHandler = async (targetStoreId) => {
  loading.value = true;
  const payload = {
    orderId: props.order.syncio_order_id,
    shippingCost: shippingCost.value,
    targetStoreId: targetStoreId,
  };

  await pushOrder.value(payload);
  loading.value = false;
  emits('onOrderPush', true);
};
</script>

<template>
  <div>
    <template v-if="store.push_status !== 'pushed' && store.push_status !== 'blocked' && order.push_status !== 'invalid' && !store.is_mapper_deleted && !store.store_disconnected">
      <InputNumber
        :minFractionDigits="2"
        :useGrouping="false"
        locale="en-US"
        placeholder="$ Enter a shipping fee"
        v-if="!!order.customer || !!order.shipping_address"
        v-model="shippingCost">
      </InputNumber>
    </template>

    <template v-if="store.push_status !== 'blocked'">
      <Button
        :disabled="!shippingCost"
        :loading="loading"
        @click="pushOrderHandler(store.target_store_id, storeName)"
        class="ml-3"
        style="transform: translateY(-1px);"
        v-if="order.customer !== null && order.shipping_address !== null && store.push_status !== 'pushed' && !store.is_mapper_deleted && !store.store_disconnected">
        <span v-if="store.push_status === 'failed'">Repush Order</span>
        <span v-else>Push Order</span>
      </Button>
    </template>
  </div>
</template>
