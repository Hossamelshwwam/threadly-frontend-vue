<template>
  <!--
    Root-level fragment: these inputs are laid out by the parent's
    `grid grid-cols-1 sm:grid-cols-2 gap-4` container, so no wrapper here.
  -->
  <CustomInput
    name="sku"
    type="text"
    label="Unique Variant SKU Identifier *"
    placeholder="e.g. TSHRT-LNN-SLIM-BLK-XL"
    half
    :error="skuError"
    v-model="sku"
    InputClass="bg-white"
  />

  <CustomInput
    name="size"
    type="text"
    label="Size Attribute Dimension *"
    placeholder="e.g. M, XL, 34, OneSize"
    half
    :error="sizeError"
    v-model="size"
    InputClass="bg-white"
  />

  <CustomInput
    name="color"
    type="text"
    label="Color Variant Label *"
    placeholder="e.g. Pure Black, Midnight Blue"
    half
    :error="colorError"
    v-model="color"
    InputClass="bg-white"
  />
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";

const { value: sku, errorMessage: skuError } =
  useField<string | undefined>("sku");
const { value: size, errorMessage: sizeError } =
  useField<string | undefined>("size");
const { value: color, errorMessage: colorError } =
  useField<string | undefined>("color");
</script>
