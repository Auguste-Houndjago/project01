"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { LineupBuilder } from "@/components/lineup/lineup-builder";

export default function LineupPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Team Lineup</h1>
        <LineupBuilder />
      </div>
    </DashboardShell>
  );
}