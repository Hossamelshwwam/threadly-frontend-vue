import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/vue-query";

export default function useAuthForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}
