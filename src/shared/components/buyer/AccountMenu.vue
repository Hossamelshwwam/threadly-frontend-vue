<template>
  <div>
    <div
      v-if="isPending"
      class="w-11 h-11 rounded-xl bg-white/10 animate-pulse"
    ></div>
    <RouterLink
      v-else-if="!user"
      to="/login"
      aria-label="Sign in"
      class="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/75 hover:text-white transition-colors hidden sm:block"
    >
      <User :size="20" />
    </RouterLink>
    <DropdownMenu v-else>
      <DropdownMenuTrigger asChild>
        <button aria-label="User account menu">
          <CustomAvatar :img="user.data.avatar ?? ''" :fallback="initials" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        class="w-56 mt-2 bg-white rounded-xl shadow-xl border border-zinc-100 p-1.5 z-70"
        align="end"
      >
        <DropdownMenuLabel class="px-3 py-2">
          <p class="text-sm font-black text-zinc-950 truncate">
            {{ user.data.name }}
          </p>
          <p class="text-xs font-medium text-zinc-500 truncate mt-0.5">
            {{ user.data.email }}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator class="bg-zinc-100 my-1" />

        <DropdownMenuItem
          asChild
          class="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <RouterLink
            to="/account"
            class="flex items-center gap-2 text-zinc-700 font-bold text-sm"
          >
            <User class="text-zinc-400" :size="18" />
            My Profile
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          class="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <RouterLink
            to="/account/orders"
            class="flex items-center gap-2 text-zinc-700 font-bold text-sm"
          >
            <FileText class="text-zinc-400" :size="18" />
            Order History
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          class="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <RouterLink
            to="/account/security"
            class="flex items-center gap-2 text-zinc-700 font-bold text-sm"
          >
            <Settings class="text-zinc-400" :size="18" />
            Account Security
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          v-if="user.data.role !== 'buyer'"
          class="focus:bg-zinc-50 rounded-lg cursor-pointer py-2.5 px-3"
        >
          <RouterLink
            :to="`/${user.data.role}`"
            class="flex items-center gap-2 text-zinc-700 font-bold text-sm capitalize"
          >
            <LayoutDashboard class="text-zinc-400" :size="18" />
            {{ user.data.role }} Dashboard
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator class="bg-zinc-100 my-1" />

        <DropdownMenuItem
          class="focus:bg-red-50 text-red-600 focus:text-red-700 rounded-lg cursor-pointer py-2.5 px-3 font-bold text-sm flex items-center gap-2"
          @click="logout"
        >
          <LogOut :size="18" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-vue-next";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "../ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuLabel from "../ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "../ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuItem from "../ui/dropdown-menu/DropdownMenuItem.vue";
import CustomAvatar from "../custom-avatar/CustomAvatar.vue";
import { useGetMe } from "@/domains/users/hooks/useUser.ts";
import useLogout from "../hooks/useLogout.ts";

interface AccountUser {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const { data: user, isPending } = useGetMe();
const { logout } = useLogout();

const initials = computed(() =>
  user.value?.data.name
    ? user.value.data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U",
);
</script>

<style scoped></style>
