<template>
  <ProfileSkeleton v-if="isLoading" />

  <div
    v-else-if="profile"
    class="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm font-sans flex-1"
  >
    <ProfileHeader
      :user="profile"
      :is-editing="isEditing"
      @edit="isEditing = true"
    />

    <ProfileForm
      v-if="isEditing"
      :user="profile"
      @cancel="isEditing = false"
    />
    <ProfileDisplay v-else :user="profile" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useGetMe } from "../hooks/useUser";
import ProfileHeader from "../components/profile/ProfileHeader.vue";
import ProfileDisplay from "../components/profile/ProfileDisplay.vue";
import ProfileForm from "../components/profile/ProfileForm.vue";
import ProfileSkeleton from "../components/profile/ProfileSkeleton.vue";

const { data: user, isLoading } = useGetMe();
const isEditing = ref(false);

const profile = computed(() => user.value?.data);
</script>

<style scoped></style>
