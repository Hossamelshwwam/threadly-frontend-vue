<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div>
      <h1 class="text-2xl font- text-zinc-900">Overview</h1>
      <p class="text-sm text-zinc-400 mt-0.5">
        {{ today }}
      </p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total Users"
        :value="statsLoading ? '—' : totalUsers.toLocaleString()"
        :icon="User"
        :loading="statsLoading"
        :trend="{ label: 'All registered users' }"
      />
      <StatCard
        label="Total Sellers"
        :value="statsLoading ? '—' : totalSellers.toLocaleString()"
        :icon="Store"
        :loading="allSellersLoading"
        :trend="{ label: `${pendingSellersTotal} pending approval` }"
      />
      <StatCard
        label="Total Orders"
        :value="statsLoading ? '—' : totalOrders.toLocaleString()"
        :icon="ShoppingBag"
        :loading="ordersLoading"
        :trend="{ label: 'Across all sellers' }"
      />
      <StatCard
        label="Pending Payouts"
        :value="
          payoutStatsLoading
            ? '—'
            : `EGP ${pendingPayoutsAmount.toLocaleString()}`
        "
        :icon="CreditCard"
        :loading="payoutStatsLoading"
        variant="brand"
        :trend="{
          label: `${pendingPayoutsCount} payout${pendingPayoutsCount !== 1 ? 's' : ''} awaiting`,
        }"
      />
    </div>

    <!-- Main content grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Recent orders — takes 2/3 -->
      <div class="xl:col-span-2">
        <RecentOrdersWidget :orders="recentOrders" :loading="ordersLoading" />
      </div>

      <!-- Right column -->
      <div class="flex flex-col gap-6">
        <PendingSellersWidget
          :sellers="pendingSellers"
          :loading="pendingSellersLoading"
        />
        <PayoutStatsWidget
          :stats="payoutStatsData?.data"
          :loading="payoutStatsLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CreditCard, ShoppingBag, Store, User } from "lucide-vue-next";

import StatCard from "@/shared/components/StatCard.vue";
import RecentOrdersWidget from "@/shared/components/admin/dashboard/RecentOrdersWidget.vue";
import PendingSellersWidget from "@/shared/components/admin/dashboard/PendingSellersWidget.vue";
import PayoutStatsWidget from "@/shared/components/admin/dashboard/PayoutStatsWidget.vue";
import { useAdminOrders } from "@/domains/orders/hooks/useAdminOrders";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminUsers } from "@/domains/users/hooks/useAdminUsers";
import { useAdminPayoutStats } from "@/domains/payouts/hooks/useAdminPayouts";

// Data fetching
const { data: ordersData, isLoading: ordersLoading } = useAdminOrders({
  limit: 8,
});

const { data: pendingSellersData, isLoading: pendingSellersLoading } =
  useAdminSellers({ status: "pending", limit: 5 });

const { data: usersData, isLoading: usersLoading } = useAdminUsers({
  limit: 1,
});

const { data: allSellersData, isLoading: allSellersLoading } = useAdminSellers({
  limit: 1,
});

const { data: payoutStatsData, isLoading: payoutStatsLoading } =
  useAdminPayoutStats();

// Derived values
const totalUsers = computed(() => usersData.value?.pagination?.total ?? 0);
const totalSellers = computed(() => allSellersData.value?.pagination?.total ?? 0);
const totalOrders = computed(() => ordersData.value?.pagination?.total ?? 0);
const pendingPayoutsCount = computed(
  () => payoutStatsData.value?.data?.pending?.count ?? 0,
);
const pendingPayoutsAmount = computed(
  () => payoutStatsData.value?.data?.pending?.netAmount ?? 0,
);
const pendingSellersTotal = computed(
  () => pendingSellersData.value?.pagination?.total ?? 0,
);

const recentOrders = computed(() => ordersData.value?.data ?? []);
const pendingSellers = computed(() => pendingSellersData.value?.data ?? []);

const statsLoading = computed(
  () =>
    ordersLoading.value ||
    usersLoading.value ||
    allSellersLoading.value ||
    payoutStatsLoading.value,
);

const today = new Date().toLocaleDateString("en-EG", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
</script>
