import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye } from "lucide-vue-next";

import type { Payout } from "../../types/payout.types";
import PayoutStatusBadge from "../../components/PayoutStatusBadge.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";

export default function useSellerPayoutsColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Payout>[] = [
    {
      id: "order",
      header: "Source Order",
      cell: ({ row }) => {
        const payout = row.original;
        return h("div", { class: "font-sans" }, [
          payout.orderId
            ? h(
                "span",
                {
                  class: "text-sm font-bold text-zinc-900 block truncate",
                },
                payout.orderId.orderNumber,
              )
            : h(
                "span",
                {
                  class: "italic text-zinc-400 text-sm font-medium",
                },
                "No Order",
              ),
        ]);
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
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
          ],
        );
      },
    },
    {
      id: "financials",
      header: "Amount",
      cell: ({ row }) => {
        const { amount } = row.original;
        return h("div", { class: "font-sans" }, [
          h(
            "span",
            { class: "text-sm font-bold text-zinc-900 text-nowrap" },
            `EGP ${amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`,
          ),
        ]);
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(PayoutStatusBadge, { status: row.original.status }),
    },
    {
      id: "net",
      header: () => "Net Received",
      cell: ({ row }) => {
        const { netAmount } = row.original;
        return h("div", { class: "font-sans" }, [
          h(
            "span",
            { class: "text-sm font-bold text-success text-nowrap" },
            `+ EGP ${netAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`,
          ),
        ]);
      },
    },
    {
      id: "actions",
      header: "actions",
      enableSorting: false,
      cell: ({ row }) => {
        const payout = row.original;
        return h("div", { class: "flex items-center" }, [
          h(RouterLink, { to: `/seller/payouts/${payout._id}` }, () =>
            h(
              CustomButton,
              {
                variant: "soft",
                theme: "neutral",
                size: "sm",
                leftIcon: () => h(Eye, { size: 14 }),
              },
              () => "Details",
            ),
          ),
        ]);
      },
    },
  ];

  return { columns };
}
