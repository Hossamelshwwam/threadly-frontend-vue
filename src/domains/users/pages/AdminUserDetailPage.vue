<template>
  <div v-if="isLoading" class="space-y-6">
    <div class="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
    <div class="lg:grid-cols-3 grid gap-6">
      <div class="col-span-1 space-y-4">
        <div class="bg-white border border-zinc-200 rounded-lg p-6 space-y-6">
          <div class="flex flex-col items-center gap-3">
            <div class="w-16 h-16 rounded-full bg-zinc-100 animate-pulse" />
            <div class="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
            <div class="h-3.5 w-40 rounded bg-zinc-100 animate-pulse" />
          </div>
          <div class="border-t border-zinc-100 pt-4 space-y-6">
            <div v-for="i in 4" :key="i" class="flex justify-between">
              <div class="h-3.5 w-16 rounded bg-zinc-100 animate-pulse" />
              <div class="h-3.5 w-24 rounded bg-zinc-100 animate-pulse" />
            </div>
          </div>
        </div>
        <div class="bg-white border border-zinc-200 rounded-lg p-5">
          <div class="h-10 rounded-md bg-zinc-100 animate-pulse" />
        </div>
      </div>
      <div class="col-span-2 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="i in 2"
            :key="i"
            class="bg-white border border-zinc-200 rounded-lg p-5 space-y-3"
          >
            <div class="h-4 w-20 rounded bg-zinc-100 animate-pulse" />
            <div class="h-8 w-24 rounded bg-zinc-100 animate-pulse" />
          </div>
        </div>
        <div
          class="h-60 rounded-lg bg-white border border-zinc-200 animate-pulse"
        />
      </div>
    </div>
  </div>

  <div
    v-else-if="!user"
    class="flex flex-col items-center justify-center py-24 text-center"
  >
    <p class="text-zinc-500 font-semibold text-lg">User not found</p>
    <RouterLink to="/admin/users" class="mt-4">
      <CustomButton variant="outline" theme="neutral" size="sm">
        Back to Users
      </CustomButton>
    </RouterLink>
  </div>

  <div v-else class="space-y-6 font-sans">
    <!-- Back button link -->
    <RouterLink
      to="/admin/users"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
    >
      <ArrowLeft :size="14" />
      Back to Users
    </RouterLink>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Profile Context Sidebar Column -->
      <div class="col-span-1">
        <UserProfileSidebar
          :user="user"
          :is-toggling="isToggling"
          @toggle-status="handleToggleStatus"
        />
      </div>

      <!-- Right Dashboard Data Streams Analytics Column -->
      <div class="col-span-1 lg:col-span-2 flex flex-col gap-6">
        <UserStatsOverview
          :order-count="stats?.orderCount ?? 0"
          :total-spent="stats?.totalSpent ?? 0"
        />

        <!-- User History Interactive Order Ledger -->
        <CustomTable
          title="Recent Orders"
          :columns="columns"
          :data="recentOrders"
          empty-state-title="No orders yet"
          empty-state-description="This user has not placed any platform orders yet"
        >
          <template #emptyIcon>
            <ShoppingBag :size="48" class="text-5xl text-zinc-300 mx-auto" />
          </template>
        </CustomTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { ArrowLeft, ShoppingBag } from "lucide-vue-next";

import { useAdminUser } from "../hooks/useAdminUser";
import { useToggleUserStatus } from "../hooks/useToggleUserStatus";
import useUserOrdersColumns from "../hooks/columns/useUserOrdersColumns";

import UserProfileSidebar from "../components/detail/UserProfileSidebar.vue";
import UserStatsOverview from "../components/detail/UserStatsOverview.vue";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomTable from "@/shared/components/custom-table/CustomTable.vue";

const props = defineProps<{
  id: string;
}>();

const { data, isLoading } = useAdminUser(() => props.id);
const { mutateAsync: toggleStatus, isPending: isToggling } =
  useToggleUserStatus();

const user = computed(() => data.value?.data?.user);
const stats = computed(() => data.value?.data?.stats);
const recentOrders = computed(() => data.value?.data?.recentOrders ?? []);

const handleToggleStatus = (variables: { id: string; isActive: boolean }) => {
  toast.promise(toggleStatus({ id: variables.id, isActive: variables.isActive }), {
    loading: "Loading...",
    success: "User status updated successfully",
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Error updating user status",
  });
};

const { columns } = useUserOrdersColumns();
</script>
