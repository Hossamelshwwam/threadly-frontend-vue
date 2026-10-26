<template>
  <div class="flex flex-col gap-3">
    <h4 class="text-sm font-bold text-zinc-900">Store Logo</h4>

    <div class="flex items-center gap-6">
      <!-- Avatar Circle -->
      <div
        :class="`relative w-24 h-24 rounded-full border-2 border-dashed border-zinc-200 bg-zinc-50 flex shrink-0 items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors group ${isPending ? 'opacity-50 pointer-events-none' : ''}`"
        @click="openFilePicker"
      >
        <LoaderCircle
          v-if="isPending"
          :size="20"
          class="text-amber-500 animate-spin text-xl"
        />
        <template v-else-if="displayImage">
          <img
            :src="displayImage"
            alt="Store Logo"
            width="52"
            height="52"
            class="object-contain h-auto w-auto"
          />
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <ImagePlus :size="20" class="text-white text-xl" />
          </div>
        </template>
        <div
          v-else
          class="flex flex-col items-center text-zinc-400 group-hover:text-amber-500"
        >
          <ImagePlus :size="24" class="text-2xl mb-1" />
        </div>
      </div>

      <!-- Info Text -->
      <div class="text-xs text-zinc-500 space-y-1">
        <p>
          We recommend an image of at least
          <span class="font-semibold text-zinc-700">300x300px</span>.
        </p>
        <p>
          Accepted formats:
          <span class="font-semibold text-zinc-700">JPG, PNG</span>.
        </p>
        <button
          type="button"
          class="text-main font-bold mt-2 hover:underline disabled:opacity-50"
          :disabled="isPending"
          @click="openFilePicker"
        >
          Choose new logo
        </button>
      </div>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/png, image/jpeg, image/jpg, image/webp"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { ImagePlus, LoaderCircle } from "lucide-vue-next";
import { useUploadBranding } from "../../hooks/useUploadBranding";

const props = defineProps<{
  currentLogo?: string;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const { mutateAsync: uploadBranding, isPending } = useUploadBranding();

const openFilePicker = () => {
  if (isPending.value) return;
  fileInputRef.value?.click();
};

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  // Validate size (e.g., max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    toast.error("Logo must be less than 2MB");
    return;
  }

  // Upload to server using Sonner toast
  toast.promise(uploadBranding({ type: "logo", file }), {
    loading: "Uploading logo...",
    success: "Store logo updated successfully!",
    error: "Failed to upload logo. Please try again.",
  });
};

const displayImage = computed(() => props.currentLogo);
</script>
