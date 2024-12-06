import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const team = await prisma.team.findUnique({
      where: {
        id: params.id,
      },
      include: {
        players: true,
        manager: true,
        matches: true,
        trainings: true,
      },
    })

    if (!team) {
      return NextResponse.json(
        { error: "Équipe non trouvée" },
        { status: 404 }
      )
    }

    return NextResponse.json(team)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'équipe" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const team = await prisma.team.update({
      where: {
        id: params.id,
      },
      data: {
        name: json.name,
        country: json.country,
        league: json.league,
        stadiumName: json.stadiumName,
        founded: json.founded ? parseInt(json.founded) : null,
      },
    })
    return NextResponse.json(team)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'équipe" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.team.delete({
      where: {
        id: params.id,
      },
    })
    return NextResponse.json({ message: "Équipe supprimée avec succès" })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'équipe" },
      { status: 500 }
    )
  }
}