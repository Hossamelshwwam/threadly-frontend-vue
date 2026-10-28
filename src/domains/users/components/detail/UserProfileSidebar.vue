<template>
  <div class="flex flex-col gap-4">
    <!-- Profile summary card -->
    <div class="bg-white border border-zinc-200 rounded-lg p-6">
      <div class="flex flex-col items-center text-center">
        <div
          class="w-16 h-16 rounded-full bg-amber-100 text-amber-700 text-2xl font-bold flex items-center justify-center"
        >
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <p class="text-xl font-bold text-zinc-900 mt-3">{{ user.name }}</p>
        <p class="text-sm text-zinc-400 mt-0.5">{{ user.email }}</p>
      </div>

      <div class="border-t border-zinc-100 mt-5 pt-4">
        <div
          class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
        >
          <span
            class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            Phone
          </span>
          <span class="text-sm font-medium text-zinc-700">
            <span v-if="!user.phone" class="text-zinc-300">Not provided</span>
            <template v-else>{{ user.phone }}</template>
          </span>
        </div>

        <div
          class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
        >
          <span
            class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            Role
          </span>
          <span class="text-sm font-medium text-zinc-700">
            <RoleBadge :role="user.role" />
          </span>
        </div>

        <div
          class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
        >
          <span
            class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            Status
          </span>
          <span class="text-sm font-medium text-zinc-700">
            <StatusBadge :is-active="user.isActive" />
          </span>
        </div>

        <div
          class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
        >
          <span
            class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            Verified
          </span>
          <span class="text-sm font-medium text-zinc-700">
            <CircleCheck
              v-if="user.isVerified"
              :size="16"
              class="text-base text-success"
            />
            <CircleX v-else :size="16" class="text-base text-error" />
          </span>
        </div>

        <div
          class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
        >
          <span
            class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            Joined
          </span>
          <span class="text-sm font-medium text-zinc-700">
            {{ joinedAt }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions card -->
    <div class="bg-white border border-zinc-200 rounded-lg p-5">
      <p class="text-sm font-bold text-zinc-700 mb-3">Account Actions</p>
      <ConfirmationDialog
        v-if="user.isActive"
        variant="danger"
        title="Suspend Account"
        description="This will prevent the user from accessing their account."
        confirm-text="Suspend"
        require-checkbox
        checkbox-label="I confirm I want to suspend this user"
        :is-loading="isToggling"
        :on-confirm="() => emit('toggle-status', { id: user._id, isActive: false })"
      >
        <CustomButton
          variant="soft"
          theme="danger"
          size="md"
          full-width
          :left-icon="UserForbidIcon"
        >
          Suspend Account
        </CustomButton>
      </ConfirmationDialog>

      <ConfirmationDialog
        v-else
        variant="success"
        title="Reactivate Account"
        description="This will restore the user's access to their account."
        confirm-text="Reactivate"
        :is-loading="isToggling"
        :on-confirm="() => emit('toggle-status', { id: user._id, isActive: true })"
      >
        <CustomButton
          variant="soft"
          theme="success"
          size="md"
          full-width
          :left-icon="UserFollowIcon"
        >
          Reactivate Account
        </CustomButton>
      </ConfirmationDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { CircleCheck, CircleX, UserCheck, UserX } from "lucide-vue-next";

import type { UserProfile } from "../../types/user.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import RoleBadge from "../RoleBadge.vue";
import StatusBadge from "../StatusBadge.vue";

const props = defineProps<{
  user: UserProfile;
  isToggling: boolean;
}>();

const emit = defineEmits<{
  "toggle-status": [variables: { id: string; isActive: boolean }];
}>();

const UserForbidIcon = () => h(UserX, { size: 14 });
const UserFollowIcon = () => h(UserCheck, { size: 14 });

const joinedAt = computed(() =>
  new Date(props.user.createdAt).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
);
</script>
