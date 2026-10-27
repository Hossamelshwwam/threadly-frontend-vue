import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye, Image as ImageIcon } from "lucide-vue-next";

import type { Product } from "../../types/product.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";
import ProductStatusBadge from "../../components/ProductStatusBadge.vue";

// ── Hook Interface ───────────────────────────────────────────────────────────

export default function useSellerProductsColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Product>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        const mainImage = product.images?.[0];

        return h("div", { class: "flex items-center gap-3" }, [
          h(
            "div",
            {
              class:
                "w-10 h-10 rounded-lg border border-zinc-200 bg-zinc-50 overflow-hidden flex items-center justify-center shrink-0 relative",
            },
            [
              mainImage
                ? h("img", {
                    src: mainImage,
                    alt: product.name,
                    width: 40,
                    height: 40,
                    class: "object-cover",
                  })
                : h(ImageIcon, { size: 18, class: "text-zinc-400 text-lg" }),
            ],
          ),
          h("div", {}, [
            h(
              "p",
              { class: "font-semibold text-zinc-800 truncate max-w-50" },
              product.name,
            ),
            h(
              "p",
              { class: "text-xs text-zinc-400 truncate max-w-50" },
              (product.categoryId &&
                typeof product.categoryId === "object" &&
                product.categoryId.name) ||
                "Uncategorized",
            ),
          ]),
        ]);
      },
    },
    {
      accessorKey: "basePrice",
      header: "Price",
      cell: ({ row }) =>
        h(
          "span",
          { class: "text-sm font-medium text-zinc-700" },
          `$${row.original.basePrice?.toFixed(2)}`,
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(ProductStatusBadge, { status: row.original.status }),
    },

    {
      id: "category",
      header: "Category",
      cell: ({ row }) => {
        const cat = row.original.categoryId;
        const categoryName = typeof cat === "object" ? cat.name : "Unknown";
        return h(
          "span",
          {
            class:
              "text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/40 px-2 py-1 rounded-md whitespace-nowrap",
          },
          categoryName,
        );
      },
    },
    {
      id: "actions",
      header: () => h("div", { class: "text-right" }, "Actions"),
      enableSorting: false,
      cell: ({ row }) => {
        const product = row.original;

        return h(RouterLink, { to: `/seller/products/${product._id}` }, () =>
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
        );
      },
    },
  ];

  return { columns };
}
