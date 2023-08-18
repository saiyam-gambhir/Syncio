<script setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { useFilters } from '@/composables/filters';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

/* ----- Components ----- */
import AppLink from '@/components/shared/AppLink.vue';
import CardWrapper from '@/components/shared/CardWrapper.vue';

/* ----- Data ----- */
const { selectedAddonIds, selectedPlan } = toRefs(useAuthStore());
const selectedOption = ref(null);
const { formatCurrency } = useFilters();

/* ----- Props ----- */
const props = defineProps({
  options: {
    type: Object,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  addon: {
    type: Object,
    required: true
  }
})

/* ----- Mounted ----- */
onMounted(() => {
  selectedOption.value = props.addon?.module_id;
  selectedAddonIds.value = { ...selectedAddonIds.value, [props.title]: selectedOption.value };
})

/* ----- Watcher ----- */
watch(selectedPlan, () => {
  selectedOption.value = props.addon?.module_id;
});

/* ----- Computed ----- */
const isOrdersAddon = computed(() => {
  return props.title === 'order';
});

const isProductSettingsAddon = computed(() => {
  return props.title === 'product';
});

const isPayoutsAddon = computed(() => {
  return props.title === 'payout';
});

/* ----- Methods ----- */
const changeHandler = ({ module_id, usage_unit }) => {
  selectedAddonIds.value[usage_unit] = module_id;
};
</script>

<template>
  <CardWrapper class="flex flex-column justify-content-between h-full surface-card">
    <template #content>
      <div v-if="isOrdersAddon">
        <h3 class="uppercase mb-2">Orders</h3>
        <p class="m-0 mb-4">Any orders containing synced products will appear in your Syncio Orders Tab and be available to Push to your Source store for fulfilment.</p>
        <AppLink label="Learn more" link="https://help.syncio.co/en/articles/4163480-orders-add-on"></AppLink>
      </div>

      <div v-else-if="isProductSettingsAddon">
        <h3 class="uppercase mb-2">Product settings</h3>
        <p class="m-0 mb-4">Syncio's Product Settings add-on allows you to sync specific product attributes such as tags, title, description, images, etc.. on an ongoing basis.</p>
        <AppLink label="Learn more" link="https://help.syncio.co/en/articles/3704617-product-settings-add-on"></AppLink>
      </div>

      <div v-else-if="isPayoutsAddon">
        <h3 class="uppercase mb-2">Payouts</h3>
        <p class="m-0 mb-4">Premium Payouts requires Orders add-on to be on the Premium plan. Generate payouts to keep track of commissions, payments and invoices (Shopify only).</p>
        <AppLink label="Learn more" link="https://help.syncio.co/en/collections/3557007-payouts-shopify-only"></AppLink>
      </div>

      <aside class="mt-4">
        <CardWrapper v-for="option in options" :key="option.id" class="radio-option flex mt-4">
          <template #content>
            <RadioButton v-model="selectedOption" :inputId="`${option.module_id}`" :value="option.module_id" class="mr-2" @change="changeHandler(option)" />
            <label :for="option.module_id" class="ml-2 pointer">
              <template v-if="+option.price_per_month === 0">
                <h4 class="uppercase m-0">Free</h4>
                <p v-if="isOrdersAddon" class="my-2">5 Orders / month</p>
                <p v-else-if="isProductSettingsAddon" class="my-2">Auto remove variant only</p>
                <p v-else="isPayoutsAddon" class="my-2">5 Payouts / month</p>
              </template>
              <template v-else>
                <h4 class="uppercase m-0">Pro</h4>
                <p v-if="isOrdersAddon" class="my-2">Unlimited</p>
                <p v-else-if="isProductSettingsAddon" class="my-2">All product settings</p>
                <p v-else="isPayoutsAddon" class="my-2">Unlimited</p>
              </template>
              <h4 class="m-0">{{ formatCurrency(option.price_per_month) }} / month</h4>
            </label>
          </template>
        </CardWrapper>
      </aside>
    </template>
  </CardWrapper>
</template>

<style scoped>
.radio-option {
  box-shadow: none !important;
  border: 1px solid #dfe7ef;
  border-radius: var(--border-radius) var(--border-radius) 0 0 !important;
  transition: .25s background-color;

  + .radio-option {
    border-radius: 0 0 var(--border-radius) var(--border-radius) !important;
    border-top: none;
    margin-top: 0 !important;
  }

  &:has(.p-radiobutton-checked) {
    background: #e3f2ff !important;
  }
}
</style>
