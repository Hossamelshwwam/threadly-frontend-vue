<template>
  <div
    class="bg-white rounded-2xl border border-zinc-200 shadow-sm font-sans flex flex-col"
  >
    <!-- Header Area -->
    <div
      class="px-6 sm:px-8 py-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/50 rounded-t-2xl"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 border border-amber-100"
        >
          <Store :size="20" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-zinc-900 leading-none">
            Store Information
          </h3>
          <p class="text-xs text-zinc-500 mt-1">
            Review your public profile and payout configuration.
          </p>
        </div>
      </div>
      <CustomButton
        variant="outline"
        theme="neutral"
        size="sm"
        :left-icon="SquarePen"
        @click="emit('edit')"
      >
        Edit Profile
      </CustomButton>
    </div>

    <!-- Main Content Grid -->
    <div class="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
      <!-- Left Column: Text & Financials -->
      <div class="md:col-span-7 space-y-8">
        <!-- Text Info -->
        <div class="space-y-5">
          <div>
            <p
              class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1"
            >
              Store Name
            </p>
            <p class="text-base font-semibold text-zinc-900">
              {{ store?.storeName || "Unnamed Store" }}
            </p>
          </div>

          <div>
            <p
              class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1"
            >
              Store Description
            </p>
            <p
              class="text-sm text-zinc-700 leading-relaxed max-w-lg whitespace-pre-wrap"
            >
              <template v-if="store?.description">{{ store.description }}</template>
              <span v-else class="italic text-zinc-400">
                No description provided.
              </span>
            </p>
          </div>
        </div>

        <!-- Bank Info Card -->
        <div class="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <div
            class="flex items-center gap-2 mb-4 border-b border-zinc-200 pb-3"
          >
            <Landmark :size="18" class="text-zinc-500" />
            <h4 class="text-sm font-bold text-zinc-900">Payout Destination</h4>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <p
                class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1"
              >
                Bank Name
              </p>
              <p class="text-sm font-medium text-zinc-900">
                {{ store?.bankDetails?.bankName || "Not configured" }}
              </p>
            </div>
            <div>
              <p
                class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1"
              >
                Account Holder
              </p>
              <p class="text-sm font-medium text-zinc-900">
                {{ store?.bankDetails?.accountName || "Not configured" }}
              </p>
            </div>
            <div class="sm:col-span-2">
              <p
                class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1"
              >
                Account Number / IBAN
              </p>
              <p class="text-sm font-mono font-medium text-zinc-700">
                {{ maskAccountNumber(store?.bankDetails?.accountNumber) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Media Previews -->
      <div
        class="md:col-span-5 space-y-6 md:border-l md:border-zinc-100 md:pl-8"
      >
        <div class="flex items-center gap-2 mb-2">
          <ImageIcon :size="16" class="text-zinc-400" />
          <h4 class="text-sm font-bold text-zinc-900">Branding Assets</h4>
        </div>

        <!-- Logo Preview -->
        <div>
          <p
            class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2"
          >
            Store Logo
          </p>
          <div
            class="relative w-20 h-20 rounded-full border border-zinc-200 shadow-sm overflow-hidden bg-zinc-50 flex items-center justify-center shrink-0"
          >
            <img
              v-if="store?.logo"
              :src="store.logo"
              alt="Logo"
              width="40"
              height="40"
              class="object-contain w-auto h-auto"
            />
            <span v-else class="text-2xl  font-black text-zinc-300">
              {{ storeInitial }}
            </span>
          </div>
        </div>

        <!-- Banner Preview -->
        <div>
          <p
            class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2"
          >
            Store Banner
          </p>
          <div
            class="relative w-full h-32 rounded-xl border border-zinc-200 shadow-sm overflow-hidden bg-zinc-50 flex items-center justify-center"
          >
            <img
              v-if="store?.banner"
              :src="store.banner"
              alt="Banner"
              width="500"
              height="132"
              loading="eager"
              class="object-cover"
            />
            <span v-else class="text-xs font-medium text-zinc-400">
              No banner uploaded
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Image as ImageIcon, Landmark, SquarePen, Store } from "lucide-vue-next";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import type { SellerProfile } from "../../types/seller.types";

const props = defineProps<{
  store?: SellerProfile;
}>();

const emit = defineEmits<{
  edit: [];
}>();

const maskAccountNumber = (accountNumber?: string) => {
  if (!accountNumber) return "Not provided";
  if (accountNumber.length < 8) return accountNumber;
  return `**** **** **** ${accountNumber.slice(-4)}`;
};

const storeInitial = computed(
  () => props.store?.storeName?.charAt(0)?.toUpperCase() || "S",
);
</script>
