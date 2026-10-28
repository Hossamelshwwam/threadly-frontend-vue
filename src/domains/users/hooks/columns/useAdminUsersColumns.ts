import { h } from "vue";
import { RouterLink } from "vue-router";
import type { ColumnDef } from "@tanstack/vue-table";
import { CircleCheck, CircleX, Eye } from "lucide-vue-next";

import type { UserProfile } from "../../types/user.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomAvatar from "@/shared/components/custom-avatar/CustomAvatar.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";
import RoleBadge from "../../components/RoleBadge.vue";
import StatusBadge from "../../components/StatusBadge.vue";

export default function useAdminUsersColumns() {
  const columns: ColumnDef<typeof tableFeaturesConfig, UserProfile>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;

        return h("div", { class: "flex items-center gap-3" }, [
          h(CustomAvatar, {
            fallback: user.name.charAt(0).toUpperCase(),
            img: user.avatar,
          }),
          h("div", {}, [
            h("p", { class: "font-semibold text-zinc-800" }, user.name),
            h("p", { class: "text-xs text-zinc-400" }, user.email),
          ]),
        ]);
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => h(RoleBadge, { role: row.original.role }),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => h(StatusBadge, { isActive: row.original.isActive }),
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      cell: ({ row }) =>
        row.original.isVerified
          ? h(CircleCheck, { size: 16, class: "text-base text-success" })
          : h(CircleX, { size: 16, class: "text-base text-error" }),
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
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
        const user = row.original;

        return h("div", { class: "flex items-center gap-1.5" }, [
          h(RouterLink, { to: `/admin/users/${user._id}` }, () =>
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
