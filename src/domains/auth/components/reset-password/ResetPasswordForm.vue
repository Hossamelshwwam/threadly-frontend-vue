<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <CustomInput
      type="password"
      placeholder="••••••••"
      name="password"
      label="Password"
      v-model:modelValue="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />
    <CustomInput
      type="password"
      name="confirmPassword"
      label="Confirm Password"
      placeholder="••••••••"
      v-model:modelValue="confirmPassword"
      v-bind="confirmPasswordAttrs"
      :error="errors.confirmPassword"
    />

    <CustomButton
      type="submit"
      class="mt-4"
      :right-icon="ArrowRight"
      variant="solid"
      theme="primary"
      :loading="isPending"
    >
      Reset Password
    </CustomButton>
  </form>
</template>

<script setup lang="ts">
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { ArrowRight } from "lucide-vue-next";
import type { AxiosError } from "axios";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import useResetPasswordSchema, {
  type ResetPasswordSchemaType,
} from "../../schemas/useResetPasswordSchema";
import useAuthResetPassword from "../../hooks/useAuthResetPassword";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { mutateAsync: resetPassword, isPending } = useAuthResetPassword();

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(useResetPasswordSchema),
});

const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");
const [password, passwordAttrs] = defineField("password");

const route = useRoute();
const token = computed(() => route.query.token as string);

const onSubmit = handleSubmit(async (values: ResetPasswordSchemaType) => {
  toast.promise(
    resetPassword({ token: token.value, password: values.password }),
    {
      loading: "Resetting password...",
      success: "Password reset! You can now log in.",
      error: (err: AxiosError<{ message: string }>) =>
        err.response?.data?.message ?? "Something went wrong.",
    },
  );
});
</script>

<style scoped></style>
