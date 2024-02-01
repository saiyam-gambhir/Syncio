export function useResetStore() {
  const activityCenter = useActivityCenterStore();
  const auth = useAuthStore();
  const connections = useConnectionsStore();
  const marketPlace = useMarketPlaceStore();
  const orders = useOrdersStore();
  const payouts = usePayoutsStore();
  const payoutsSettings = usePayoutsSettingsStore();
  const plan = usePlanStore();
  const products = useProductsStore();
  const productSettings = useProductSettingsStore();

  const resetStore = () => {
    activityCenter.$reset();
    auth.$reset();
    connections.$reset();
    marketPlace.$reset();
    orders.$reset();
    payouts.$reset();
    plan.$reset();
    products.$reset();
    productSettings.$reset();
    payoutsSettings.$reset();
  };

  return {
    resetStore,
  };
}
