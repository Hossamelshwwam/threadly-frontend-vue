<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-5 sticky top-22 font-sans"
  >
    <div class="flex items-center gap-2 mb-4">
      <FolderPlus :size="18" class="text-amber-500 text-lg" />
      <h2 class="text-base font-bold text-zinc-900">
        {{ isEditing ? "Modify Classification" : "Publish Category Node" }}
      </h2>
    </div>

    <form @submit.prevent="emit('submit')" class="space-y-4">
      <CustomInput
        name="name"
        type="text"
        label="Category Name"
        placeholder="e.g. Leather Accessories"
        v-model="name"
      />

      <CustomSelect
        name="parentId"
        label="Parent Category"
        placeholder="— Select Parent Category —"
        :options="parentOptions"
        v-model="parentId"
      />

      <div class="flex items-center gap-2 pt-2">
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          class="flex-1"
        >
          {{ isEditing ? "Save Adjustments" : "Create Node" }}
        </CustomButton>

        <CustomButton
          v-if="isEditing"
          variant="outline"
          theme="neutral"
          @click="emit('cancel')"
        >
          Cancel
        </CustomButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FolderPlus } from "lucide-vue-next";

import type { Category } from "../types/category.types";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";

const props = defineProps<{
  isEditing: boolean;
  categories: Category[];
  selectedCategory: Category | null;
}>();

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const name = defineModel<string>("name", { required: true });
const parentId = defineModel<string | undefined>("parentId", {
  required: true,
});

const parentOptions = computed(() =>
  props.categories
    .filter(
      (c) => !props.selectedCategory || c._id !== props.selectedCategory._id,
    )
    .map((c) => ({
      label: c.name,
      value: c._id,
    })),
);
</script>
