<template>
  <form
    class="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-8"
    @submit="onSubmit"
  >
    <div class="border-b border-zinc-100 pb-4">
      <h3 class="text-lg font-bold text-zinc-900">Edit Profile</h3>
      <p class="text-xs text-zinc-500 mt-1">
        Update your store information.
      </p>
    </div>

    <div class="space-y-4">
      <h3 class="text-sm font-bold text-zinc-900">Basic Information</h3>
      <CustomInput
        label="Store Name"
        type="text"
        name="storeName"
        placeholder="Your store name"
        v-model="storeName"
        v-bind="storeNameAttrs"
        :error="errors.storeName"
      />
      <CustomTextarea
        label="Store Description"
        name="description"
        placeholder="What makes your products unique?"
        v-model="description"
        v-bind="descriptionAttrs"
        :error="errors.description"
      />
    </div>

    <div class="space-y-4 pt-2">
      <h3 class="text-sm font-bold text-zinc-900">Payout Details</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Bank Name"
          type="text"
          name="bankName"
          placeholder="e.g. CIB, NBE"
          v-model="bankName"
          v-bind="bankNameAttrs"
          :error="errors.bankName"
        />
        <CustomInput
          label="Account Holder Name"
          type="text"
          name="accountName"
          placeholder="John Doe"
          v-model="accountName"
          v-bind="accountNameAttrs"
          :error="errors.accountName"
        />
        <div class="md:col-span-2">
          <CustomInput
            label="Account Number / IBAN"
            type="text"
            name="accountNumber"
            placeholder="EG1200..."
            v-model="accountNumber"
            v-bind="accountNumberAttrs"
            :error="errors.accountNumber"
          />
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div
      class="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100"
    >
      <CustomButton
        type="button"
        variant="outline"
        theme="neutral"
        :disabled="isPending"
        @click="emit('cancel')"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        :loading="isPending"
        :disabled="!meta.dirty || isPending"
      >
        Save Changes
      </CustomButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea.vue";

import { useUpdateStoreProfile } from "../../hooks/useUpdateStoreProfile";
import {
  useRegisterStoreSchema,
  type RegisterStoreSchemaType,
} from "../../schemas/useRegisterStoreSchema";
import type { SellerProfile } from "../../types/seller.types";

const props = defineProps<{
  store?: SellerProfile;
}>();

const emit = defineEmits<{
  cancel: [];
}>();

const { mutateAsync: updateProfile, isPending } = useUpdateStoreProfile();

const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(useRegisterStoreSchema),
});

const [storeName, storeNameAttrs] = defineField("storeName");
const [description, descriptionAttrs] = defineField("description");
const [bankName, bankNameAttrs] = defineField("bankName");
const [accountName, accountNameAttrs] = defineField("accountName");
const [accountNumber, accountNumberAttrs] = defineField("accountNumber");

watch(
  () => props.store,
  (store) => {
    if (!store) return;
    resetForm({
      values: {
        storeName: store.storeName || "",
        description: store.description || "",
        bankName: store.bankDetails?.bankName || "",
        accountName: store.bankDetails?.accountName || "",
        accountNumber: store.bankDetails?.accountNumber || "",
      },
    });
  },
  { immediate: true },
);

const onSubmit = handleSubmit((formData: RegisterStoreSchemaType) => {
  toast.promise(updateProfile(formData), {
    loading: "Saving changes...",
    success: () => {
      emit("cancel"); // Exit edit mode on success!
      return "Store profile updated successfully!";
    },
    error: "Failed to update profile. Please try again.",
  });
});
</script>
