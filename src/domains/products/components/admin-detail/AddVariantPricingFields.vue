<template>
  <!--
    Root-level fragment: these inputs are laid out by the parent's
    `grid grid-cols-1 sm:grid-cols-2 gap-4` container, so no wrapper here.
  -->
  <CustomInput
    name="price"
    type="number"
    label="Variant Level Price (EGP) *"
    placeholder="0.00"
    half
    :min="0"
    :step="0.01"
    :error="priceError"
    InputClass="bg-white"
    v-model="priceModel"
  />

  <CustomInput
    name="stock"
    type="number"
    label="Initial Physical Floor Stock *"
    placeholder="0"
    :min="0"
    :error="stockError"
    InputClass="bg-white"
    v-model="stockModel"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useField } from "vee-validate";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";

const { value: price, errorMessage: priceError } =
  useField<number | undefined>("price");
const { value: stock, errorMessage: stockError } =
  useField<number | undefined>("stock");

// Number inputs hand back strings; keep the form value numeric so the zod
// schema (and the submitted payload) sees a number. The raw string is kept
// separately so partial input like "12." isn't rewritten mid-typing.
const priceInput = ref("");
const stockInput = ref("");

// Sync the local strings when the field values change from outside (the form
// resetting after a successful submit), while leaving typing untouched.
watch(
  price,
  (value) => {
    if (typeof value === "number" && Number.isNaN(value)) return;

    const local = priceInput.value === "" ? undefined : Number(priceInput.value);

    if (value !== local) {
      priceInput.value = typeof value === "number" ? String(value) : "";
    }
  },
  { immediate: true },
);

watch(
  stock,
  (value) => {
    if (typeof value === "number" && Number.isNaN(value)) return;

    const local = stockInput.value === "" ? undefined : Number(stockInput.value);

    if (value !== local) {
      stockInput.value = typeof value === "number" ? String(value) : "";
    }
  },
  { immediate: true },
);

const priceModel = computed<string | undefined>({
  get: () => priceInput.value,
  set: (value) => {
    priceInput.value = value ?? "";
    price.value =
      priceInput.value === "" ? undefined : Number(priceInput.value);
  },
});

const stockModel = computed<string | undefined>({
  get: () => stockInput.value,
  set: (value) => {
    stockInput.value = value ?? "";
    stock.value =
      stockInput.value === "" ? undefined : Number(stockInput.value);
  },
});
</script>
