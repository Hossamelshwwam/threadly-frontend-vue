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

    <CustomInput
      type="password"
      placeholder="••••••••"
      name="password"
      label="Password"
      v-model:modelValue="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />

    <CustomButton
      type="submit"
      class="mt-4"
      :right-icon="ArrowRight"
      variant="solid"
      theme="primary"
      :loading="isPending"
    >
      Login
    </CustomButton>
  </form>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import useAuthLogin from "../../hooks/useAuthLogin";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import useLoginSchema, {
  type LoginSchemaType,
} from "../../schemas/useLoginSchema";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { ArrowRight } from "lucide-vue-next";
import type { authApi } from "../../api/auth.api";
import type { AxiosError } from "axios";
type LoginResult = Awaited<ReturnType<typeof authApi.login>>;

const { mutateAsync: login, isPending } = useAuthLogin();
const router = useRouter();
const route = useRoute();
const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(useLoginSchema),
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values: LoginSchemaType) => {
  const promise = login(values);
  toast.promise(promise, {
    loading: "Signing in...",
    success: (data: LoginResult) => {
      console.log(data);

      router.push((route.query.redirect as string) || "/");
      return `Welcome back, ${data.data.user.name}!`;
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data.message,
  });
});
</script>

<style scoped></style>
