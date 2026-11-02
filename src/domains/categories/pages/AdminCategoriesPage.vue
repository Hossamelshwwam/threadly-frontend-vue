<template>
  <div class="font-sans">
    <div class="flex flex-col-reverse lg:flex-row gap-6 items-start">
      <div class="flex-1 w-full min-w-0 space-y-4">
        <CategoryFilterBar v-model:active-filter="activeFilter" />

        <CustomTable
          title="Product Categories"
          :columns="columns"
          :data="categories"
          :is-loading="isListLoading"
          :page="page"
          :limit="10"
          :total-pages="pagination?.pages"
          :total-items="pagination?.total"
          empty-state-title="No matching categories found"
          show-clear-filters
          @clear-filters="handleOpenCreate"
          @page-change="page = $event"
        >
          <template #emptyIcon>
            <ListChecks :size="48" class="text-5xl text-zinc-300 mx-auto" />
          </template>
        </CustomTable>
      </div>

      <!-- RIGHT VIEW: Form Panel -->
      <!-- FIX: Added `lg:sticky lg:top-24` so on desktop the form follows you as you scroll down a long list! -->
      <div class="w-full lg:w-80 shrink-0 z-10">
        <CategoryFormPanel
          v-model:name="name"
          v-model:parent-id="parentId"
          :is-editing="isEditing"
          :categories="allCategories"
          :selected-category="selectedCategory"
          @submit="handleSubmit"
          @cancel="handleOpenCreate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ListChecks } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useUploadCategoryImage,
} from "../hooks/useAdminCategories";
import useAdminCategoriesColumns from "../hooks/columns/useAdminCategoriesColumns";
import type {
  Category,
  AdminCategoriesQueryParams,
} from "../types/category.types";

import CategoryFilterBar from "../components/CategoryFilterBar.vue";
import CategoryFormPanel from "../components/CategoryFormPanel.vue";
import CustomTable from "@/shared/components/custom-table/CustomTable.vue";

const activeFilter = ref<boolean | null>(null);
const page = ref(1);

// Form State Configurations
const isEditing = ref(false);
const selectedCategory = ref<Category | null>(null);
const name = ref("");
const parentId = ref<string | undefined>(undefined);

const params = computed<AdminCategoriesQueryParams>(() => ({
  page: page.value,
  limit: 10,
  active: activeFilter.value !== null ? activeFilter.value : undefined,
}));

const { data: listData, isLoading: isListLoading } = useAdminCategories(params);

// The parent picker feeds off every category, not off the table's current
// page/filter, otherwise parent options change while you browse the list.
const { data: allCategoriesData } = useAdminCategories({
  page: 1,
  limit: 100,
});
const { mutateAsync: createCategory } = useCreateCategory();
const { mutateAsync: updateCategory, isPending: isUpdating } =
  useUpdateCategory();
const { mutateAsync: deleteCategory } = useDeleteCategory();
const { mutateAsync: uploadImageAsync } = useUploadCategoryImage();

const categories = computed(() => listData.value?.data ?? []);
const allCategories = computed(() => allCategoriesData.value?.data ?? []);
const pagination = computed(() => listData.value?.pagination);

const handleOpenCreate = () => {
  isEditing.value = false;
  selectedCategory.value = null;
  name.value = "";
  parentId.value = undefined;
};

const handleOpenEdit = (category: Category) => {
  isEditing.value = true;
  selectedCategory.value = category;
  name.value = category.name;
  const pid =
    typeof category.parentId === "object"
      ? category.parentId?._id
      : category.parentId;
  parentId.value = pid || undefined;

  // Smoothly scroll to top on mobile when Edit is clicked
  if (window.innerWidth < 1024) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Filter changes reset pagination
watch(activeFilter, () => {
  page.value = 1;
});

const handleSubmit = () => {
  if (!name.value.trim()) return;

  if (isEditing.value && selectedCategory.value) {
    toast.promise(
      updateCategory({
        id: selectedCategory.value._id,
        payload: { name: name.value, parentId: parentId.value ?? undefined },
      }),
      {
        loading: "Updating structural configuration...",
        success: () => {
          handleOpenCreate();
          return "Category updated successfully";
        },
        error: (err: AxiosError<{ message: string }>) =>
          err?.response?.data?.message || "Failed to update category",
      },
    );
  } else {
    toast.promise(
      createCategory({
        name: name.value,
        parentId: parentId.value ?? undefined,
      }),
      {
        loading: "Publishing category element...",
        success: () => {
          handleOpenCreate();
          return "Category created successfully";
        },
        error: (err: AxiosError<{ message: string }>) =>
          err?.response?.data?.message || "Failed to create category",
      },
    );
  }
};

const handleToggleStatus = (category: Category) => {
  toast.promise(
    updateCategory({
      id: category._id,
      payload: { isActive: !category.isActive },
    }),
    {
      loading: "Adjusting visibility lifecycle...",
      success: "Category status modified successfully",
      error: (err: AxiosError<{ message: string }>) =>
        err?.response?.data?.message || "Failed to alter status",
    },
  );
};

const { columns } = useAdminCategoriesColumns({
  isUpdating,
  onEdit: handleOpenEdit,
  onToggleStatus: handleToggleStatus,
  onDelete: deleteCategory,
  onUploadImage: (id, file) => uploadImageAsync({ id, file }),
});
</script>
