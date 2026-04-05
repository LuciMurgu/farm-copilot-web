/**
 * Nav item configuration for sidebar and mobile nav.
 * Labels per DOMAIN_GLOSSARY.md — exact terms enforced.
 * Pillar badges: PI (Procurement), PII (Agro/Sensors), PIII (Cooperative).
 */
import {
  LayoutDashboard,
  Receipt,
  Package,
  Bell,
  Download,
  Map,
  Landmark,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  /** Romanian label per DOMAIN_GLOSSARY.md */
  label: string;
  icon: LucideIcon;
  pillar: "I" | "II" | "III" | null;
}

export interface NavGroup {
  pillar: "I" | "II" | "III" | null;
  label: string | null;
  items: NavItem[];
}

/** All nav items, grouped by pillar */
export const NAV_GROUPS: NavGroup[] = [
  {
    pillar: "I",
    label: "Pillar I — Achiziții",
    items: [
      { href: "/dashboard", label: "Panou principal", icon: LayoutDashboard, pillar: "I" },
      { href: "/invoices", label: "Facturi", icon: Receipt, pillar: "I" },
      { href: "/stock", label: "Stoc", icon: Package, pillar: "I" },
      { href: "/alerts", label: "Alerte", icon: Bell, pillar: "I" },
      { href: "/saga-export", label: "Export SAGA", icon: Download, pillar: "I" },
    ],
  },
  {
    pillar: "II",
    label: "Pillar II — Agro",
    items: [
      { href: "/parcels", label: "Parcele", icon: Map, pillar: "II" },
      { href: "/arenda", label: "Arendă", icon: Landmark, pillar: "II" },
    ],
  },
  {
    pillar: "III",
    label: "Pillar III — Cooperativă",
    items: [
      { href: "/cooperative", label: "Cooperativă", icon: Users, pillar: "III" },
    ],
  },
  {
    pillar: null,
    label: null,
    items: [
      { href: "/settings", label: "Setări", icon: Settings, pillar: null },
    ],
  },
];

/** Flat list of all nav items for lookups */
export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

/** The 5 items shown in the mobile bottom nav */
export const MOBILE_BOTTOM_NAV: NavItem[] = [
  ALL_NAV_ITEMS.find((i) => i.href === "/dashboard")!,
  ALL_NAV_ITEMS.find((i) => i.href === "/invoices")!,
  ALL_NAV_ITEMS.find((i) => i.href === "/alerts")!,
  ALL_NAV_ITEMS.find((i) => i.href === "/cooperative")!,
];
