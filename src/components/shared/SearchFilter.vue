<script setup>
/* ----- Props ----- */
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },

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

/* ----- Data ----- */
const searchText = ref(props.modelValue);

/* ----- Emits ----- */
const emits = defineEmits(['update:modelValue']);

/* ----- Methods ----- */
const handleSearch = () => {
  emits('update:modelValue', searchText.value);
};
</script>

<template>
  <InputText
    :disabled="disabled"
    :placeholder="placeholder"
    @keyup.enter="handleSearch"
    type="search"
    @search="handleSearch"
    style="height: 39px;"
    v-model="searchText">
  </InputText>

  <Button
    :disabled="!searchText"
    :loading="loading"
    @click="handleSearch"
    icon="pi pi-search">
  </Button>
</template>
