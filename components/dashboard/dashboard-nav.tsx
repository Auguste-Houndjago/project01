"use client";

import { cn } from "@/lib/utils";
import {
  Users,
  Trophy,
  Calendar,
  Activity,
  ClipboardList,
  Bell,
  Settings,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    label: "Players",
    icon: Users,
    href: "/players",
  },
  {
    label: "Matches",
    icon: Trophy,
    href: "/matches",
  },
  {
    label: "Training",
    icon: Calendar,
    href: "/training",
  },
  {
    label: "Statistics",
    icon: Activity,
    href: "/statistics",
  },
  {
    label: "Contracts",
    icon: ClipboardList,
    href: "/contracts",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-slate-50 w-[200px]">
      <div className="px-3 py-2 flex-1">
        <h2 className="mb-2 px-4 text-lg font-semibold">
          Club Manager
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 px-4 py-2 text-sm font-medium hover:text-slate-50 hover:bg-slate-800 rounded-lg transition-all",
                pathname === route.href
                  ? "text-slate-50 bg-slate-800"
                  : "text-slate-400"
              )}
            >
              <route.icon className="w-4 h-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}