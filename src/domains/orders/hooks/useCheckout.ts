import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { checkoutApi } from "../api/checkout.api";
import { cartKeys } from "@/domains/cart/hooks/useCart";
import type { CheckoutInput } from "../schemas/checkout.schema";

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutInput) => checkoutApi.placeOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys?.all || ["cart"] });
    },
  });
}
