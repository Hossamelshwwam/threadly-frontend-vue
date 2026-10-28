<template>
  <CustomTable
    :columns="columns"
    :data="orders"
    :is-loading="loading"
    empty-state-title="No recent orders"
    empty-state-description="Platform orders summary will appear here"
    href="/admin/orders"
    title="Recent Orders"
  >
    <template #emptyIcon>
      <ShoppingBag :size="48" class="text-5xl text-zinc-300 mx-auto" />
    </template>
  </CustomTable>
</template>

<script setup lang="ts">
import { ShoppingBag } from "lucide-vue-next";

import type { Order } from "@/domains/orders/types/order.types";
import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import useRecentOrdersColumns from "@/shared/hooks/useRecentOrdersColumns";

withDefaults(
  defineProps<{
    orders: Order[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const { columns } = useRecentOrdersColumns();
</script>
