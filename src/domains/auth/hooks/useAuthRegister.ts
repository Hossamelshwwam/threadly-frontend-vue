import { authApi } from "../api/auth.api";
import { useMutation } from "@tanstack/vue-query";

export default function useAuthRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
