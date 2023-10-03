export const showToast = {
  showToast(message, severity) {
    this.toast.add({
      closable: false,
      detail: message ?? '',
      life: 5000,
      severity: severity ?? 'success',
      summary: severity ?? 'success',
    });
  }
}
