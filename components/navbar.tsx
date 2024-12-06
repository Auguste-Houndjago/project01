"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MoonIcon, SunIcon, Users, Trophy, Calendar, Activity } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const routes = [
    {
      href: "/teams",
      label: "Équipes",
      icon: Trophy,
    },
    {
      href: "/players",
      label: "Joueurs",
      icon: Users,
    },
    {
      href: "/matches",
      label: "Matchs",
      icon: Calendar,
    },
    {
      href: "/statistics",
      label: "Statistiques",
      icon: Activity,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="font-bold">FCM</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {routes.map((route) => (
              <NavigationMenuItem key={route.href}>
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === route.href &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}