<template>
  <div
    class="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm font-sans"
  >
    <div class="flex items-center gap-3 pb-4 border-b border-zinc-100">
      <div class="p-2 bg-main-subtle rounded-lg">
        <Settings2 :size="20" class="text-main text-xl" />
      </div>
      <div>
        <h2 class="text-lg font-bold text-zinc-900 tracking-tight">
          Specifications & Features
        </h2>
        <p class="text-xs text-zinc-500 mt-0.5">
          Add care instructions, material details, or sizing notes.
        </p>
      </div>
    </div>

    <!-- Add New Attribute Block -->
    <div class="bg-zinc-50/80 border border-zinc-200 rounded-xl p-5 space-y-4">
      <CustomInput
        name="attrKey"
        type="text"
        label="Feature Title"
        placeholder="e.g. Material & Care"
        v-model="newKey"
        InputClass="bg-white rounded-lg"
      />

      <CustomTextarea
        name="attrValue"
        label="Feature Description"
        placeholder="e.g. 100% Organic Cotton. Machine wash cold."
        v-model="newValue"
        textareaClass="bg-white rounded-lg min-h-[80px]"
      />

      <div class="flex justify-end">
        <CustomButton
          type="button"
          variant="solid"
          theme="primary"
          size="sm"
          class="rounded-xl"
          :left-icon="PlusIcon"
          @click="handleAddAttribute"
        >
          Add Feature
        </CustomButton>
      </div>
    </div>

    <!-- List of Added Attributes -->
    <div v-if="attributes.length > 0" class="grid grid-cols-1 gap-3 pt-2">
      <div
        v-for="(attr, idx) in attributes"
        :key="idx"
        class="bg-white border border-zinc-100 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm group hover:border-zinc-200 transition-colors"
      >
        <div>
          <h4
            class="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1"
          >
            {{ attr.key }}
          </h4>
          <p
            class="text-sm text-zinc-800 font-medium whitespace-pre-wrap"
          >
            {{ attr.value }}
          </p>
        </div>
        <button
          type="button"
          @click="handleRemoveAttribute(idx)"
          class="text-zinc-300 hover:text-error hover:bg-error-bg p-2 rounded-lg transition-colors shrink-0"
        >
          <Trash2 :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { Plus, Settings2, Trash2 } from "lucide-vue-next";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const attributes = defineModel<{ key: string; value: string }[]>("attributes", {
  required: true,
});

const newKey = ref("");
const newValue = ref("");

const PlusIcon = () => h(Plus, { size: 14 });

const handleAddAttribute = () => {
  if (!newKey.value.trim() || !newValue.value.trim()) return;
  attributes.value = [
    ...attributes.value,
    { key: newKey.value.trim(), value: newValue.value.trim() },
  ];
  newKey.value = "";
  newValue.value = "";
};

const handleRemoveAttribute = (idx: number) => {
  attributes.value = attributes.value.filter((_, i) => i !== idx);
};
</script>
