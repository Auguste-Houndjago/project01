'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import Link from "next/link";

// Mise à jour des types pour correspondre au schéma Prisma
export interface PlayerCardProps {
  player: {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    jerseyNumber: number | null;
    profileImage: string | null;
    nationality: string;
  };
}

export function PlayerCard({ player }: PlayerCardProps) {
  const positionColors = {
    GK: "bg-red-500",
    DF: "bg-blue-500",
    MF: "bg-green-500",
    FW: "bg-yellow-500",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link href={`/players/${player.id}`} className="hover:scale-105 transition-all">
        <Avatar className="h-16 w-16">
          {/* Gestion de l'image par défaut si profileImage est null */}
          <AvatarImage
            src={player.profileImage || ""}
            alt={`${player.firstName} ${player.lastName}`}
          />
          <AvatarFallback>
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        </Link>
        <div>
          <h3 className="font-semibold text-lg">
            {player.firstName} {player.lastName}
          </h3>
          <div className="flex items-center gap-2">
            {/* Afficher le numéro de maillot uniquement s'il existe */}
            {player.jerseyNumber !== null && (
              <Badge variant="outline">#{player.jerseyNumber}</Badge>
            )}
            {/* Gestion des couleurs de position */}
            <Badge
              className={
                positionColors[player.position as keyof typeof positionColors]
              }
            >
              {player.position}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Nationalité: {player.nationality}
        </p>
      </CardContent>
    </Card>
  );
}
