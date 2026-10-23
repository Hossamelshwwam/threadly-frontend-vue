<template>
  <section class="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
    <div
      class="flex items-center justify-between mb-4 border-b border-zinc-100 pb-4"
    >
      <h2 class="text-lg sm:text-xl font-bold text-zinc-900">Payment Method</h2>
    </div>

    <!-- Changed from overflow-x-auto to a responsive grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <!-- COD Option -->
      <label
        @click="selectMethod = 'cash_on_delivery'"
        :class="
          cn(
            'relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all w-full',
            selectMethod === 'cash_on_delivery'
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-zinc-200 hover:border-zinc-300 bg-white',
          )
        "
      >
        <div class="flex items-start justify-between w-full mb-1">
          <div class="flex items-center gap-2.5">
            <CircleDollarSign
              :size="22"
              :class="
                selectMethod === 'cash_on_delivery'
                  ? 'text-amber-500'
                  : 'text-zinc-400'
              "
            />
            <span class="font-bold text-zinc-900 text-sm sm:text-base">
              Cash on Delivery
            </span>
          </div>

          <!-- Proper Radio Button Indicator -->
          <div
            :class="
              cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                selectMethod === 'cash_on_delivery'
                  ? 'border-amber-500'
                  : 'border-zinc-300',
              )
            "
          >
            <div
              v-if="selectMethod === 'cash_on_delivery'"
              class="w-2.5 h-2.5 bg-amber-500 rounded-full"
            />
          </div>
        </div>

        <span class="text-xs sm:text-sm font-medium text-zinc-500 ml-8">
          Pay when you receive it
        </span>
      </label>

      <!-- Credit Card Option (Disabled Mock) -->
      <label
        class="relative flex flex-col p-4 rounded-xl border-2 border-zinc-200 bg-zinc-50 opacity-60 cursor-not-allowed w-full"
      >
        <div class="flex items-start justify-between w-full mb-1">
          <div class="flex items-center gap-2.5">
            <CreditCard :size="22" class="text-zinc-400" />
            <span class="font-bold text-zinc-900 text-sm sm:text-base">
              Credit Card
            </span>
          </div>

          <!-- Disabled Radio Indicator -->
          <div
            class="w-5 h-5 rounded-full border-2 border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0"
          />
        </div>

        <span class="text-xs sm:text-sm font-medium text-zinc-500 ml-8">
          Coming soon
        </span>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CircleDollarSign, CreditCard } from "lucide-vue-next";
import { cn } from "@/shared/lib/utils";

const selectMethod = defineModel<"credit_card" | "cash_on_delivery">(
  "selectMethod",
  { required: true },
);
</script>

<style scoped></style>
