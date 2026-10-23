import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye } from "lucide-vue-next";

import OrderStatusBadge from "../../components/OrderStatusBadge.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";
import type { Order } from "../../types/order.types";

export default function useMyOrdersColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Order>[] = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) =>
        h(
          "span",
          { class: "font-mono font-bold text-sm text-zinc-800" },
          `#${row.original._id.slice(-8).toUpperCase()}`,
        ),
    },
    {
      accessorKey: "createdAt",
      header: "Date Placed",
      cell: ({ row }) =>
        h(
          "span",
          { class: "text-sm font-medium text-zinc-600" },
          new Date(row.original.createdAt).toLocaleDateString("en-EG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        ),
    },
    {
      accessorKey: "itemCount",
      header: "Items",
      cell: ({ row }) => {
        const itemCount = row.original.itemCount ?? 0;
        return h(
          "span",
          { class: "text-sm font-medium text-zinc-600" },
          `${itemCount} ${itemCount === 1 ? "item" : "items"}`,
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total Amount",
      cell: ({ row }) =>
        h(
          "span",
          { class: "text-sm font-bold text-zinc-900" },
          `EGP ${row.original.total.toLocaleString()}`,
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(OrderStatusBadge, { status: row.original.status }),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) =>
        h(RouterLink, { to: `/account/orders/${row.original._id}` }, () =>
          h(
            CustomButton,
            {
              variant: "soft",
              theme: "neutral",
              size: "sm",
              leftIcon: Eye,
            },
            () => "View Details",
          ),
        ),
    },
  ];

  return { columns };
}
