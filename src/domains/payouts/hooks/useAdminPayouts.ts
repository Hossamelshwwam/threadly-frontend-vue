import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { payoutsApi } from "../api/payouts.api";
import type {
  AdminPayoutsParams,
  AdminUpdatePayoutPayload,
} from "../types/payout.types";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export const payoutKeys = {
  all: ["payouts"] as const,
  adminStats: () => [...payoutKeys.all, "admin", "stats"] as const,
  adminList: (params?: AdminPayoutsParams) =>
    [...payoutKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...payoutKeys.all, "admin", "detail", id] as const,
};

export function useAdminPayoutStats() {
  return useQuery({
    queryKey: payoutKeys.adminStats(),
    queryFn: () => payoutsApi.adminGetStats(),
  });
}

export function useAdminPayouts(params?: MaybeRefOrGetter<AdminPayoutsParams>) {
  const resolved = computed(() =>
    params === undefined ? undefined : toValue(params),
  );

  return useQuery({
    queryKey: computed(() => payoutKeys.adminList(resolved.value)),
    queryFn: () => payoutsApi.adminListPayouts(resolved.value),
  });
}

export function useAdminPayout(id: string) {
  return useQuery({
    queryKey: payoutKeys.adminDetail(id),
    queryFn: () => payoutsApi.adminGetPayout(id),
    enabled: !!id,
  });
}

export function useAdminUpdatePayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: AdminUpdatePayoutPayload;
    }) => payoutsApi.adminUpdatePayout(id, payload), // Make sure to add adminUpdatePayout to your payoutsApi!
    onSuccess: (_, variables) => {
      // Refresh the specific payout and the general list stats
      queryClient.invalidateQueries({
        queryKey: payoutKeys.adminDetail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: payoutKeys.adminStats() });
      queryClient.invalidateQueries({ queryKey: payoutKeys.adminList() });
    },
  });
}
