import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const player = await prisma.player.findUnique({
      where: {
        id: params.id,
      },
      include: {
        team: true,
        statistics: true,
      },
    })

    if (!player) {
      return NextResponse.json(
        { error: "Joueur non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(player)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du joueur" },
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
    const player = await prisma.player.update({
      where: {
        id: params.id,
      },
      data: {
        firstName: json.firstName,
        lastName: json.lastName,
        dateOfBirth: new Date(json.dateOfBirth),
        nationality: json.nationality,
        position: json.position,
        jerseyNumber: json.jerseyNumber ? parseInt(json.jerseyNumber) : null,
        height: json.height ? parseFloat(json.height) : null,
        weight: json.weight ? parseFloat(json.weight) : null,
      },
    })
    return NextResponse.json(player)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du joueur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.player.delete({
      where: {
        id: params.id,
      },
    })
    return NextResponse.json({ message: "Joueur supprimé avec succès" })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du joueur" },
      { status: 500 }
    )
  }
}