<script setup>
/* ----- Data ----- */
const showTrackingNumbers = ref(false);

/* ----- Props ----- */
const props = defineProps({
  storeOrder: {
    required: true,
    type: Object,
  }
});
</script>

<template>
  <div v-if="storeOrder?.push_order_fulfillments?.length > 0">
    <span @click="showTrackingNumbers = !showTrackingNumbers" style="user-select: none;" class="pointer font-semibold">
      Tracking Numbers
      <i class="pi pi-chevron-right ml-1" v-if="!showTrackingNumbers" style="transform: translateY(1.25px);"></i>
      <i class="pi pi-chevron-down ml-1" v-else style="transform: translateY(1.25px);"></i>
    </span>
    <template v-if="showTrackingNumbers">
      <section class="table mt-4">
        <table class="w-100">
          <thead class="text-left">
            <tr>
              <th style="width: 40%;">SKU</th>
              <th style="width: 60%;">Tracking Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fulfillment, index) in storeOrder.push_order_fulfillments" :key="index">
              <td>{{ fulfillment.line_items[0].sku }}</td>
              <td>
                <ul class="pa-0 pl-2 d-flex" v-if="fulfillment.tracking_numbers.length > 0">
                  <li v-for="(trackingNumber, index) in fulfillment.tracking_numbers" :key="index" style="list-style: none;">
                    <a :href="fulfillment.tracking_urls[index]" target="_blank" class="btn-link" :class="{ 'ml-1': index > 0 }">
                      {{ trackingNumber }}
                    </a>
                    <span v-if="index !== fulfillment.tracking_numbers.length - 1">,</span>
                  </li>
                </ul>
                <ul v-else class="pa-0 pl-1">
                  <li style="list-style: none;">
                    -
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>
  </div>
</template>
