<script setup>
import { ref } from 'vue';

/* ----- Data ----- */
const searchText = ref(props.modelValue);

/* ----- Props ----- */
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
  },

  modelValue: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    required: false,
  },
});

/* ----- Emits ----- */
const emits = defineEmits(['update:modelValue']);

/* ----- Methods ----- */
const handleSearch = () => {
  emits('update:modelValue', searchText.value);
};
</script>

<template>
  <InputText :placeholder="placeholder" @keyup.enter="handleSearch" v-model="searchText" />
  <Button :disabled="!searchText" :loading="loading" @click="handleSearch" icon="pi pi-search" />
</template>
