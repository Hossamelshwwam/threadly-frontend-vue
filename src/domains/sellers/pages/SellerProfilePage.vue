<template>
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center h-[60vh]"
  >
    <LoaderCircle :size="36" class="text-4xl text-amber-500 animate-spin mb-4" />
    <p class="text-sm font-medium text-zinc-500">
      Loading store settings...
    </p>
  </div>

  <div v-else class="max-w-6xl mx-auto space-y-6 pb-12">
    <!-- Page Title -->
    <div>
      <h1 class="text-2xl font-black text-zinc-900">Store Settings</h1>
      <p class="text-sm text-zinc-500 mt-1">
        Manage your public store profile, branding, and payout details.
      </p>
    </div>

    <!-- Dynamic Render based on Edit State -->
    <!-- --- PREVIEW MODE (Full Width) --- -->
    <div v-if="!isEditing" class="w-full animate-in fade-in zoom-in-95 duration-200">
      <StoreProfilePreview :store="store" @edit="isEditing = true" />
    </div>

    <!-- --- EDIT MODE (Split Grid) --- -->
    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <!-- Left Column: Text Forms -->
      <div class="lg:col-span-8">
        <StoreProfileForm :store="store" @cancel="isEditing = false" />
      </div>

      <!-- Right Column: Image Dropzones -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <SellerLogoDropzone :current-logo="store?.logo" />
        </div>

        <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <SellerBannerDropzone :current-banner="store?.banner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { LoaderCircle } from "lucide-vue-next";

import { useGetMyStore } from "../hooks/useGetMyStore";
import SellerLogoDropzone from "../components/profile/SellerLogoDropzone.vue";
import SellerBannerDropzone from "../components/profile/SellerBannerDropzone.vue";
import StoreProfilePreview from "../components/profile/StoreProfilePreview.vue";
import StoreProfileForm from "../components/profile/StoreProfileForm.vue";

const { data, isLoading } = useGetMyStore();
const isEditing = ref(false);

const store = computed(() => data.value?.data);
</script>
