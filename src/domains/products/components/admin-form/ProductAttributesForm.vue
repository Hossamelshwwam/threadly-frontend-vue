<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-6 space-y-5 shadow-xs font-sans"
  >
    <div>
      <h2 class="text-sm font-bold text-zinc-900">
        Custom Product Attributes
      </h2>
      <p class="text-xs text-on-surface-muted mt-0.5">
        Define platform specific parameter pairs or extensive care profiles.
      </p>
    </div>

    <div class="bg-zinc-50 border border-zinc-200/60 rounded-lg p-4 space-y-4">
      <CustomInput
        name="attrKey"
        type="text"
        label="Attribute Specification Key"
        placeholder="e.g. Composition & Care, Sizing Guide Note"
        v-model="newKey"
        InputClass="bg-white h-11 text-sm border-zinc-200"
      />

      <CustomTextarea
        name="attrValue"
        label="Detailed Value Profile Description"
        placeholder="e.g. 100% premium combed organic cotton. Machine wash cold with similar colors."
        v-model="newValue"
        textareaClass="bg-white text-sm border-zinc-200"
        :rows="3"
      />

      <div class="flex justify-end">
        <CustomButton
          type="button"
          variant="solid"
          theme="neutral"
          class="h-10 px-4 font-semibold text-sm cursor-pointer"
          :left-icon="AddIcon"
          @click="handleAddAttribute"
        >
          Add Attribute Parameter
        </CustomButton>
      </div>
    </div>

    <div v-if="attributes.length > 0" class="flex flex-col gap-4 pt-2">
      <div
        v-for="(attr, idx) in attributes"
        :key="idx"
        class="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col hover:border-zinc-300 transition-colors group relative"
      >
        <div
          class="bg-zinc-50/80 border-b border-zinc-100 px-4 py-2.5 flex items-center justify-between gap-2"
        >
          <span
            class="text-xs font-bold text-zinc-500 uppercase tracking-wider truncate"
          >
            {{ attr.key }}
          </span>
          <button
            type="button"
            @click="handleRemoveAttribute(idx)"
            class="text-zinc-400 hover:text-error transition-colors p-1 cursor-pointer rounded hover:bg-zinc-100"
            :title="`Remove ${attr.key}`"
          >
            <Trash2 :size="15" />
          </button>
        </div>

        <div class="p-4 flex-1 bg-white">
          <p
            class="text-sm text-on-surface leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto font-medium pr-1 custom-scrollbar"
          >
            {{ attr.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import { useField } from "vee-validate";
import { Plus, Trash2 } from "lucide-vue-next";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import type { ProductAttribute } from "../../types/product.types";

const { value: attributesValue } =
  useField<ProductAttribute[] | undefined>("attributes");

const attributes = computed(() => attributesValue.value ?? []);

const newKey = ref("");
const newValue = ref("");

const AddIcon = () => h(Plus, { size: 14 });

const handleAddAttribute = () => {
  if (!newKey.value.trim() || !newValue.value.trim()) return;

  attributesValue.value = [
    ...attributes.value,
    { key: newKey.value.trim(), value: newValue.value.trim() },
  ];

  newKey.value = "";
  newValue.value = "";
};

const handleRemoveAttribute = (index: number) => {
  attributesValue.value = attributes.value.filter((_, i) => i !== index);
};
</script>
