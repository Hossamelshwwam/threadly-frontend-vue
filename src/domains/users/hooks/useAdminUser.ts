import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { usersApi } from "../api/users.api";
import { userKeys } from "./useAdminUsers";

export function useAdminUser(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => userKeys.adminDetail(toValue(id))),
    queryFn: () => usersApi.adminGetUser(toValue(id)),
    enabled: computed(() => !!toValue(id)),
  });
}
