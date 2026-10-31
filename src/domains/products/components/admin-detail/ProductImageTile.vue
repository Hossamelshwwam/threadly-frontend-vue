<template>
  <div
    class="aspect-square border border-zinc-200 rounded-lg relative overflow-hidden bg-zinc-50 shadow-xs group"
  >
    <img
      :src="src"
      :alt="`Product asset visual slot ${index + 1}`"
      class="object-cover h-full w-full"
    />

    <!-- Delete Hover Overlay Frame Button -->
    <div
      class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
    >
      <ConfirmationDialog
        :on-confirm="() => emit('remove', src)"
        title="Confirm Image Deletion"
        description="Are you sure you want to permanently delete this image from the product's media gallery? This action cannot be undone."
        confirm-text="Yes, Delete"
        cancel-text="Cancel"
        variant="danger"
      >
        <button
          type="button"
          :disabled="disabled"
          class="p-2 bg-white text-error rounded-full hover:bg-error-bg shadow-md transition-all scale-90 group-hover:scale-100 cursor-pointer disabled:opacity-50"
          title="Permanently remove image file asset"
        >
          <Trash2 :size="18" />
        </button>
      </ConfirmationDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";

import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";

defineProps<{
  src: string;
  index: number;
  disabled: boolean;
}>();

const emit = defineEmits<{
  remove: [url: string];
}>();
</script>
