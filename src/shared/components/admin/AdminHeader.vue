<template>
  <header
    class="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 font-sans"
  >
    <div class="flex items-center gap-3 sm:gap-4">
      <Sheet v-model:open="isMobileMenuOpen">
        <SheetTrigger asChild>
          <button
            class="lg:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
          >
            <Menu :size="24" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          class="w-[280px] p-0 flex flex-col font-sans z-[100]"
        >
          <SheetHeader
            class="h-16 px-6 border-b border-zinc-200 flex flex-row items-center justify-start m-0 space-y-0"
          >
            <SheetTitle class="flex items-center gap-2.5 m-0 mt-0">
              <div
                class="w-7 h-7 rounded-md bg-main flex items-center justify-center"
              >
                <AtSign class="text-white text-base" />
              </div>
              <div class="flex flex-col leading-none text-left">
                <span class="text-sm font-black tracking-tight text-zinc-950">
                  Threadly
                </span>
                <span
                  class="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mt-0.5"
                >
                  Admin
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <div
              class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3"
            >
              Management
            </div>
            <RouterLink
              v-for="item in adminNavItems"
              :to="item.href"
              :key="item.href"
              @click="isMobileMenuOpen = false"
              :class="[
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors outline-none',
                isActive(item.href)
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
              ]"
            >
              <item.icon
                :class="[
                  'text-[18px]',
                  isActive(item.href) ? 'text-amber-500' : 'text-zinc-400',
                ]"
              />
              {{ item.label }}
            </RouterLink>
          </nav>

          <div class="px-3 py-4 border-t border-zinc-100">
            <button
              @click="logout"
              class="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 w-full group cursor-pointer"
            >
              <LogOut
                class="text-base text-zinc-400 group-hover:text-red-500 transition-colors"
              />
              Sign out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <div>
        <h1 class="text-base sm:text-lg font-bold text-zinc-900 leading-none">
          {{ pageTitle }}
        </h1>
        <p class="hidden sm:block text-xs font-normal text-zinc-400 mt-1">
          Threadly Admin Panel
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 sm:gap-3">
      <AccountMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import useLogout from "../hooks/useLogout";
import { adminNavItems } from "@/shared/lib/admin-nav-config";
import { AtSign, LogOut, Menu } from "lucide-vue-next";
import Sheet from "../ui/sheet/Sheet.vue";
import SheetTrigger from "../ui/sheet/SheetTrigger.vue";
import SheetContent from "../ui/sheet/SheetContent.vue";
import SheetHeader from "../ui/sheet/SheetHeader.vue";
import SheetTitle from "../ui/sheet/SheetTitle.vue";
import AccountMenu from "../buyer/AccountMenu.vue";

const route = useRoute();
const isMobileMenuOpen = ref(false);

const currentPage = computed(() =>
  adminNavItems.find((item) => {
    if (item.href === "/admin") return route.path === "/admin";
    return route.path.startsWith(item.href);
  }),
);

const pageTitle = computed(() => currentPage.value?.label ?? "Admin");
const { logout } = useLogout();

const isActive = (href: string) =>
  href === "/admin" ? route.path === "/admin" : route.path.startsWith(href);
</script>

<style scoped></style>
