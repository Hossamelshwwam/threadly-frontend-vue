import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { cartApi } from "../api/cart.api";

export default function useAddProductToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.addProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
