<template>
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center h-64 gap-3"
  >
    <LoaderCircle class="animate-spin text-amber-500 text-3xl" :size="30" />
    <p class="text-sm font-medium text-zinc-500">
      Loading payout details...
    </p>
  </div>

  <div v-else-if="isError || !payout" class="text-center py-12 space-y-3">
    <p class="text-error font-semibold">Failed to load payout details.</p>
    <CustomButton variant="outline" @click="router.back()">
      Go Back
    </CustomButton>
  </div>

  <div v-else class="space-y-6 font-sans max-w-6xl mx-auto pb-12">
    <!-- Header with back button -->
    <div class="flex items-center gap-4 border-b border-zinc-200 pb-4">
      <button
        type="button"
        class="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 cursor-pointer"
        @click="router.push('/seller/payouts')"
      >
        <ArrowLeft :size="20" />
      </button>
      <div>
        <h1 class="text-xl font-bold text-zinc-900">Payout Detail</h1>
        <p class="text-xs text-zinc-500 mt-0.5">Payout ID: {{ payout._id }}</p>
      </div>
    </div>

    <!-- Main card -->
    <div
      class="bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden"
    >
      <PayoutHero :payout="payout" />
      <PayoutSourceInfo :payout="payout" />
      <PayoutSettlementBreakdown :payout="payout" />
    </div>

    <!-- Admin note (if any) -->
    <PayoutAdminNote :note="payout.adminNote" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, LoaderCircle } from "lucide-vue-next";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useSellerPayout } from "../hooks/useSellerPayouts";
import PayoutHero from "../components/seller-details/PayoutHero.vue";
import PayoutSourceInfo from "../components/seller-details/PayoutSourceInfo.vue";
import PayoutSettlementBreakdown from "../components/seller-details/PayoutSettlementBreakdown.vue";
import PayoutAdminNote from "../components/seller-details/PayoutAdminNote.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const { data: response, isLoading, isError } = useSellerPayout(() => props.id);

const payout = computed(() => response.value?.data);
</script>
