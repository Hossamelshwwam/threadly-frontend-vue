<template>
  <SellerGuard>
    <div class="min-h-screen flex bg-zinc-50">
      <SellerSidebar v-if="!hideLayout" />

      <div class="flex-1 flex flex-col min-w-0">
        <SellerHeader v-if="!hideLayout" />

        <main
          :class="
            cn([
              'flex-1 overflow-y-auto',
              hideLayout ? 'p-4' : 'p-4 sm:p-6 lg:p-8',
            ])
          "
        >
          <RouterView />
        </main>
      </div>
    </div>
  </SellerGuard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import SellerGuard from "../guard/SellerGuard.vue";
import SellerSidebar from "../components/layout/SellerSidebar.vue";
import SellerHeader from "../components/layout/SellerHeader.vue";
import { cn } from "@/shared/lib/utils/index.ts";

const route = useRoute();
const hideLayout = computed(
  () =>
    route.path === "/seller/onboarding" ||
    route.path === "/seller/pending-approval",
);
</script>

<style scoped></style>
