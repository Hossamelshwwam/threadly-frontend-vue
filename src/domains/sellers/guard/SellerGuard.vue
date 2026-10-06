<template>
  <div>
    <div
      v-if="isLoading"
      class="h-screen w-full flex flex-col items-center justify-center bg-zinc-50 font-sans"
    >
      <LoaderCircle class="text-4xl text-amber-500 animate-spin mb-4" />
      <p class="text-sm font-medium text-zinc-500 animate-pulse">
        Loading workspace...
      </p>
    </div>
    <template v-else-if="needsRedirect">
      <!-- Don't render anything -->
    </template>
    <div
      v-else-if="hasStore && storeStatus === 'suspended'"
      class="h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans"
    >
      <div
        class="max-w-md w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200"
      >
        <div
          class="w-14 h-14 bg-error-bg text-error rounded-xl flex items-center justify-center mx-auto shadow-xs border border-error/10"
        >
          <CircleX :size="28" />
        </div>
        <div class="space-y-2">
          <h2 class="text-xl font-black text-zinc-900 tracking-tight">
            Workspace Access Restricted
          </h2>
          <p class="text-sm text-zinc-500 leading-relaxed">
            Your vendor workspace for
            <span class="font-bold text-zinc-800">
              &ldquo;{{ storeData?.data?.storeName }}&rdquo;
            </span>
            has been restricted due to a policy compliance or platform
            regulation violation.
          </p>
        </div>

        <div
          v-if="storeData?.data?.adminNote"
          class="bg-error-bg/30 text-left p-4 rounded-xl border border-error/10"
        >
          <span
            class="text-[10px] font-bold text-error uppercase tracking-wider block mb-1"
          >
            Reason for restriction
          </span>
          <p class="text-xs text-zinc-700 font-medium leading-relaxed italic">
            &quot;{{ storeData.data.adminNote }}&quot;
          </p>
        </div>

        <div class="pt-2">
          <CustomButton
            variant="solid"
            theme="neutral"
            :left-icon="LogOut"
            @click="logout"
            :full-width="true"
          >
            Exit Dashboard
          </CustomButton>
        </div>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { useGetMe } from "@/domains/users/hooks/useUser";
import { useGetMyStore } from "../hooks/useGetMyStore";
import { useRoute, useRouter } from "vue-router";
import useLogout from "@/shared/components/hooks/useLogout";
import { computed, watch } from "vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { CircleX, LoaderCircle, LogOut } from "lucide-vue-next";

const { data: storeData, isLoading: isStoreLoading, isError } = useGetMyStore();
const { data: userData, isPending: isUserLoading } = useGetMe();

const router = useRouter();
const route = useRoute();
const { logout } = useLogout();

const isLoading = computed(() => isStoreLoading.value || isUserLoading.value);
// Derived state
const hasStore = computed(() => !!storeData.value?.data);
const storeStatus = computed(() => storeData.value?.data?.status);
const isBuyer = computed(() => userData.value?.data?.role === "buyer");

const isOnboarding = computed(() => route.path === "/seller/onboarding");
const isPendingApproval = computed(
  () => route.path === "/seller/pending-approval",
);

// If there's an API error (404) or data is just empty, they don't have a store.
const noStore = computed(() => isError.value || !hasStore.value);

const needsRedirect = computed(
  () =>
    (noStore.value && isBuyer.value && !isOnboarding.value) ||
    (noStore.value && !isBuyer.value) ||
    (hasStore.value &&
      storeStatus.value === "pending" &&
      !isPendingApproval.value) ||
    (hasStore.value &&
      storeStatus.value !== "pending" &&
      (isOnboarding.value || isPendingApproval.value)),
);

watch(
  [
    isLoading,
    noStore,
    hasStore,
    storeStatus,
    isBuyer,
    isOnboarding,
    isPendingApproval,
  ],
  () => {
    if (isLoading.value) return;
    if (noStore.value) {
      // 1. User does not have a store profile yet (isError is true)
      if (isBuyer.value) {
        // If they are a standard buyer, send them to Onboarding
        if (!isOnboarding.value) router.push("/seller/onboarding");
      } else {
        // If they are an Admin (or someone else), they shouldn't be here at all
        router.push("/");
      }
    } else {
      // 2. User has submitted a store profile
      if (storeStatus.value === "pending") {
        // Waiting for Admin Approval (Role is likely still "buyer" at this point)
        if (!isPendingApproval.value) router.push("/seller/pending-approval");
      } else {
        // Store is Active (Role is now "seller") or Suspended
        if (isOnboarding.value || isPendingApproval.value) {
          router.push("/seller");
        }
      }
    }
  },
);
</script>

<style scoped></style>
