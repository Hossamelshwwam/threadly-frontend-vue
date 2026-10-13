<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <CustomInput
      type="email"
      placeholder="name@company.com"
      name="email"
      label="Email Address"
      v-model:modelValue="email"
      v-bind="emailAttrs"
      :error="errors.email"
    />

    <CustomButton
      type="submit"
      class="mt-4"
      :right-icon="ArrowRight"
      variant="solid"
      theme="primary"
      :loading="isPending"
    >
      Send Reset Link
    </CustomButton>
  </form>
</template>

<script setup lang="ts">
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { ArrowRight } from "lucide-vue-next";
import type { AxiosError } from "axios";
import type { ForgotPasswordSchemaType } from "../../schemas/useForgotPasswordSchema";
import { useForm } from "vee-validate";
import useForgotPasswordSchema from "../../schemas/useForgotPasswordSchema";
import useAuthForgotPassword from "../../hooks/useAuthForgotPassword";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";

const { mutateAsync: forgotPassword, isPending } = useAuthForgotPassword();

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(useForgotPasswordSchema),
});

const [email, emailAttrs] = defineField("email");

const onSubmit = handleSubmit(async (values: ForgotPasswordSchemaType) => {
  toast.promise(forgotPassword(values.email), {
    loading: "Sending reset link...",
    success: () => {
      resetForm();
      return "Reset link sent! Check your inbox.";
    },
    error: (err: AxiosError<{ message: string }>) =>
      err.response?.data?.message ?? "Something went wrong.",
  });
});
</script>

<style scoped></style>
