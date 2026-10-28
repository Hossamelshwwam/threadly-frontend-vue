import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { Eye, Store } from "lucide-vue-next";

import type { SellerProfile } from "../../types/seller.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";
import SellerStatusBadge from "../../components/SellerStatusBadge.vue";

export default function useAdminSellersColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, SellerProfile>[] = [
    {
      accessorKey: "storeName",
      header: "Store",
      cell: ({ row }) => {
        const seller = row.original;

        return h("div", { class: "flex items-center gap-3 font-sans" }, [
          h(
            "div",
            {
              class:
                "w-9 h-9 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 overflow-hidden relative",
            },
            seller.logo
              ? h("img", {
                  src: seller.logo,
                  alt: seller.storeName,
                  class: "object-cover h-full w-full",
                })
              : h(Store, { size: 16, class: "text-amber-500 text-base" }),
          ),
          h("div", {}, [
            h("p", { class: "font-semibold text-zinc-800" }, seller.storeName),
            h(
              "p",
              { class: "text-xs text-zinc-400" },
              seller.userId?.name ?? "Unknown Seller",
            ),
          ]),
        ]);
      },
    },
    {
      id: "email",
      header: "Owner Email",
      cell: ({ row }) =>
        h(
          "span",
          { class: "text-sm font-normal text-zinc-600" },
          row.original.userId?.email ?? "—",
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(SellerStatusBadge, { status: row.original.status }),
    },
    {
      accessorKey: "createdAt",
      header: "Registered",
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
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const seller = row.original;

        return h(
          RouterLink,
          { to: `/admin/sellers/${seller._id}` },
          () =>
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
