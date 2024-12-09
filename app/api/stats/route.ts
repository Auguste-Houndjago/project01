import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ajouter des statistiques
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { playerId, season, ...stats } = data;

    // Validation
    if (!playerId || !season) {
      return NextResponse.json(
        { error: "playerId et season sont requis." },
        { status: 400 }
      );
    }

    // Création des statistiques
    const newStat = await prisma.statistics.create({
      data: {
        playerId,
        season,
        ...stats,
      },
    });

    return NextResponse.json(newStat, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout des statistiques :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'ajout des statistiques." },
      { status: 500 }
    );
  }
}

// Récupérer toutes les statistiques
export async function GET(req: NextRequest) {
  try {
    const stats = await prisma.statistics.findMany({
      include: { player: true }, 
    });

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des statistiques." },
      { status: 500 }
    );
  }
}


