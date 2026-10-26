import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { sellerStoreApi } from "../api/seller-store.api";
import type { RegisterStorePayload } from "../types/seller.types";
import { useRouter } from "vue-router";

export function useRegisterStore() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterStorePayload) =>
      sellerStoreApi.registerStore(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-store-profile"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/seller");
    },
  });
}
