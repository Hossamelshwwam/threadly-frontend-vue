<template>
  <div
    class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-zinc-100 pb-8"
  >
    <div class="flex items-center gap-6">
      <div
        class="relative group cursor-pointer"
        @click="fileInputRef?.click()"
      >
        <CustomAvatar
          :img="user.avatar"
          :fallback="avatarFallback"
          class="h-24 w-24"
          fallback-class="bg-zinc-400 border-zinc-200"
        />
        <div
          class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pencil :size="24" class="text-white text-2xl" />
        </div>
        <div
          v-if="isUploading"
          class="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <span
            class="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"
          ></span>
        </div>
        <input
          type="file"
          ref="fileInputRef"
          class="hidden"
          accept="image/*"
          @change="handleAvatarChange"
        />
      </div>

      <div>
        <h1 class="text-2xl font-black text-zinc-900 tracking-tight">
          {{ user.name }}
        </h1>
        <span
          class="inline-block px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider rounded-md mt-2"
        >
          {{ user.role }} Account
        </span>
      </div>
    </div>

    <CustomButton
      v-if="!isEditing"
      variant="outline"
      theme="neutral"
      :left-icon="Pencil"
      class="w-full md:w-auto font-bold rounded-xl"
      @click="emit('edit')"
    >
      Edit Profile
    </CustomButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { Pencil } from "lucide-vue-next";
import CustomAvatar from "@/shared/components/custom-avatar/CustomAvatar.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useUploadAvatar } from "../../hooks/useUser";
import type { UserProfile } from "../../types/user.types";

const props = defineProps<{
  user: UserProfile;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: "edit"): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const { mutateAsync: uploadAvatarAsync, isPending: isUploading } =
  useUploadAvatar();

const avatarFallback = computed(() => props.user.name.split(" ")[0]?.[0] ?? "U");

const handleAvatarChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    toast.error("Image must be smaller than 2MB");
    return;
  }

  toast.promise(uploadAvatarAsync(file), {
    loading: "Uploading new avatar...",
    success: "Avatar updated successfully!",
    error: "Failed to upload avatar",
  });
};
</script>

<style scoped></style>
