import type { LucideIcon } from "lucide-vue-next";
import {
  CreditCard,
  LayoutDashboard,
  ListChecks,
  Package,
  ShoppingBag,
  Store,
  User,
} from "lucide-vue-next";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: "pending_sellers" | "pending_payouts";
}

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: User,
  },
  {
    label: "Sellers",
    href: "/admin/sellers",
    icon: Store,
    badge: "pending_sellers",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: ListChecks,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Payouts",
    href: "/admin/payouts",
    icon: CreditCard,
    badge: "pending_payouts",
  },
];
