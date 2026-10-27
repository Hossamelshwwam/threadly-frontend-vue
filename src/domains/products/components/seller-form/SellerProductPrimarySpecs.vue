<template>
  <div
    class="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm font-sans"
  >
    <div class="flex items-center gap-3 pb-4 border-b border-zinc-100">
      <div class="p-2 bg-main-subtle rounded-lg">
        <Info :size="20" class="text-main text-xl" />
      </div>
      <div>
        <h2 class="text-lg font-bold text-zinc-900 tracking-tight">
          Basic Information
        </h2>
        <p class="text-xs text-zinc-500 mt-0.5">
          The core details that buyers will see first.
        </p>
      </div>
    </div>

    <div class="space-y-5">
      <CustomInput
        name="name"
        type="text"
        label="Product Title *"
        placeholder="e.g. Premium Cotton T-Shirt"
        :error="nameError"
        v-model="name"
        InputClass="bg-zinc-50/50 rounded-xl"
      />

      <CustomTextarea
        name="description"
        label="Detailed Description *"
        placeholder="Describe your product's features, fit, and feel..."
        :error="descriptionError"
        v-model="description"
        textareaClass="bg-zinc-50/50 rounded-xl min-h-[120px]"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <CustomInput
          name="basePrice"
          type="number"
          label="Base Price (EGP) *"
          placeholder="0.00"
          :min="0"
          :step="0.01"
          :error="basePriceError"
          v-model="basePriceModel"
          InputClass="bg-zinc-50/50 rounded-xl font-medium"
        />

        <CustomSelect
          name="categoryId"
          label="Category *"
          placeholder="Select a category"
          :options="categoryOptions"
          :error="categoryIdError"
          v-model="categoryId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useField } from "vee-validate";
import { Info } from "lucide-vue-next";
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
