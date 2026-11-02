import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye } from "lucide-vue-next";

import type { Payout } from "../../types/payout.types";
import PayoutStatusBadge from "../../components/PayoutStatusBadge.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";

export default function useAdminPayoutsColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Payout>[] = [
    {
      id: "order",
      header: "Source Order",
      cell: ({ row }) => {
        const payout = row.original;
        return h("div", { class: "font-sans" }, [
          payout.orderId
            ? h(
                RouterLink,
                {
                  to: `/admin/orders/${payout.orderId._id}`,
                  class:
                    "text-sm font-bold text-main hover:text-main-warm hover:underline block truncate",
                },
                () => payout.orderId.orderNumber,
              )
            : h(
                "span",
                {
                  class: "italic text-zinc-400 text-sm font-medium",
                },
                "No Order Attached",
              ),
        ]);
      },
    },
    {
      accessorKey: "sellerId",
      header: "Seller / Vendor",
      cell: ({ row }) => {
        const seller = row.original.sellerId;
        return h(
          "div",
          { class: "font-sans flex items-center h-full" },
          [
            h(
              "span",
              {
                class:
                  "text-sm font-bold text-zinc-900 block truncate max-w-[160px]",
              },
              seller.storeName,
            ),
          ],
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Requested Date",
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
      header: "Status",
      cell: ({ row }) => h(PayoutStatusBadge, { status: row.original.status }),
    },
    {
      id: "financials",
      header: () => h("div", { class: "text-right" }, "Settlement Breakdown"),
      cell: ({ row }) => {
        const { amount, platformFee, netAmount } = row.original;
        return h("div", { class: "font-sans flex flex-col gap-1 w-full" }, [
          h(
            "span",
            { class: "text-sm font-bold text-success block" },
            `+ EGP ${netAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`,
          ),
          h(
            "div",
            {
              class:
                "text-[10px] font-medium text-zinc-400 flex items-center gap-1.5",
            },
            [
              h("span", {}, `Gross: ${amount.toLocaleString()}`),
              h("span", { class: "text-zinc-300" }, "•"),
              h(
                "span",
                { class: "text-error font-semibold" },
                `Fee: -${platformFee.toLocaleString()}`,
              ),
            ],
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
          h(RouterLink, { to: `/admin/payouts/${payout._id}` }, () =>
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
