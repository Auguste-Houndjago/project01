"use client";

import { MenuIcon, PlusCircle, Settings } from "lucide-react";
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
        <SheetTrigger asChild className="flex justify-end">
          <Button variant="default" className=" z-50 fixed left-4 bottom-4">
            <PlusCircle className="h-6 w-6" /> 
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
         <h1> ici on mettra des element qui ne peuvent pas rester en md </h1>
         <div className="my-10 font-bold">
          <h2>le terrain n est pas encore assez esthetique </h2>
         </div>
        </SheetContent>
      </Sheet>

 
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}