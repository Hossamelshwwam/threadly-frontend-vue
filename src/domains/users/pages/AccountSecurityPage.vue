<template>
  <div
    class="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm font-sans animate-fadeIn flex-1"
  >
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6 border-b border-zinc-100 pb-6">
      <div
        class="h-12 w-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0"
      >
        <ShieldCheck :size="24" class="text-2xl text-zinc-900" />
      </div>
      <div>
        <h1 class="text-xl font-bold text-zinc-900 tracking-tight">
          Security Settings
        </h1>
        <p class="text-xs text-zinc-500 font-medium mt-0.5">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>
    </div>

    <!-- Performant Uncontrolled Form -->
    <form class="space-y-5" @submit="onSubmit">
      <CustomInput
        name="currentPassword"
        type="password"
        label="Current Password"
        placeholder="Enter your current password"
        v-model="currentPassword"
        v-bind="currentPasswordAttrs"
        :error="errors.currentPassword"
      />

      <div class="pt-2 border-t border-zinc-50">
        <CustomInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="Minimum 8 characters"
          v-model="newPassword"
          v-bind="newPasswordAttrs"
          :error="errors.newPassword"
        />
      </div>

      <CustomInput
        name="confirmNewPassword"
        type="password"
        label="Confirm New Password"
        placeholder="Repeat new password"
        v-model="confirmNewPassword"
        v-bind="confirmNewPasswordAttrs"
        :error="errors.confirmNewPassword"
      />

      <div class="pt-4">
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          :disabled="isPending"
          full-width
          :left-icon="LockKeyhole"
        >
          {{ isPending ? "Updating..." : "Update Password" }}
        </CustomButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { LockKeyhole, ShieldCheck } from "lucide-vue-next";

import { useChangePassword } from "@/domains/users/hooks/useUser";
import { changePasswordSchema } from "@/domains/users/schemas/security.schema";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const { mutateAsync: changePasswordAsync, isPending } = useChangePassword();

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
});

const [currentPassword, currentPasswordAttrs] =
  defineField("currentPassword");
const [newPassword, newPasswordAttrs] = defineField("newPassword");
const [confirmNewPassword, confirmNewPasswordAttrs] =
  defineField("confirmNewPassword");

const onSubmit = handleSubmit((data) => {
  // Strip confirmNewPassword as the API doesn't need it
  const payload = {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  };

  toast.promise(changePasswordAsync(payload), {
    loading: "Securing your new password...",
    success: () => {
      resetForm(); // Memory safety: Clear inputs immediately
      return "Password successfully updated!";
    },
    error: (err: AxiosError<{ message: string }>) =>
      err.response?.data?.message ||
      "Failed to update password. Please verify your current password.",
  });
});
</script>

<style scoped></style>
