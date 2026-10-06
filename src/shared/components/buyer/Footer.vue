<template>
  <footer class="w-full bg-zinc-50">
    <div class="container mx-auto px-8 py-16">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div class="md:col-span-2 flex flex-col gap-6">
          <span class="text-2xl font-black tracking-tight" :style="logoStyle">
            THREADLY
          </span>
          <p class="text-sm text-zinc-500 leading-relaxed max-w-xs">
            The curated marketplace for premium fashion and functional
            minimalism. Discover pieces that define your style.
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in SOCIALS"
              :key="social.label"
              href="#"
              :aria-label="social.label"
              class="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 transition-all duration-300 hover:scale-110 hover:text-white"
              @mouseenter="(e) => setSocialBg(e, social.hoverColor)"
              @mouseleave="(e) => setSocialBg(e, '')"
            >
              <component :is="social.Icon" :size="16" />
            </a>
          </div>
        </div>
        <div
          v-for="group in LINK_GROUPS"
          :key="group.title"
          class="flex flex-col gap-2.5"
        >
          <span
            class="text-xs font-bold tracking-[0.12em] uppercase mb-2"
            :style="{ color: group.color }"
          >
            {{ group.title }}
          </span>
          <template v-for="item in group.items" :key="item">
            <RouterLink
              v-if="group.href !== '#'"
              :to="group.href"
              class="text-sm text-zinc-500 transition-all duration-200"
              @mouseenter="(e) => setLinkColor(e, group.color)"
              @mouseleave="(e) => setLinkColor(e, '')"
            >
              {{ item }}
            </RouterLink>
            <a
              v-else
              href="#"
              class="text-sm text-zinc-500 transition-all duration-200"
              @mouseenter="(e) => setLinkColor(e, group.color)"
              @mouseleave="(e) => setLinkColor(e, '')"
            >
              {{ item }}
            </a>
          </template>
        </div>
      </div>
      <div
        class="mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-xs text-zinc-400">
          &copy; {{ currentYear }} Threadly. All rights reserved.
        </p>
        <div class="flex items-center gap-4 text-xs text-zinc-400">
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Made with precision
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Built for style
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { Instagram, Twitter, Youtube } from "lucide-vue-next";

interface Social {
  Icon: Component;
  label: string;
  hoverColor: string;
}

interface LinkGroup {
  title: string;
  items: string[];
  href: string;
  color: string;
}

const SOCIALS: Social[] = [
  {
    Icon: Instagram,
    label: "Instagram",
    hoverColor: "#e4405f",
  },
  {
    Icon: Twitter,
    label: "X (Twitter)",
    hoverColor: "#1da1f2",
  },
  {
    Icon: Youtube,
    label: "YouTube",
    hoverColor: "#ff0000",
  },
];

const LINK_GROUPS: LinkGroup[] = [
  {
    title: "Shop",
    items: ["New Arrivals", "Men", "Women", "Accessories", "Sale"],
    href: "/products",
    color: "#d99a4a",
  },
  {
    title: "Support",
    items: ["About Us", "Shipping", "Returns", "FAQ", "Contact"],
    href: "#",
    color: "#f59e0b",
  },
  {
    title: "Legal",
    items: ["Privacy", "Terms", "Cookies"],
    href: "#",
    color: "#f97316",
  },
];

const logoStyle: Record<string, string> = {
  background: "linear-gradient(135deg, #d99a4a, #f59e0b, #f97316)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const currentYear = new Date().getFullYear();

function setSocialBg(e: MouseEvent, color: string) {
  (e.currentTarget as HTMLElement).style.background = color;
}

function setLinkColor(e: MouseEvent, color: string) {
  (e.currentTarget as HTMLElement).style.color = color;
}
</script>

<style scoped></style>
