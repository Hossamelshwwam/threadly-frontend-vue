import { useRouter } from "vue-router";
import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/vue-query";

export default function useAuthResetPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess() {
      router.push("/login");
    },
  });
}
