import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";

import { cn } from "@/shared/lib/utils";
import type { Order } from "@/domains/orders/types/order.types";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-zinc-100 text-zinc-700 border-zinc-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function useUserOrdersColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Order>[] = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => {
        const id = row.original._id;

        return h(
          RouterLink,
          {
            to: `/admin/orders/${id}`,
            class:
              "font-semibold text-zinc-700 hover:text-amber-600 transition-colors font-mono text-xs",
          },
          () => `#${id.slice(-6).toUpperCase()}`,
        );
      },
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: ({ row }) =>
        h(
          "span",
          { class: "font-semibold text-zinc-800" },
          `EGP ${row.original.total.toLocaleString()}`,
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusStyle =
          ORDER_STATUS_STYLES[status] ??
          "bg-zinc-100 text-zinc-600 border-zinc-200";

        return h(
          "span",
          {
            class: cn(
              "text-xs font-semibold px-2 py-0.5 rounded-md border capitalize",
              statusStyle,
            ),
          },
          status,
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;

        return h(
          "span",
          {
            class: cn(
              "text-xs font-semibold px-2 py-0.5 rounded-md border capitalize",
              status === "paid"
                ? "bg-[#edf5f1] text-[#3d7a5e] border-success/30"
                : "bg-zinc-100 text-zinc-600 border-zinc-200",
            ),
          },
          status,
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        h(
          "span",
          { class: "text-zinc-400 text-xs whitespace-nowrap" },
          new Date(row.original.createdAt).toLocaleDateString("en-EG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        ),
    },
  ];

  return { columns };
}
