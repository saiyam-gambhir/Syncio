<script setup>
/* ----- Data ----- */
const {
  connectionFilterItems
} = toRefs(useConnectionsStore());

/* ----- Props ----- */
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
  },

  modelValue: {
    type: [Number, String],
    required: true,
  },

  placeholder: {
    type: String,
    required: false,
  },

  customPlaceholder: {
    type: Boolean,
    default: false,
  },

  customPlaceholderText: {
    type: String,
    default: '',
  }
});

/* ----- Emits ----- */
const emits = defineEmits(['update:modelValue']);
</script>

<template>
  <Dropdown
    :autoOptionFocus="false"
    :loading="loading"
    :options="connectionFilterItems"
    :placeholder="customPlaceholder ? customPlaceholderText : 'All stores'"
    @change="$emit('update:modelValue', $event.value)"
    optionLabel="store_name"
    optionValue="id"
    showClear
    v-model="props.modelValue">
  </Dropdown>
</template>
