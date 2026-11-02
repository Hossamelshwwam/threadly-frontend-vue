import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye } from "lucide-vue-next";

import type { Order } from "../../types/order.types";
import OrderStatusBadge from "../../components/OrderStatusBadge.vue";
import PaymentStatusBadge from "../../components/PaymentStatusBadge.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";

export default function useAdminOrdersColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Order>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order Spec Code",
      cell: ({ row }) => {
        const order = row.original;
        return h("div", { class: "font-sans" }, [
          h(
            "span",
            {
              class: "font-mono text-xs font-bold text-zinc-800 block",
            },
            order.orderNumber,
          ),
        ]);
      },
    },
    {
      accessorKey: "buyerId",
      header: "Buyer Consumer Profile",
      cell: ({ row }) => {
        const order = row.original;
        return h("div", { class: "font-sans" }, [
          h(
            "span",
            {
              class:
                "text-sm font-bold text-zinc-900 block truncate max-w-[160px]",
            },
            order.shippingAddress.fullName || order.buyerId.name,
          ),
          h(
            "span",
            {
              class:
                "text-xs text-zinc-400 block truncate max-w-[160px]",
              title: order.buyerId.email,
            },
            order.buyerId.email,
          ),
        ]);
      },
    },
    {
      accessorKey: "createdAt",
      header: "Logged Timestamp",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return h(
          "div",
          { class: "font-sans text-xs text-zinc-500 whitespace-nowrap" },
          [
            h("span", { class: "block font-medium" }, [
              date.toLocaleDateString("en-EG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            ]),
            h("span", { class: "block text-[10px] text-zinc-400 mt-0.5" }, [
              date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            ]),
          ],
        );
      },
    },
    {
      accessorKey: "status",
      header: "Fulfillment State",
      cell: ({ row }) => h(OrderStatusBadge, { status: row.original.status }),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Settlement",
      cell: ({ row }) => {
        const order = row.original;
        return h(
          "div",
          { class: "flex flex-col items-start gap-1 font-sans" },
          [
            h(PaymentStatusBadge, { status: order.paymentStatus }),
            h(
              "span",
              {
                class:
                  "text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap",
              },
              order.paymentMethod.replace(/_/g, " "),
            ),
          ],
        );
      },
    },
    {
      accessorKey: "total",
      header: "Financial Gross Total",
      cell: ({ row }) => {
        const order = row.original;
        return h("div", { class: "font-sans pr-4" }, [
          h(
            "span",
            {
              class: "text-sm font-extrabold text-zinc-900 block",
            },
            `EGP ${order.total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          ),
          order.subtotal !== order.total
            ? h(
                "span",
                {
                  class:
                    "text-[10px] font-medium text-zinc-400 block line-through",
                },
                `EGP ${order.subtotal.toLocaleString()}`,
              )
            : null,
        ]);
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const order = row.original;
        return h("div", { class: "flex items-center pr-2" }, [
          h(RouterLink, { to: `/admin/orders/${order._id}` }, () =>
            h(
              CustomButton,
              {
                variant: "soft",
                theme: "neutral",
                size: "sm",
                leftIcon: () => h(Eye, { size: 14 }),
              },
              () => "View Details",
            ),
          ),
        ]);
      },
    },
  ];

  return { columns };
}
