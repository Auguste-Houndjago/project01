"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TeamOverview({ className }: { className?: string }) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Team Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Formation visualization would go here */}
          <div className="h-[200px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Team Formation View</span>
          </div>
          
          {/* Squad Status */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Goalkeepers</p>
              <div className="text-2xl font-bold">3</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Defenders</p>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Midfielders</p>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Forwards</p>
              <div className="text-2xl font-bold">6</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}