import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";

import { cn } from "@/shared/lib/utils";
import type { Order } from "@/domains/orders/types/order.types";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  processing: {
    label: "Processing",
    className: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function useRecentOrdersColumns() {
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
              "font-semibold text-zinc-700 hover:text-main transition-colors font-mono text-xs",
          },
          () => `#${id.slice(-6).toUpperCase()}`,
        );
      },
    },
    {
      id: "buyer",
      header: "Buyer",
      cell: ({ row }) => {
        const buyer = row.original.buyerId;

        return h("div", {}, [
          h("p", { class: "font-medium text-zinc-800" }, buyer?.name ?? "—"),
          h("p", { class: "text-xs text-zinc-400" }, buyer?.email ?? ""),
        ]);
      },
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: ({ row }) => {
        const total = row.original.total;

        return h(
          "span",
          { class: "font-semibold text-zinc-800" },
          `EGP ${total.toLocaleString()}`,
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusVal = row.original.status;
        const status = statusConfig[statusVal] ?? {
          label: statusVal,
          className: "bg-zinc-100 text-zinc-600 border-zinc-200",
        };

        return h(
          "span",
          {
            class: cn(
              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border capitalize",
              status.className,
            ),
          },
          status.label,
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const dateStr = row.original.createdAt;

        return h(
          "span",
          { class: "text-zinc-400 text-xs whitespace-nowrap" },
          new Date(dateStr).toLocaleDateString("en-EG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        );
      },
    },
  ];

  return { columns };
}
