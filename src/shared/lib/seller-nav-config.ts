import type { LucideIcon } from "lucide-vue-next";
import {
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Store,
  Wallet,
} from "lucide-vue-next";

export interface SellerNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sellerNavItems: SellerNavItem[] = [
  {
    label: "Dashboard",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    label: "My Products",
    href: "/seller/products",
    icon: ShoppingBag,
  },
  {
    label: "Fulfillment & Orders",
    href: "/seller/orders",
    icon: ClipboardList,
  },
  {
    label: "Earnings & Payouts",
    href: "/seller/payouts",
    icon: Wallet,
  },
  {
    label: "My Reviews",
    href: "/seller/reviews",
    icon: MessageSquare,
  },
  {
    label: "Store Profile",
    href: "/seller/profile",
    icon: Store,
  },
];
