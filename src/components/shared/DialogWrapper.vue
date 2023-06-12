<script setup>
/* ----- Props ----- */
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },

  showFooter: {
    type: Boolean,
    default: true,
  },

  title: {
    type: String,
    default: '',
  },

  width: {
    type: String,
    default: '600px',
  }
})

/* ----- EMITS ----- */
const emits = defineEmits(['closeDialog'])

/* ----- METHODS ----- */
const closeDialogHandler = () => {
  emits('closeDialog')
}
</script>

<template>
  <Dialog :visible="props.isVisible" :modal="true" :style="{ width: props.width }" @update:visible="closeDialogHandler" :dismissableMask="false"  :header="props.title">
    <div class="border-top-1 surface-border pt-4">
      <slot name="body"></slot>
    </div>

    <template #footer v-if="props.showFooter">
      <div class="border-top-1 surface-border pt-4">
        <slot name="footer"></slot>
      </div>
    </template>
  </Dialog>
</template>
