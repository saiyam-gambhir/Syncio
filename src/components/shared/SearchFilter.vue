<script setup>
import { ref } from 'vue'

/* ----- Data ----- */
const searchText = ref(props.modelValue)

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
  emits('update:modelValue', searchText.value)
}
</script>

<template>
  <InputText v-model="searchText" :placeholder="placeholder" @keyup.enter="handleSearch" autocomplete="off" />
  <Button icon="pi pi-search" @click="handleSearch" :disabled="!searchText"></Button>
</template>
