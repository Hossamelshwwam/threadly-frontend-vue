<template>
  <div
    v-if="
      item.status === 'processing' ||
      item.status === 'shipped' ||
      isEditingTracking
    "
    class="border-t border-zinc-100 pt-3.5 space-y-3"
  >
    <form
      v-if="isEditingTracking"
      @submit.prevent="emit('save')"
      class="space-y-2.5"
    >
      <CustomInput
        name="trackingNumber"
        type="text"
        label="Courier Tracking Serial Code *"
        placeholder="e.g. EG123456789"
        :model-value="trackingNumber"
        @update:model-value="(value) => (trackingNumber = value ?? '')"
        InputClass="bg-white"
      />
      <div class="flex gap-2 justify-end">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          size="sm"
          class="h-8 text-xs rounded-lg"
          @click="cancelEditing"
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          size="sm"
          class="h-8 text-xs rounded-lg"
          :disabled="isPending || !trackingNumber.trim()"
          :left-icon="CheckIcon"
        >
          Save &amp; Apply
        </CustomButton>
      </div>
    </form>

    <div
      v-else
      class="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-xl p-3 text-sm"
    >
      <div class="flex items-center gap-2 text-zinc-600 font-medium">
        <Truck :size="16" class="text-zinc-400 text-base" />
        <span v-if="item.trackingNumber" class="text-zinc-800">
          Tracking:
          <span
            class="font-mono font-bold bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-xs"
          >
            {{ item.trackingNumber }}
          </span>
        </span>
        <span v-else class="text-zinc-400 italic text-xs">
          No tracking number linked
        </span>
      </div>
      <button
        v-if="item.status !== 'delivered' && item.status !== 'cancelled'"
        type="button"
        @click="isEditingTracking = true"
        class="text-xs text-amber-600 hover:text-amber-700 font-bold underline transition-colors cursor-pointer"
      >
        {{ item.trackingNumber ? "Update code" : "Link code" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { Check, Truck } from "lucide-vue-next";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import type { OrderItem } from "../../types/order.types";

const props = defineProps<{
  item: OrderItem;
  isPending: boolean;
}>();

const emit = defineEmits<{
  save: [];
}>();

const isEditingTracking = defineModel<boolean>("isEditingTracking", {
  required: true,
});
const trackingNumber = defineModel<string>("trackingNumber", { required: true });

const CheckIcon = () => h(Check, { size: 14 });

const cancelEditing = () => {
  isEditingTracking.value = false;
  trackingNumber.value = props.item.trackingNumber || "";
};
</script>
