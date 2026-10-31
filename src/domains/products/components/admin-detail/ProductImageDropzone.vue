<template>
  <!-- Interactive Drag & Drop Active Dropzone Container Layer -->
  <div
    @click="fileInput?.click()"
    @dragover.prevent="isDropping = true"
    @dragleave="isDropping = false"
    @drop.prevent="handleDrop"
    :class="`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
      isDropping
        ? 'border-amber-400 bg-amber-50/30'
        : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300'
    }`"
  >
    <input
      ref="fileInput"
      type="file"
      @change="handleFileChange"
      accept="image/*"
      multiple
      class="hidden"
      :disabled="disabled"
    />

    <div v-if="isUploading" class="text-center space-y-1.5 py-2">
      <LoaderCircle :size="28" class="text-amber-500 animate-spin mx-auto" />
      <p class="text-xs font-semibold text-zinc-500">
        Uploading new visual resources...
      </p>
    </div>
    <div v-else class="text-center space-y-1 text-zinc-500">
      <CloudUpload :size="32" class="text-amber-400 mx-auto mb-1" />
      <p class="text-sm font-semibold text-zinc-800">
        Click to browse or drop asset files here
      </p>
      <p class="text-[11px] text-on-surface-muted">
        Supports PNG, JPEG, or WEBP layouts. Remaining space: {{ remaining }}
        files.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CloudUpload, LoaderCircle } from "lucide-vue-next";

defineProps<{
  disabled: boolean;
  isUploading: boolean;
  remaining: number;
}>();

const emit = defineEmits<{
  select: [files: FileList | null];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDropping = ref(false);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("select", target.files);
};

const handleDrop = (event: DragEvent) => {
  isDropping.value = false;
  emit("select", event.dataTransfer?.files ?? null);
};
</script>
