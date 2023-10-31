export function useEmailValidation() {
  const email = ref('');

  const isValidEmail = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email.value);
  });

  return {
    email,
    isValidEmail,
  };
}
