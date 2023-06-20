<script setup>
import { useConnectionsStore } from '@/stores/connections'

/* ----- Data ----- */
const connections = useConnectionsStore()

/* ----- Props ----- */
const props = defineProps({
  loading: {
    type: Boolean,
    required: false
  },

  modelValue: {
    type: [Number, String],
    required: true,
  },

  placeholder: {
    type: String,
    required: false
  }
})

/* ----- Emits ----- */
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <Dropdown
    :autoOptionFocus="false"
    :loading="loading"
    :options="connections.connections"
    @change="$emit('update:modelValue', $event.value)"
    optionLabel="store_domain"
    optionValue="id"
    placeholder="All Stores"
    showClear
    v-model="props.modelValue">
  </Dropdown>
</template>
