<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div>
      <h1 class="text-2xl font-bold text-zinc-900">
        <span
          v-if="storeLoading"
          class="inline-block h-7 w-48 bg-zinc-100 rounded animate-pulse align-middle"
        />
        <template v-else>Welcome back, {{ storeName ?? "Seller" }}!</template>
      </h1>
      <p class="text-sm text-zinc-400 mt-0.5">
        {{ today }}
      </p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total Revenue"
        :value="revenueValue"
        :icon="CreditCard"
        :loading="payoutsLoading"
        variant="brand"
        :trend="{ label: 'Lifetime earnings before fees' }"
      />
      <StatCard
        label="Total Orders"
        :value="ordersValue"
        :icon="ShoppingBag"
        :loading="ordersLoading"
        :trend="{ label: 'Across all your products' }"
      />
      <StatCard
        label="Store Rating"
        :value="ratingValue"
        :icon="Star"
        :loading="storeLoading"
        :trend="{ label: ratingTrend }"
      />
      <StatCard
        label="Active Products"
        :value="productsValue"
        :icon="Box"
        :loading="productsLoading"
        :trend="{ label: 'Currently listed' }"
      />
    </div>

    <!-- Main content grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2">
        <RecentOrdersWidget :orders="recentOrders" :loading="ordersLoading" />
      </div>
      <div class="flex flex-col gap-6">
        <EarningsSnapshotWidget :summary="summary" :loading="payoutsLoading" />
        <QuickActionsWidget />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Box, CreditCard, ShoppingBag, Star } from "lucide-vue-next";

import StatCard from "@/shared/components/StatCard.vue";
import RecentOrdersWidget from "../components/dashboard/RecentOrdersWidget.vue";
import EarningsSnapshotWidget from "../components/dashboard/EarningsSnapshotWidget.vue";
import QuickActionsWidget from "../components/dashboard/QuickActionsWidget.vue";
import { useGetMyStore } from "../hooks/useGetMyStore";
import { useSellerOrders } from "@/domains/orders/hooks/useSellerOrders";
import { useSellerProducts } from "@/domains/products/hooks/useSellerProducts";
import { useSellerPayouts } from "@/domains/payouts/hooks/useSellerPayouts";

const { data: storeData, isLoading: storeLoading } = useGetMyStore();
const { data: ordersData, isLoading: ordersLoading } = useSellerOrders({
  limit: 5,
});
const { data: productsData, isLoading: productsLoading } = useSellerProducts({
  limit: 1,
});
const { data: payoutsData, isLoading: payoutsLoading } = useSellerPayouts({
  limit: 1,
});

const storeProfile = computed(() => storeData.value?.data);
const rating = computed(() => storeProfile.value?.rating);
const storeName = computed(() => storeProfile.value?.storeName);
const totalOrders = computed(() => ordersData.value?.pagination?.total ?? 0);
const totalProducts = computed(
  () => productsData.value?.pagination?.total ?? 0,
);
const summary = computed(() => payoutsData.value?.data?.summary);
const recentOrders = computed(() => ordersData.value?.data ?? []);

const statsLoading = computed(
  () =>
    storeLoading.value ||
    ordersLoading.value ||
    productsLoading.value ||
    payoutsLoading.value,
);

const revenueValue = computed(() =>
  payoutsLoading.value
    ? "—"
    : `EGP ${(summary.value?.totalEarned ?? 0).toLocaleString()}`,
);

const ordersValue = computed(() =>
  statsLoading.value ? "—" : totalOrders.value.toLocaleString(),
);

const ratingValue = computed(() =>
  storeLoading.value
    ? "—"
    : rating.value
      ? `${rating.value.toFixed(1)} ★`
      : "—",
);

const ratingTrend = computed(() =>
  rating.value
    ? `${storeProfile.value?.totalSales ?? 0} sale${storeProfile.value?.totalSales === 1 ? "" : "s"}`
    : "No ratings yet",
);

const productsValue = computed(() =>
  statsLoading.value ? "—" : totalProducts.value.toLocaleString(),
);

const today = new Date().toLocaleDateString("en-EG", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
</script>
