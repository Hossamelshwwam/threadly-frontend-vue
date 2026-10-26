<template>
  <div
    v-if="isLoading"
    class="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans"
  >
    <div class="max-w-lg w-full space-y-8 animate-in fade-in duration-200">
      <div
        class="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-8"
      >
        <div class="space-y-3 text-center">
          <div class="h-8 w-48 bg-zinc-100 rounded-lg animate-pulse mx-auto" />
          <div class="h-4 w-64 bg-zinc-100 rounded animate-pulse mx-auto" />
        </div>
        <div class="flex items-center justify-between px-4">
          <div
            v-for="i in 3"
            :key="i"
            class="flex flex-col items-center gap-2"
          >
            <div class="w-10 h-10 rounded-full bg-zinc-100 animate-pulse" />
            <div class="h-3 w-16 bg-zinc-100 rounded animate-pulse" />
          </div>
        </div>
        <div class="h-24 bg-zinc-100 rounded-xl animate-pulse" />
      </div>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans"
  >
    <div
      class="max-w-lg w-full space-y-8 animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Card -->
      <div
        class="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-10 shadow-sm text-center space-y-8"
      >
        <!-- Icon -->
        <div
          class="w-16 h-16 bg-amber-50 border border-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-sm"
        >
          <Timer :size="32" />
        </div>

        <!-- Title & Subtitle -->
        <div class="space-y-2">
          <h1 class="text-2xl font-black text-zinc-900 tracking-tight">
            Store Review in Progress
          </h1>
          <p class="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
            Your vendor registration for
            <span class="font-bold text-zinc-800"
              >&ldquo;{{ store?.storeName || "your store" }}&rdquo;</span
            >
            is currently being reviewed by our team.
          </p>
        </div>

        <!-- Status Tracker -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shrink-0"
              >
                <ShieldCheck :size="16" class="text-white" />
              </div>
              <div class="text-left">
                <p class="text-sm font-bold text-zinc-900">
                  Registration Submitted
                </p>
                <p class="text-xs text-zinc-400">Your details are in</p>
              </div>
            </div>
          </div>

          <div class="relative pl-11">
            <div class="absolute left-[15px] top-0 bottom-0 w-px bg-amber-200" />
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-amber-100 border-2 border-amber-400 rounded-full flex items-center justify-center shrink-0 relative z-10"
              >
                <Timer :size="14" class="text-amber-600" />
              </div>
              <div class="text-left">
                <p class="text-sm font-bold text-zinc-900">Under Review</p>
                <p class="text-xs text-zinc-400">
                  Admin is verifying your store
                </p>
              </div>
            </div>
          </div>

          <div class="relative pl-11">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center shrink-0"
              >
                <Store :size="14" class="text-zinc-400" />
              </div>
              <div class="text-left">
                <p class="text-sm font-bold text-zinc-400">Approved</p>
                <p class="text-xs text-zinc-300">Start selling on Threadly</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Box -->
        <div
          class="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-left space-y-3"
        >
          <div class="flex items-start gap-3">
            <Mail :size="16" class="text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p class="text-xs font-semibold text-zinc-700">
                What happens next?
              </p>
              <p class="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                You will receive an email notification once your store is
                approved. You can also check back here anytime.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Timer :size="16" class="text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p class="text-xs font-semibold text-zinc-700">Estimated time</p>
              <p class="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                Most stores are reviewed within 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <CustomButton
            variant="solid"
            theme="primary"
            :loading="isRefetching"
            :full-width="true"
            @click="refetch()"
          >
            Check Approval Status
          </CustomButton>
          <CustomButton
            variant="outline"
            theme="neutral"
            :left-icon="LogOut"
            :full-width="true"
            @click="logout"
          >
            Sign Out
          </CustomButton>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-xs text-zinc-400 text-center">
        Need help?
        <a
          href="mailto:support@threadly.com"
          class="text-main hover:underline font-bold"
        >
          Contact Support
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { LogOut, Mail, ShieldCheck, Store, Timer } from "lucide-vue-next";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import useLogout from "@/shared/hooks/useLogout";
import { useGetMyStore } from "../hooks/useGetMyStore";

const router = useRouter();
const { data, isLoading, refetch, isRefetching } = useGetMyStore();
const { logout } = useLogout();

const store = computed(() => data.value?.data);

// Poll for approval while the page is open; the guard would also bounce the
// user out, but this covers the "approved while I'm looking at it" case.
let pollId: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  pollId = setInterval(() => refetch(), 30000);
});

onUnmounted(() => {
  if (pollId) clearInterval(pollId);
});

watch(
  () => store.value?.status,
  (status) => {
    if (status === "approved") router.push("/seller");
  },
  { immediate: true },
);
</script>

<style scoped></style>
