<script setup>
import { useForm } from 'vee-validate';
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
  shouldShowOrderPushLimitDialog,
} = toRefs(usePlanStore());

const loading = ref(false);

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

  await pushOrder.value(payload);
  emits('onOrderPush', true);
  loading.value = false;
};
</script>

<template>
  <div class="flex align-items-start">
    <template v-if="store.push_status !== 'pushed' && store.push_status !== 'blocked' && order.push_status !== 'invalid' && !store.is_mapper_deleted && !store.store_disconnected">
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

    <template v-if="store.push_status !== 'blocked'">
      <Button
        :disabled="!meta.valid"
        :loading="loading"
        @click="pushOrderHandler(store.target_store_id, storeName)"
        class="ml-3"
        style="transform: translateY(-1px); height: 38px;"
        v-if="order.customer !== null && order.shipping_address !== null && store.push_status !== 'pushed' && !store.is_mapper_deleted && !store.store_disconnected">
        <span v-if="store.push_status === 'failed'">Repush Order</span>
        <span v-else>Push Order</span>
      </Button>
    </template>
  </div>
</template>
