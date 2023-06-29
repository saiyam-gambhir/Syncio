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
  },

  withoutTitle: {
    type: Boolean,
    required: false,
    default: false,
  },
});

/* ----- Emits ----- */
const emits = defineEmits(['closeDialog']);

/* ----- Methods ----- */
const closeDialogHandler = () => {
  emits('closeDialog');
};
</script>

<template>
  <Dialog
    :class="{ 'without-title': withoutTitle }"
    :dismissableMask="true"
    :header="props.title"
    :modal="true"
    :style="{ width: props.width }"
    :visible="props.isVisible"
    @update:visible="closeDialogHandler">
    <div :class="{ 'border-top-1 surface-border pt-4': !withoutTitle }">
      <slot name="body"></slot>
    </div>

    <template #footer v-if="props.showFooter">
      <div class="border-top-1 surface-border pt-4">
        <slot name="footer"></slot>
      </div>
    </template>
  </Dialog>
</template>
