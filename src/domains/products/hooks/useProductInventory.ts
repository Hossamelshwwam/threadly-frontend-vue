import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { inventoryApi } from "../api/inventory.api";
import { productKeys } from "./useAdminProducts";
import type {
  CreateVariantInput,
  RestockVariantInput,
  UpdateVariantInput,
} from "../schemas/inventory.schema";

export const inventoryKeys = {
  all: ["inventory"] as const,
  byProduct: (productId: string) =>
    [...inventoryKeys.all, "product", productId] as const,
};

export function useProductVariants(productId: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => inventoryKeys.byProduct(toValue(productId))),
    queryFn: () => inventoryApi.listVariants(toValue(productId)),
    enabled: computed(() => !!toValue(productId)),
  });
}

export function useCreateVariant(productId: MaybeRefOrGetter<string>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVariantInput) =>
      inventoryApi.createVariant(toValue(productId), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(toValue(productId)),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useRestockVariant(productId: MaybeRefOrGetter<string>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: RestockVariantInput;
    }) => inventoryApi.restockVariant(variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(toValue(productId)),
      });
    },
  });
}

export function useDeleteVariant(productId: MaybeRefOrGetter<string>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: string) => inventoryApi.deleteVariant(variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(toValue(productId)),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUpdateVariant(productId: MaybeRefOrGetter<string>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: UpdateVariantInput;
    }) => inventoryApi.updateVariant(variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.byProduct(toValue(productId)),
      });
    },
  });
}
