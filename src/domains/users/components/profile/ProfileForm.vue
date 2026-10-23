<template>
  <form class="space-y-6 animate-fadeIn" @submit="onUpdateSubmit">
    <CustomInput
      name="name"
      type="text"
      label="Full Name"
      placeholder="e.g. John Doe"
      v-model="name"
      v-bind="nameAttrs"
      :error="errors.name"
    />

    <CustomInput
      name="phone"
      type="text"
      label="Phone Number"
      placeholder="+201..."
      v-model="phoneValue"
      v-bind="phoneAttrs"
      :error="errors.phone"
    />

    <div>
      <label class="block text-sm font-bold text-zinc-700 mb-1.5">
        Email Address
      </label>
      <div
        class="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500 text-sm font-medium cursor-not-allowed flex items-center gap-2"
      >
        <Mail :size="16" /> {{ user.email }}
      </div>
      <p class="text-xs text-zinc-400 mt-1.5">
        Email address cannot be changed directly.
      </p>
    </div>

    <div class="flex items-center gap-3 pt-4">
      <CustomButton
        type="button"
        variant="outline"
        theme="neutral"
        class="flex-1 rounded-xl font-bold"
        :left-icon="X"
        @click="cancel"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        :disabled="isUpdating"
        class="flex-1 rounded-xl font-bold"
        :left-icon="Check"
      >
        {{ isUpdating ? "Saving..." : "Save Changes" }}
      </CustomButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Check, Mail, X } from "lucide-vue-next";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { updateProfileSchema } from "../../schemas/profile.schema";
import { useUpdateProfile } from "../../hooks/useUser";
import type { UserProfile } from "../../types/user.types";

const props = defineProps<{
  user: UserProfile;
}>();

const emit = defineEmits<{
  (e: "cancel"): void;
}>();

const { mutateAsync: updateProfileAsync, isPending: isUpdating } =
  useUpdateProfile();

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  initialValues: {
    name: props.user.name,
    phone: props.user.phone || "",
  },
});

const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");

const phoneValue = computed({
  get: () => phone.value ?? "",
  set: (value: string) => {
    phone.value = value;
  },
});

const cancel = () => {
  resetForm();
  emit("cancel");
};

const onUpdateSubmit = handleSubmit((data) => {
  toast.promise(updateProfileAsync(data), {
    loading: "Updating profile...",
    success: () => {
      emit("cancel"); // Close form on success
      return "Profile updated successfully!";
    },
    error: (err: AxiosError<{ message: string }>) =>
      err.response?.data.message || "Failed to update profile",
  });
});
</script>

<style scoped></style>
