"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RecentMatches({ className }: { className?: string }) {
  const matches = [
    { opponent: "Barcelona", result: "2-1", isWin: true, date: "2024-03-15" },
    { opponent: "Bayern Munich", result: "0-2", isWin: false, date: "2024-03-10" },
    { opponent: "PSG", result: "3-1", isWin: true, date: "2024-03-05" },
  ];

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">vs {match.opponent}</p>
                <p className="text-sm text-muted-foreground">{match.date}</p>
              </div>
              <div
                className={cn(
                  "text-sm font-bold",
                  match.isWin ? "text-green-500" : "text-red-500"
                )}
              >
                {match.result}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}