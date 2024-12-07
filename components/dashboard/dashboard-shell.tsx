"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { DashboardNav } from "./dashboard-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "../ux/SideBar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">

      <div className="hidden md:flex">
      <Sidebar/>
    
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed left-4 top-4">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DashboardNav />
        </SheetContent>
      </Sheet>

 
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}