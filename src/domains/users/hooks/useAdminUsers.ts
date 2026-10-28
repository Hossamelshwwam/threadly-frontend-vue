import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { usersApi } from "../api/users.api";
import type { AdminUsersParams } from "../types/user.types";

export const userKeys = {
  all: ["users"] as const,
  adminList: (params?: AdminUsersParams) =>
    [...userKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...userKeys.all, "admin", "detail", id] as const,
};

export function useAdminUsers(
  params?: MaybeRefOrGetter<AdminUsersParams | undefined>,
) {
  const resolveParams = () => (params ? toValue(params) : undefined);

  return useQuery({
    queryKey: computed(() => userKeys.adminList(resolveParams())),
    queryFn: () => usersApi.adminListUsers(resolveParams()),
  });
}

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: userKeys.adminDetail(id),
    queryFn: () => usersApi.adminGetUser(id),
    enabled: !!id,
  });
}
