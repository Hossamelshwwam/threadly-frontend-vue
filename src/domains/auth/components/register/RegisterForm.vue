<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <CustomInput
      type="text"
      name="name"
      label="Full Name"
      placeholder="John Doe"
      v-model:modelValue="name"
      v-bind="nameAttrs"
      :error="errors.name"
    />
    <CustomInput
      type="email"
      placeholder="name@company.com"
      name="email"
      label="Email Address"
      v-model:modelValue="email"
      v-bind="emailAttrs"
      :error="errors.email"
    />
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
      class="mt-2"
      :right-icon="ArrowRight"
      variant="solid"
      theme="primary"
      :loading="isPending"
    >
      Create Account
    </CustomButton>
  </form>
</template>

<script setup lang="ts">
import useAuthRegister from "../../hooks/useAuthRegister";
import { useForm } from "vee-validate";
import useRegisterSchema, {
  type RegisterSchemaType,
} from "../../schemas/useRegisterSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { ArrowRight } from "lucide-vue-next";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";

const { mutateAsync: register, isPending } = useAuthRegister();
const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(useRegisterSchema),
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values: RegisterSchemaType) => {
  const promise = register(values);
  toast.promise(promise, {
    loading: "Creating account...",
    success: () => {
      resetForm();
      return `Account created successfully!, please check your email to verify it.`;
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data.message,
  });
});
</script>

<style scoped></style>
