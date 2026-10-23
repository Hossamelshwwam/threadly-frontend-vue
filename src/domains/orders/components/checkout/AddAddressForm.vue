<template>
  <form class="space-y-4 animate-fadeIn" @submit="onSubmit">
    <label
      class="flex items-center gap-2 text-sm font-semibold text-zinc-700 mt-2 cursor-pointer w-fit"
    >
      <input
        type="checkbox"
        v-model="isDefault"
        v-bind="isDefaultAttrs"
        class="w-4 h-4 rounded border-zinc-300 accent-amber-500"
      />
      Save this as default address
    </label>
    <CustomSelect
      name="country"
      label="Country/Region"
      :options="countryOptions"
      v-model="country"
      v-bind="countryAttrs"
      placeholder="choose a country"
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
      label="Phone Number"
      placeholder="Phone number"
      v-model="phonenumber"
      v-bind="phonenumberAttrs"
      :error="errors.phonenumber"
    />

    <!-- Form Action Buttons -->
    <div class="flex items-center gap-3 pt-4 border-t border-zinc-100">
      <CustomButton
        type="button"
        variant="outline"
        theme="neutral"
        class="flex-1"
        :left-icon="X"
        @click="showAddressForm = false"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        :disabled="isPending"
        class="flex-1"
        :left-icon="Check"
      >
        {{ isPending ? "Saving..." : "Save Address" }}
      </CustomButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Check, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { useAddAddress } from "@/domains/users/hooks/useUser";
import { addAddressSchema } from "@/domains/users/schemas/address.schema";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";

const showAddressForm = defineModel<boolean>("showAddressForm", {
  default: false,
});

const countryOptions = [{ label: "Egypt", value: "Egypt" }];

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(addAddressSchema),
  initialValues: {
    isDefault: false,
  },
});

const [isDefault, isDefaultAttrs] = defineField("isDefault");
const [country, countryAttrs] = defineField("country");
const [label, labelAttrs] = defineField("label");
const [street, streetAttrs] = defineField("street");
const [city, cityAttrs] = defineField("city");
const [state, stateAttrs] = defineField("state");
const [postalCode, postalCodeAttrs] = defineField("postalCode");
const [phonenumber, phonenumberAttrs] = defineField("phonenumber");

const { mutateAsync: addAddress, isPending } = useAddAddress();

const onSubmit = handleSubmit((data) => {
  toast.promise(addAddress(data), {
    loading: "Adding address...",
    success: () => {
      showAddressForm.value = false;
      return "Address added successfully!";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data.message || "Failed to add address!",
  });
});
</script>

<style scoped></style>
