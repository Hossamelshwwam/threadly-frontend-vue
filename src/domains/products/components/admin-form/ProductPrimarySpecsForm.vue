<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs font-sans"
  >
    <h2
      class="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2"
    >
      Primary Specifications
    </h2>

    <CustomInput
      name="name"
      type="text"
      label="Product Title *"
      placeholder="e.g. Slim-Fit Linen Casual Shirt"
      :error="nameError"
      v-model="name"
    />

    <CustomTextarea
      name="description"
      label="Detailed Description *"
      placeholder="Write an extensive product profile description details..."
      :error="descriptionError"
      v-model="description"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CustomInput
        name="basePrice"
        type="number"
        label="Base Price (EGP) *"
        placeholder="0.00"
        :min="0"
        :step="0.01"
        :error="basePriceError"
        v-model="basePriceModel"
      />

      <CustomSelect
        name="categoryId"
        label="Category Classification *"
        placeholder="— Select Category Range —"
        :options="categoryOptions"
        :error="categoryIdError"
        v-model="categoryId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useField } from "vee-validate";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea.vue";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import type { Category } from "@/domains/categories/types/category.types";

const props = defineProps<{
  categories: Category[];
}>();

const { value: name, errorMessage: nameError } =
  useField<string | undefined>("name");

const { value: description, errorMessage: descriptionError } =
  useField<string | undefined>("description");

const { value: basePrice, errorMessage: basePriceError } =
  useField<number | undefined>("basePrice");

const { value: categoryId, errorMessage: categoryIdError } =
  useField<string | undefined>("categoryId");

// Number inputs hand back strings; keep the form value numeric so the zod
// schema (and the submitted payload) sees a number. The raw string is kept
// separately so partial input like "12." isn't rewritten mid-typing.
const basePriceInput = ref("");

// Sync the local string when the field value changes from outside (the edit
// page resetting the form), while leaving in-progress typing untouched.
watch(
  basePrice,
  (value) => {
    if (typeof value === "number" && Number.isNaN(value)) return;

    const local =
      basePriceInput.value === "" ? undefined : Number(basePriceInput.value);

    if (value !== local) {
      basePriceInput.value = typeof value === "number" ? String(value) : "";
    }
  },
  { immediate: true },
);

const basePriceModel = computed<string | undefined>({
  get: () => basePriceInput.value,
  set: (value) => {
    basePriceInput.value = value ?? "";
    basePrice.value =
      basePriceInput.value === "" ? undefined : Number(basePriceInput.value);
  },
});

const categoryOptions = computed(() =>
  props.categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  })),
);
</script>
