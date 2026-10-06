import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  sellerStoreApi,
  type RegisterStorePayload,
} from "../api/seller-store.api";
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
