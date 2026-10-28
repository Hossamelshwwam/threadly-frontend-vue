import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye, Inbox } from "lucide-vue-next";

import type { OrderItem } from "../../types/order.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";
import OrderItemStatusBadge from "../../components/OrderItemStatusBadge.vue";

// ── Hook Interface ───────────────────────────────────────────────────────────

export default function useSellerOrdersColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, OrderItem>[] = [
    {
      id: "product",
      header: "Item Details",
      cell: ({ row }) => {
        const item = row.original;
        const product = item.productId;

        return h("div", { class: "flex items-center gap-3" }, [
          h(
            "div",
            {
              class:
                "h-10 w-10 relative rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0",
            },
            [
              product?.images?.[0]
                ? h("img", {
                    src: product.images[0],
                    alt: "Product",
                    width: 40,
                    height: 40,
                    class: "object-cover",
                  })
                : h(Inbox, { size: 14, class: "absolute inset-0 m-auto text-zinc-300" }),
            ],
          ),
          h("div", { class: "flex flex-col" }, [
            h(
              "span",
              {
                class:
                  "text-sm font-bold text-zinc-900 truncate max-w-[200px]",
              },
              product?.name || item.productName || "Unknown Product",
            ),
            // FIX 1: Use size and color instead of the non-existent sku
            h(
              "div",
              {
                class: "flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5",
              },
              [
                h("span", { class: "font-semibold" }, item.size),
                h("span", {}, "•"),
                h("div", { class: "flex items-center gap-1" }, [
                  h("span", {
                    style: { backgroundColor: item.color },
                    class:
                      "w-2.5 h-2.5 rounded-full border border-black/10 block",
                  }),
                  h("span", {}, item.color),
                ]),
              ],
            ),
          ]),
        ]);
      },
    },
    {
      id: "orderInfo",
      header: "Order Reference",
      cell: ({ row }) => {
        const item = row.original;

        // FIX 2: Safely extract orderId whether it is a string or a populated object
        const orderIdString =
          typeof item.orderId === "object" ? item.orderId._id : item.orderId;

        return h(
          "span",
          {
            class:
              "text-xs font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded w-fit",
          },
          `#${orderIdString ? orderIdString.slice(-8).toUpperCase() : "N/A"}`,
        );
      },
    },
    {
      id: "financials",
      header: "Qty & Total",
      cell: ({ row }) => {
        const item = row.original;

        return h("div", { class: "flex flex-col" }, [
          // FIX 3: Directly use item.total from the backend
          h(
            "span",
            { class: "text-sm font-bold text-zinc-900" },
            `EGP ${item.total.toLocaleString()}`,
          ),
          h(
            "span",
            { class: "text-xs text-zinc-500 font-medium" },
            `${item.quantity}x @ EGP ${item.unitPrice.toLocaleString()}`,
          ),
        ]);
      },
    },
    {
      accessorKey: "status",
      header: "Fulfillment Status",
      cell: ({ row }) => h(OrderItemStatusBadge, { status: row.original.status }),
    },
    {
      id: "actions",
      header: "actions",
      cell: ({ row }) =>
        h("div", { class: "flex" }, [
          h(RouterLink, { to: `/seller/orders/${row.original._id}` }, () =>
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
        ]),
    },
  ];

  return { columns };
}
