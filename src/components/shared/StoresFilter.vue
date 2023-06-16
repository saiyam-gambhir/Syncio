<script setup>
import { ref } from 'vue'
import { useConnectionsStore } from '@/stores/connections'

/* ----- Data ----- */
const connections = useConnectionsStore()
const selectedStore = ref(props.modelValue)

/* ----- Props ----- */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    required: false
  }
})

/* ----- Emits ----- */
const emits = defineEmits(['update:modelValue'])

/* ----- Methods ----- */
const handleSearch = () => {
  emits('update:modelValue', `${selectedStore.value}`)
}
</script>

<template>
  <Dropdown
    :autoOptionFocus="false"
    :options="connections.connections"
    @change="handleSearch"
    optionLabel="store_domain"
    optionValue="id"
    placeholder="All Stores"
    showClear
    v-model="selectedStore">
  </Dropdown>
</template>
