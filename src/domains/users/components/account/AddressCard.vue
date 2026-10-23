<template>
  <div
    :class="
      cn(
        'border-2 rounded-2xl p-5 transition-all relative flex flex-col justify-between h-full bg-white',
        address.isDefault
          ? 'border-amber-400 shadow-sm'
          : 'border-zinc-200 hover:border-zinc-300',
        isPending && 'opacity-60 pointer-events-none',
      )
    "
  >
    <div
      v-if="address.isDefault"
      class="absolute -top-3 -right-3 bg-amber-400 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1"
    >
      <Star :size="12" fill="currentColor" /> Default
    </div>

    <div>
      <div class="flex items-center gap-2 mb-3">
        <MapPin
          :size="18"
          :class="address.isDefault ? 'text-amber-500' : 'text-zinc-400'"
        />
        <h4 class="font-bold text-zinc-900">{{ address.label }}</h4>
      </div>

      <div class="text-sm text-zinc-600 space-y-1 leading-relaxed">
        <p>{{ address.street }}</p>
        <p>{{ address.city }}, {{ address.state }} {{ address.postalCode }}</p>
        <p>{{ address.country }}</p>
        <p class="pt-2 font-medium text-zinc-500">
          Phone: {{ address.phonenumber }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-5 mt-4 border-t border-zinc-100">
      <button
        @click="emit('edit', address)"
        class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
      >
        <Pencil :size="14" /> Edit
      </button>

      <ConfirmationDialog
        variant="danger"
        title="Remove address?"
        description="This address will be permanently deleted from your saved addresses."
        confirm-text="Remove"
        :is-loading="isDeleting"
        :on-confirm="handleDelete"
      >
        <button
          class="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
        >
          <Trash2 :size="14" /> Remove
        </button>
      </ConfirmationDialog>

      <button
        v-if="!address.isDefault"
        @click="handleSetDefault"
        class="text-xs font-bold text-zinc-500 hover:text-zinc-900 ml-auto transition-colors"
      >
        Set as Default
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import { MapPin, Pencil, Star, Trash2 } from "lucide-vue-next";

import type { Address } from "@/domains/users/types/user.types";
import {
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/domains/users/hooks/useUser";
import { cn } from "@/shared/lib/utils";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";

const props = defineProps<{
  address: Address;
}>();

const emit = defineEmits<{
  (e: "edit", address: Address): void;
}>();

const { mutateAsync: deleteAddress, isPending: isDeleting } =
  useDeleteAddress();
const { mutateAsync: setDefault, isPending: isSettingDefault } =
  useSetDefaultAddress();

const handleDelete = async () => {
  toast.promise(deleteAddress(props.address._id), {
    loading: "Deleting address...",
    success: "Address removed.",
    error: "Failed to delete address.",
  });
};

const handleSetDefault = async () => {
  toast.promise(setDefault(props.address._id), {
    loading: "Setting default...",
    success: "Default address updated.",
    error: "Failed to update default address.",
  });
};

const isPending = computed(
  () => isDeleting.value || isSettingDefault.value,
);
</script>

<style scoped></style>
