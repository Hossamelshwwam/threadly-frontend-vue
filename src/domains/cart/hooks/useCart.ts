import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { cartApi } from "../api/cart.api";

export const cartKeys = {
  all: ["cart"] as const,
};

export default function useCart() {
  const query = useQuery({
    queryKey: cartKeys.all,
    queryFn: () => cartApi.getCart(),
  });

  const itemCount = computed(() => query.data.value?.data?.itemCount ?? 0);
  const totalPrice = computed(() => query.data.value?.data?.total ?? 0);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    itemCount,
    totalPrice,
  };
}
