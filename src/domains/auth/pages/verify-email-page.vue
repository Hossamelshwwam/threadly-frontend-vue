<template>
  <main
    v-if="isPending"
    class="grow flex items-center justify-center px-4 py-16"
  >
    <div class="flex flex-col items-center gap-5 text-center">
      <LoaderCircle :size="36" class="text-amber-400 animate-spin" />
      <p class="text-base font-medium text-zinc-500">Verifying your email...</p>
    </div>
  </main>
  <main
    v-else-if="!token || isError"
    class="grow flex items-center justify-center px-4 py-16"
  >
    <div class="w-full max-w-[400px] flex flex-col items-center text-center">
      <div
        class="mb-8 w-20 h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center"
      >
        <X :size="36" class="text-red-500" />
      </div>

      <h1 class="text-3xl font-bold text-zinc-900 mb-3">Verification Failed</h1>
      <p class="text-base text-zinc-500 leading-relaxed max-w-sm">
        This link is invalid or has expired. Enter your email and we&apos;ll
        send you a new verification link.
      </p>

      <div
        class="mt-8 w-full bg-white border border-zinc-200 rounded-lg p-6 flex flex-col gap-4 text-left"
      >
        <CustomInput
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@example.com"
          :icon="Mail"
          v-model="email"
        />

        <CustomButton
          variant="solid"
          theme="primary"
          class="w-full"
          :disabled="!isEmailValid || isSending"
          :loading="isSending"
          @click="handleSend"
        >
          Resend Verification Email
        </CustomButton>
      </div>

      <RouterLink
        to="/login"
        class="mt-5 text-sm text-zinc-500 hover:text-amber-600 hover:underline underline-offset-4 transition-colors"
      >
        Back to Login
      </RouterLink>
    </div>
  </main>
  <main v-else class="grow flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-[400px] flex flex-col items-center text-center">
      <div
        class="mb-8 w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center"
      >
        <Check :size="36" class="text-amber-500" />
      </div>
      <h1 class="text-3xl font-bold text-zinc-900 mb-3">Email Verified</h1>
      <p class="text-base text-zinc-500 leading-relaxed max-w-sm">
        Your account has been successfully verified. You now have full access to
        Threadly&apos;s curated collections and exclusive marketplace features.
      </p>
      <div class="mt-10 w-full">
        <RouterLink to="/login" class="block">
          <CustomButton
            variant="solid"
            theme="primary"
            class="w-full"
            size="lg"
          >
            Continue to Login
          </CustomButton>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useAuthVerifyEmail from "../hooks/useAuthVerifyEmail";
import useAuthSendVerificationEmail from "../hooks/useAuthSendVerificationEmail";
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { Check, LoaderCircle, Mail, X } from "lucide-vue-next";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const route = useRoute();
const token = computed(() => route.query.token as string | undefined);
const { isPending, isError } = useAuthVerifyEmail(token.value);
const { mutateAsync: sendVerificationEmailAgain, isPending: isSending } =
  useAuthSendVerificationEmail();
const email = ref("");

const handleSend = () => {
  toast.promise(sendVerificationEmailAgain(email.value), {
    loading: "Sending verification email...",
    success: "Verification email sent successfully!",
    error: "Failed to send verification email!",
  });
};

const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
);
</script>

<style scoped></style>
