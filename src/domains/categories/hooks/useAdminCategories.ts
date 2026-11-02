import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { categoriesApi } from "../api/categories.api";
import type {
  AdminCategoriesQueryParams,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../types/category.types";

export const categoryKeys = {
  all: ["categories"] as const,
  adminList: (params?: AdminCategoriesQueryParams) =>
    [...categoryKeys.all, "admin", "list", params] as const,
};

export function useAdminCategories(
  params?: MaybeRefOrGetter<AdminCategoriesQueryParams>,
) {
  const resolved = computed(() =>
    params === undefined ? undefined : toValue(params),
  );

  return useQuery({
    queryKey: computed(() => categoryKeys.adminList(resolved.value)),
    queryFn: () => categoriesApi.adminListFlat(resolved.value),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      categoriesApi.adminCreateCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCategoryPayload;
    }) => categoriesApi.adminUpdateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesApi.adminDeleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

export function useUploadCategoryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      categoriesApi.adminUploadImage(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}
