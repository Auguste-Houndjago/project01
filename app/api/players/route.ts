import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      position,
      jerseyNumber,
      height,
      weight,
      profileImage,
      teamId,
      userEmail, 
    } = data;

    // Vérifier que l'email de l'utilisateur est fourni pour récupérer le manager
    if (!userEmail) {
      return NextResponse.json(
        { error: "L'email de l'utilisateur est requis." },
        { status: 400 }
      );
    }


    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        manager: true, 
      },
    });


    if (!user || !user.manager) {
      return NextResponse.json(
        { error: "Aucun manager associé à cet utilisateur." },
        { status: 404 }
      );
    }

    // Récupérer le managerId du manager lié à cet utilisateur
    const managerId = user.manager.id;

    // Créer le joueur avec les données du formulaire
    const player = await prisma.player.create({
      data: {
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        nationality,
        position,
        jerseyNumber,
        height,
        weight,
        profileImage,
        managerId, 
        teamId,
      },
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du joueur :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du joueur." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        team: true,
      },
    });
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des joueurs" },
      { status: 500 }
    );
  }
}
