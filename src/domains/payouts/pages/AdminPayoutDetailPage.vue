<template>
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center h-64 gap-3"
  >
    <LoaderCircle class="animate-spin text-amber-500 text-3xl" :size="30" />
    <p class="text-sm font-medium text-zinc-500">
      Retrieving secure financial ledger...
    </p>
  </div>

  <div v-else-if="isError || !payout" class="text-center py-12 space-y-3">
    <p class="text-error font-semibold">Failed to load payout details.</p>
    <CustomButton variant="outline" @click="router.back()">
      Go Back
    </CustomButton>
  </div>

  <div v-else class="space-y-6 font-sans max-w-6xl mx-auto pb-12">
    <RouterLink
      to="/admin/payouts"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
    >
      <ArrowLeft :size="14" /> Back to Payouts
    </RouterLink>
    <!-- Header -->
    <div class="flex items-center gap-4 border-b border-zinc-200 pb-4">
      <div>
        <h1 class="text-xl font-bold text-zinc-900 truncate">Payout Detail</h1>
        <p class="text-xs text-zinc-400 mt-0.5">
          Manage and review vendor financial settlement.
        </p>
      </div>
    </div>
    <!-- Main Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <PayoutDetailsCard :payout="payout" />
      <PayoutActionPanel :payout="payout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { ArrowLeft, LoaderCircle } from "lucide-vue-next";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useAdminPayout } from "../hooks/useAdminPayouts";
import PayoutDetailsCard from "../components/detail/PayoutDetailsCard.vue";
import PayoutActionPanel from "../components/detail/PayoutActionPanel.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const { data: response, isLoading, isError } = useAdminPayout(() => props.id);

const payout = computed(() => response.value?.data);
</script>
