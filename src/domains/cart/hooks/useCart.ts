import { useQuery } from "@tanstack/vue-query";
import { cartApi } from "../api/cart.api";
import type { Cart, CartResponse } from "../types/cart.types";

export const cartKeys = {
  all: ["cart"] as const,
};

interface UseCartResult {
  data: CartResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  itemCount: number;
  totalPrice: number;
}

export default function useCart(): UseCartResult {
  const query = useQuery({
    queryKey: cartKeys.all,
    queryFn: () => cartApi.getCart(),
  });

  const cart: Cart | undefined = query.data.value?.data;

  const itemCount = cart?.itemCount ?? 0;
  const totalPrice = cart?.total ?? 0;

  return {
    data: query.data.value,
    isLoading: query.isLoading.value,
    isError: query.isError.value,
    error: query.error.value,
    itemCount,
    totalPrice,
  };
}
