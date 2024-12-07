"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Position } from "@prisma/client";

interface Player {
  id: string;
  name: string;
  position: Position;
  number: number;
}

interface FootballFieldProps {
  formation: string;
  players: Player[];
  positions: { [key: string]: { x: number; y: number } };
  onPlayerDrop: (playerId: string, position: { x: number; y: number }) => void;
}

export function FootballField({ formation, players, positions, onPlayerDrop }: FootballFieldProps) {
  const defaultPositions = useMemo(() => {
    const [defenders, midfielders, forwards] = formation.split("-").map(Number);
    const positions: { [key: string]: { x: number; y: number }[] } = {
      GK: [{ x: 50, y: 90 }],
      DF: Array.from({ length: defenders }, (_, i) => ({
        x: 20 + (60 / (defenders + 1)) * (i + 1),
        y: 70
      })),
      MF: Array.from({ length: midfielders }, (_, i) => ({
        x: 20 + (60 / (midfielders + 1)) * (i + 1),
        y: 45
      })),
      FW: Array.from({ length: forwards }, (_, i) => ({
        x: 20 + (60 / (forwards + 1)) * (i + 1),
        y: 20
      }))
    };
    return positions;
  }, [formation]);

  const handleDragStart = (e: React.DragEvent, playerId: string) => {
    e.dataTransfer.setData("playerId", playerId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData("playerId");
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPlayerDrop(playerId, { x, y });
  };

  return (
    <div 
      className="relative w-full h-[650px] bg-green-600 rounded-lg overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Field markings */}
      <div className="absolute inset-0 border-2 border-white/50" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/50" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/50" />
      <div className="absolute left-1/2 top-1/2 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500/50" />

      {/* Players */}
      {players.map((player) => {
        const position = positions[player.id] || defaultPositions[player.position]?.[0];
        if (!position) return null;

        return (
          <div
            key={player.id}
            draggable
            onDragStart={(e) => handleDragStart(e, player.id)}
            className="absolute cursor-pointer"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <Badge 
              className="w-10 h-10 rounded-full flex items-center justify-center  hover:bg-primary cursor-pointer"
              variant="secondary"
            >
              {player.number}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}