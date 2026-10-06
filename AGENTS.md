# AGENTS.md — threadly-vue

Learning-driven React (Next.js) → Vue 3 migration. Preserve styles exactly; translate syntax only.

## Commands

- `npm install` — install (Node `^22.18.0 || >=24.12.0`)
- `npm run dev` — Vite hot-reload dev server
- `npm run type-check` — `vue-tsc --build` (run before build)
- `npm run build` — type-check + `vite build` (do not run `vite build` alone for final verification)
- No lint, test runner, or CI configured. `src/test/` is empty.

## Stack / entrypoints

- Vue 3 (`vue: rc` + pinned `overrides` — do not bump Vue/compiler packages independently), Vite 8, `vue-router` 5 (`createWebHistory`), TanStack Vue Query 5, Reka UI, shadcn-vue `new-york`, Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss"` in `src/assets/main.css`), `vee-validate` + `zod`, `vue-sonner`, `axios` + `js-cookie`.
- Entrypoints: `src/main.ts` (registers `VueQueryPlugin` + `router`, mounts `App.vue`) → `src/App.vue` (`<RouterView/>`) → `src/router/index.ts` (single `/` route today; add routes there).
- Alias: `@/*` → `src/*` (`vite.config.ts` + `tsconfig.app.json`). Prefer `@/shared/...`, `@/domains/...`, `@/infrastructure/...`.
- Structure: `src/domains/storefront/` (feature: `api/ components/ hooks/ pages/ types/` — mostly empty scaffolding), `src/shared/components/` (`ui/` = generated shadcn/Raka primitives, do not hand-edit styling; `buyer/ custom-avatar/ custom-textarea/ custom-toaster/` = project wrappers), `src/infrastructure/` (`axios.ts`, `query-client.ts`).
- Env: `VITE_API_URL` (see `.env`, gitignored). API base = `${VITE_API_URL}/api/v1`, `withCredentials: true`.

## React → Vue translation (apply on every migrated file)

1. Icons: `react-icons` → `lucide-vue-next`. `import { User } from "lucide-vue-next"`, use `<User :size="18" class="..." />`. Never add `react-icons` / `next/*`.
2. Classes: `className={...}` → `class="..."` or `:class="..."`. Keep Tailwind strings byte-identical. Compose via `cn()` from `@/shared/lib` (`clsx` + `tailwind-merge`). Never rename/convert to scoped CSS.
3. Routing: Next `<Link href="...">` → `<RouterLink to="...">` (import from `vue-router`). Dynamic: `:to="`/${role}`"`. Plain `<a href>` only for truly external URLs. Redirects in TS: `router.push()` / `window.location.href` (see `infrastructure/axios.ts` 401 handler).
4. Attributes / JSX → template:
   - `{value}` → `{{ value }}`; props → `:prop="expr"` or static `prop="lit"`; handlers `onClick={fn}` → `@click="fn"`; `autoFocus` → `autofocus`, `maxLength` → `maxlength`, `class` prop named `classname`/`TextareaClass` → `class`.
   - Conditionals `&&`/`?:` → `v-if` / `v-else-if` / `v-else`; lists `.map()` → `v-for="x in xs" :key="x.id"`; `useState` → `ref`/`reactive`/`computed`.
   - SFC order in this repo: `<template>` then `<script setup lang="ts">`. `defineProps<T>()` — do not destructure without `toRefs` (loses reactivity); access via `props.x` or keep the known-good shadcn pattern (`reactiveOmit` + `useForwardProps`, see `ui/dropdown-menu/DropdownMenuItem.vue`).
   - Reka `asChild` pattern: `<DropdownMenuItem asChild><RouterLink .../></DropdownMenuItem>` — keep `asChild`, do not nest extra `<a>`.

## Gotchas (verified in tree)

- `cn()` lives at `src/shared/lib/utils/index.ts`, imported as `@/shared/lib/utils` (matches `components.json` + every `ui/` file). `src/lib/utils.ts` is a leftover duplicate — do not import it, do not create a third copy.
- `AccountMenu.vue` is the reference half-migrated file: still contains `<Link href=...>`, `{user.data.name}` interpolation, and commented-out `useGetMe()/logout` stubs. Finish those patterns when migrating similar components.
- `CustomTextarea.vue` still has React props (`classname`, `TextareaClass`, `autoFocus`, `:max-length`, `v-bind="textareaAttrs"` + `v-model` conflict). Normalize to Vue `class`, `autofocus`, `:maxlength` on next touch.
- Auth flow lives in `src/infrastructure/axios.ts`: access token from `accessToken` cookie (`Authorization: Bearer`), silent refresh via `/auth/refresh` with `refreshToken` cookie, skips refresh for `/auth/login|register|refresh`, `/cart`, `/users/me`. Query defaults in `query-client.ts` (`staleTime 5m`, `retry: 1`, no refetch on focus) — keep.
