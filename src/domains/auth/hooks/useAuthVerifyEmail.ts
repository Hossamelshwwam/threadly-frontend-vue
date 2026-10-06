import { useQuery } from "@tanstack/vue-query";
import { authApi } from "../api/auth.api";

export default function useAuthVerifyEmail(token?: string) {
  return useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => authApi.verifyEmail(token!),
  });
}
