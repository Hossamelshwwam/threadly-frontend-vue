<template>
  <div class="space-y-5">
    <!-- Page header -->
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-bold text-zinc-900">Users</h1>
      <span
        v-if="!isLoading"
        class="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full"
      >
        {{ pagination?.total?.toLocaleString() }}
      </span>
    </div>

    <!-- Filter bar -->
    <AdminUsersFilterBar
      v-model:search="search"
      v-model:role-filter="roleFilter"
    />

    <!-- Table -->
    <CustomTable
      :columns="columns"
      :data="users"
      :is-loading="isLoading"
      empty-state-title="No users found"
      show-clear-filters
      :page="page"
      :limit="20"
      :total-pages="pagination?.pages"
      :total-items="pagination?.total"
      @clear-filters="clearFilters"
      @page-change="page = $event"
    >
      <template #emptyIcon>
        <User :size="48" class="text-5xl text-zinc-300 mx-auto" />
      </template>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { User } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import AdminUsersFilterBar from "../components/AdminUsersFilterBar.vue";
import { useAdminUsers } from "../hooks/useAdminUsers";
import useAdminUsersColumns from "../hooks/columns/useAdminUsersColumns";
import type { AdminUsersParams, UserRole } from "../types/user.types";

const search = ref("");
const debouncedSearch = ref("");
const roleFilter = ref<UserRole | "">("");
const page = ref(1);
const limit = 20;

const { columns } = useAdminUsersColumns();

// Debounce search
let searchTimer: ReturnType<typeof setTimeout> | undefined;

watch(search, (value) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedSearch.value = value;
  }, 400);
});

onBeforeUnmount(() => clearTimeout(searchTimer));

const params = computed<AdminUsersParams>(() => ({
  search: debouncedSearch.value || undefined,
  role: roleFilter.value || undefined,
  page: page.value,
  limit,
}));

const { data, isLoading } = useAdminUsers(params);

const users = computed(() => data.value?.data ?? []);
const pagination = computed(() => data.value?.pagination);

const clearFilters = () => {
  search.value = "";
  roleFilter.value = "";
  page.value = 1;
};
</script>
