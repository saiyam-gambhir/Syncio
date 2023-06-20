<script setup>
import { ref } from 'vue'

/* ----- EMITS ----- */
const emits = defineEmits(['onInput'])

/* ----- Props ----- */
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },

  isChecked: {
    type: Boolean,
    default: false
  }
})

/* ----- Methods ----- */
const onInputHandler = () => {
  emits('onInput', props.isChecked)
}
</script>

<template>
  <Checkbox :binary="true" :class="{ 'hidden': disabled }" :disabled="disabled" @change="onInputHandler(isChecked)"
    v-model="props.isChecked" />
</template>
