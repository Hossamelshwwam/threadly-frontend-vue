<template>
  <SellerGuard>
    <div class="min-h-screen flex bg-zinc-50">
      <SellerSidebar v-if="!hideLayout" />

      <div class="flex-1 flex flex-col min-w-0">
        <SellerHeader v-if="!hideLayout" />

        <main
          :class="[
            'flex-1 overflow-y-auto',
            hideLayout ? 'p-4' : 'p-4 sm:p-6 lg:p-8',
          ]"
        >
          <slot></slot>
        </main>
      </div>
    </div>
  </SellerGuard>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import SellerGuard from "../guard/SellerGuard.vue";
import SellerSidebar from "../components/layout/SellerSidebar.vue";
import SellerHeader from "../components/layout/SellerHeader.vue";

const route = useRoute();
const isOnboarding = route.path === "/seller/onboarding";
const isPendingApproval = route.path === "/seller/pending-approval";
const hideLayout = isOnboarding || isPendingApproval;
</script>

<style scoped></style>
