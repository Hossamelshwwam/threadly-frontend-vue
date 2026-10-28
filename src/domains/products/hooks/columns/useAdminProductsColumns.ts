import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye, Image as ImageIcon } from "lucide-vue-next";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";
import type { Product } from "../../types/product.types";
import ProductStatusBadge from "../../components/ProductStatusBadge.vue";

export default function useAdminProductsColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, Product>[] = [
    {
      accessorKey: "name",
      header: "Product Item",
      cell: ({ row }) => {
        const product = row.original;
        const thumbnail = product.images?.[0];

        return h("div", { class: "flex items-center gap-3 font-sans" }, [
          h(
            "div",
            {
              class:
                "w-10 h-10 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative",
            },
            [
              thumbnail
                ? h("img", {
                    src: thumbnail,
                    alt: product.name,
                    class: "object-cover h-full w-full",
                  })
                : h(ImageIcon, { size: 18, class: "text-zinc-400 text-lg" }),
            ],
          ),
          h("div", {}, [
            h(
              "p",
              {
                class: "font-semibold text-zinc-800 line-clamp-1 max-w-50",
                title: product.name,
              },
              product.name,
            ),
            h(
              "p",
              { class: "text-xs font-mono text-zinc-400 mt-0.5" },
              `slug: ${product.slug}`,
            ),
          ]),
        ]);
      },
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
      id: "seller",
      header: "Seller Store",
      cell: ({ row }) => {
        const seller = row.original.sellerId;

        const storeName =
          typeof seller === "object" && seller
            ? seller.storeName
            : "Platform Direct";

        return h(
          "span",
          { class: "text-sm font-medium text-zinc-600 whitespace-nowrap" },
          storeName,
        );
      },
    },
    {
      accessorKey: "basePrice",
      header: "Base Price",
      cell: ({ row }) =>
        h(
          "span",
          { class: "font-semibold text-zinc-800 whitespace-nowrap" },
          `EGP ${row.original.basePrice.toLocaleString()}`,
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(ProductStatusBadge, { status: row.original.status }),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const product = row.original;

        return h(RouterLink, { to: `/admin/products/${product._id}` }, () =>
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
