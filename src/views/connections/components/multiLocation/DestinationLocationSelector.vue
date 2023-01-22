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
const selectedLocationId = ref(null)

/* ===== MOUNTED ===== */
onMounted(() => {
  selectedLocation.value = props.connection?.destination_default_inventory_location?.name
})

/* ===== METHODS ===== */
const onChangeHandler = (event) => {
  let selectedLocation = connectionsStore.destinationLocations.filter(location => location.name.toLowerCase() === event.value.toLowerCase())
  selectedLocationId.value = selectedLocation[0].id
  connectionsStore.isLocationChangeRequested = true
}
</script>

<template>
  <Dropdown
    v-if="connection.platform === 'shopify'"
    class="w-100"
    :options="connectionsStore.destinationLocations"
    optionLabel="name"
    optionValue="name"
    placeholder="Select a Location"
    v-model="selectedLocation"
    @change="onChangeHandler($event)">
  </Dropdown>

  <span v-else class="ml-3">{{ selectedLocation }}</span>
</template>
