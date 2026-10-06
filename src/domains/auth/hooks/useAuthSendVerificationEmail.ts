import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/vue-query";

export default function useAuthSendVerificationEmail() {
  return useMutation({
    mutationFn: authApi.sendVerificationEmailAgain,
  });
}
