import { computed, h, type Ref } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { Pencil, ToggleRight, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { cn } from "@/shared/lib/utils";

import type { Category } from "../../types/category.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import CategoryNameCell from "../../components/CategoryNameCell.vue";
import { tableFeaturesConfig } from "@/shared/components/custom-table/CustomTable.vue";

interface UseAdminCategoriesColumnsOptions {
  // A ref, not a boolean: `isPending` flips while a mutation runs and the
  // delete dialog reads it on every render (React memoized on the same dep).
  isUpdating: Ref<boolean>;
  onEdit: (category: Category) => void;
  onToggleStatus: (category: Category) => void;
  onDelete: (id: string) => Promise<unknown>;
  onUploadImage: (id: string, file: File) => Promise<unknown>;
}

export default function useAdminCategoriesColumns({
  isUpdating,
  onEdit,
  onToggleStatus,
  onDelete,
  onUploadImage,
}: UseAdminCategoriesColumnsOptions) {
  const columns = computed<ColumnDef<typeof tableFeaturesConfig, Category>[]>(
    () => [
      {
        accessorKey: "number",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "name",
        header: "Category Info",
        cell: ({ row }) =>
          h(CategoryNameCell, {
            category: row.original,
            onUploadImage,
          }),
      },
      {
        id: "parentPath",
        header: "Hierarchy Placement",
        cell: ({ row }) => {
          const category = row.original;
          if (category.parentId && typeof category.parentId === "object") {
            return h(
              "span",
              {
                class:
                  "text-[10px] sm:text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/40 px-2 py-1 rounded-md whitespace-nowrap",
              },
              `${category.parentId.name} → ${category.name}`,
            );
          }

          return h(
            "span",
            {
              class:
                "text-[10px] sm:text-xs font-bold bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md whitespace-nowrap",
            },
            "Root Level Domain",
          );
        },
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
          const isActive = row.original.isActive;

          return h(
            "span",
            {
              class: cn(
                "text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border whitespace-nowrap",
                isActive
                  ? "bg-success-bg text-success border-success/30"
                  : "bg-error-bg text-error border-error/20",
              ),
            },
            isActive ? "Active" : "Inactive",
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const category = row.original;

          const handleQuickDelete = () => {
            toast.promise(onDelete(category._id), {
              loading: "Removing category element...",
              success: "Category deleted successfully",
              error: (err: AxiosError<{ message: string }>) =>
                err?.response?.data?.message || "Failed to purge category node",
            });
          };

          // FIX: Added whitespace-nowrap and flex-nowrap to prevent buttons from stacking
          return h(
            "div",
            {
              class: "flex items-center gap-1.5 flex-nowrap whitespace-nowrap",
            },
            [
              h(CustomButton, {
                variant: "ghost",
                theme: "neutral",
                size: "sm",
                iconOnly: true,
                rightIcon: () => h(Pencil, { size: 14 }),
                onClick: () => onEdit(category),
              }),

              h(CustomButton, {
                variant: "ghost",
                theme: category.isActive ? "warning" : "success",
                size: "sm",
                iconOnly: true,
                rightIcon: () => h(ToggleRight, { size: 14 }),
                onClick: () => onToggleStatus(category),
              }),

              h(
                ConfirmationDialog,
                {
                  variant: "danger",
                  title: "Delete Category",
                  description: `Are you sure you want to permanently delete "${category.name}"? This action cannot be reverted.`,
                  confirmText: "Delete Category",
                  isLoading: isUpdating.value,
                  onConfirm: handleQuickDelete,
                },
                {
                  default: () =>
                    h(CustomButton, {
                      variant: "ghost",
                      theme: "danger",
                      size: "sm",
                      iconOnly: true,
                      rightIcon: () => h(Trash2, { size: 14 }),
                    }),
                },
              ),
            ],
          );
        },
      },
    ],
  );

  return { columns };
}
