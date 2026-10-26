<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <!-- Basic Store Info -->
    <div class="space-y-4">
      <h3
        class="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-2"
      >
        Store Details
      </h3>

      <CustomInput
        type="text"
        placeholder="e.g. Vintage Threads"
        name="storeName"
        label="Store Name *"
        v-model="storeName"
        v-bind="storeNameAttrs"
        :error="errors.storeName"
      />

      <CustomTextarea
        placeholder="Tell customers what makes your products unique..."
        name="description"
        label="Store Description (Optional)"
        v-model="description"
        v-bind="descriptionAttrs"
        :error="errors.description"
      />
    </div>

    <!-- Financial Details -->
    <div class="space-y-4 mt-2">
      <div class="border-b border-zinc-200 pb-2">
        <h3 class="text-sm font-bold text-zinc-900">
          Bank Details for Payouts
        </h3>
        <p class="text-xs text-zinc-500">
          You can add this later from your store settings.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomInput
          type="text"
          placeholder="e.g. CIB, NBE"
          name="bankName"
          label="Bank Name"
          v-model="bankName"
          v-bind="bankNameAttrs"
          :error="errors.bankName"
        />

        <CustomInput
          type="text"
          placeholder="Account holder name"
          name="accountName"
          label="Account Name"
          v-model="accountName"
          v-bind="accountNameAttrs"
          :error="errors.accountName"
        />

        <div class="sm:col-span-2">
          <CustomInput
            type="text"
            placeholder="EG120000000000000000000000"
            name="accountNumber"
            label="IBAN / Account Number"
            v-model="accountNumber"
            v-bind="accountNumberAttrs"
            :error="errors.accountNumber"
          />
        </div>
      </div>
    </div>

    <!-- CTA Button -->
    <CustomButton
      type="submit"
      class="mt-4"
      :right-icon="SubmitArrow"
      variant="solid"
      theme="primary"
      :loading="isPending"
      fullWidth
    >
      Open My Store
    </CustomButton>
  </form>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { ArrowRight } from "lucide-vue-next";
import type { AxiosError } from "axios";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea.vue";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import {
  useRegisterStoreSchema,
  type RegisterStoreSchemaType,
} from "../../schemas/useRegisterStoreSchema";
import type {
  RegisterStorePayload,
  sellerStoreApi,
} from "../../api/seller-store.api";

type RegisterStoreResult = Awaited<
  ReturnType<typeof sellerStoreApi.registerStore>
>;

const { mutateAsync: registerStore, isPending } = useRegisterStore();

// React renders `<FaArrowRight size={10} />`; CustomButton renders the icon
// component as-is, so the size has to be baked into a small wrapper component.
const SubmitArrow = () => h(ArrowRight, { size: 10 });

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(useRegisterStoreSchema),
});

const [storeName, storeNameAttrs] = defineField("storeName");
const [description, descriptionAttrs] = defineField("description");
const [bankName, bankNameAttrs] = defineField("bankName");
const [accountName, accountNameAttrs] = defineField("accountName");
const [accountNumber, accountNumberAttrs] = defineField("accountNumber");

const onSubmit = handleSubmit((values: RegisterStoreSchemaType) => {
  // The schema keeps the bank fields flat; the API expects them nested.
  const payload: RegisterStorePayload = {
    storeName: values.storeName,
    description: values.description,
    bankDetails: {
      bankName: values.bankName,
      accountName: values.accountName,
      accountNumber: values.accountNumber,
    },
  };

  // The hook invalidates ["my-store-profile"] / ["me"] and pushes to /seller.
  toast.promise(registerStore(payload), {
    loading: "Creating your store...",
    success: (response: RegisterStoreResult) =>
      `Congratulations! ${response.data.storeName} is now live!`,
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message ||
      "Failed to create store. Please try again.",
  });
});
</script>
