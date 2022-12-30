<script setup>
import { onMounted, ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ===== PROPS ===== */
const props = defineProps({
  connection: {
    type: Object,
    required: true
  }
})

/* ===== DATA ===== */
const connectionsStore = useConnectionsStore()
const selectedLocation = ref(null)

/* ===== MOUNTED ===== */
onMounted(() => {
  selectedLocation.value = props.connection?.destination_default_inventory_location
})
</script>

<template>
  <Dropdown
    v-if="connection.platform === 'shopify'"
    class="w-100"
    :options="connectionsStore.destinationLocations"
    optionLabel="name"
    placeholder="Select a Location"
    v-model="selectedLocation"
    modelValue="name">

    <template #value>
      {{ selectedLocation?.name }}
    </template>

  </Dropdown>
</template>
