<template>
  <div
    class="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm animate-fadeIn mt-6"
  >
    <h3
      class="text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-4"
    >
      {{ isEditing ? "Edit Address" : "Add New Address" }}
    </h3>

    <form class="space-y-4" @submit="onSubmit">
      <CustomSelect
        name="country"
        label="Country/Region"
        :options="countryOptions"
        v-model="country"
        v-bind="countryAttrs"
        :error="errors.country"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="label"
          type="text"
          label="Address Label"
          placeholder="e.g. Home, Office"
          v-model="label"
          v-bind="labelAttrs"
          :error="errors.label"
        />
      </div>

      <CustomInput
        name="street"
        type="text"
        label="Address"
        placeholder="Street address, apartment, suite, etc."
        v-model="street"
        v-bind="streetAttrs"
        :error="errors.street"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomInput
          name="city"
          type="text"
          label="City"
          placeholder="City"
          half
          v-model="city"
          v-bind="cityAttrs"
          :error="errors.city"
        />
        <CustomInput
          name="state"
          type="text"
          label="Governorate"
          placeholder="State"
          half
          v-model="state"
          v-bind="stateAttrs"
          :error="errors.state"
        />
        <CustomInput
          name="postalCode"
          type="text"
          label="ZIP code"
          placeholder="Postal Code"
          half
          v-model="postalCode"
          v-bind="postalCodeAttrs"
          :error="errors.postalCode"
        />
      </div>

      <CustomInput
        name="phonenumber"
        type="text"
        label="phonenumber"
        placeholder="Phone number"
        v-model="phonenumber"
        v-bind="phonenumberAttrs"
        :error="errors.phonenumber"
      />

      <label
        v-if="!initialData?.isDefault"
        class="flex items-center gap-2 text-sm font-semibold text-zinc-700 mt-2 cursor-pointer w-fit"
      >
        <input
          type="checkbox"
          v-model="isDefault"
          v-bind="isDefaultAttrs"
          class="w-4 h-4 rounded border-zinc-300 accent-amber-500"
        />
        Set as default shipping address
      </label>

      <div class="flex items-center justify-end gap-3 pt-4">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          :left-icon="X"
          @click="emit('close')"
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          :disabled="isPending"
          :left-icon="Check"
        >
          {{ isPending ? "Saving..." : "Save Address" }}
        </CustomButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Check, X } from "lucide-vue-next";

import { useAddAddress, useUpdateAddress } from "@/domains/users/hooks/useUser";
import { addAddressSchema } from "@/domains/users/schemas/address.schema";
import type { Address } from "@/domains/users/types/user.types";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  initialData?: Address | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { mutateAsync: addAddress, isPending: isAdding } = useAddAddress();
const { mutateAsync: updateAddress, isPending: isUpdating } =
  useUpdateAddress();

const isPending = computed(() => isAdding.value || isUpdating.value);
const isEditing = computed(() => !!props.initialData);

const countryOptions = [{ label: "Egypt", value: "Egypt" }];

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(addAddressSchema),
  initialValues: props.initialData
    ? {
        label: props.initialData.label,
        street: props.initialData.street,
        city: props.initialData.city,
        state: props.initialData.state,
        postalCode: props.initialData.postalCode,
        country: props.initialData.country,
        phonenumber: props.initialData.phonenumber || "",
        isDefault: props.initialData.isDefault,
      }
    : {
        isDefault: false,
        country: "Egypt",
      },
});

const [country, countryAttrs] = defineField("country");
const [label, labelAttrs] = defineField("label");
const [street, streetAttrs] = defineField("street");
const [city, cityAttrs] = defineField("city");
const [state, stateAttrs] = defineField("state");
const [postalCode, postalCodeAttrs] = defineField("postalCode");
const [phonenumber, phonenumberAttrs] = defineField("phonenumber");
const [isDefault, isDefaultAttrs] = defineField("isDefault");

const onSubmit = handleSubmit((data) => {
  const action =
    isEditing.value && props.initialData
      ? updateAddress({ id: props.initialData._id, payload: data })
      : addAddress(data);

  toast.promise(action, {
    loading: isEditing.value ? "Updating address..." : "Adding address...",
    success: () => {
      emit("close");
      return isEditing.value
        ? "Address updated successfully!"
        : "Address added successfully!";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Operation failed!",
  });
});
</script>

<style scoped></style>
