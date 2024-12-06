import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const manager = await prisma.manager.findUnique({
      where: {
        id: params.id,
      },
      include: {
        team: true,
      },
    })

    if (!manager) {
      return NextResponse.json(
        { error: "Manager non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(manager)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du manager" },
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
    const manager = await prisma.manager.update({
      where: {
        id: params.id,
      },
      data: {
        firstName: json.firstName,
        lastName: json.lastName,
        dateOfBirth: new Date(json.dateOfBirth),
        nationality: json.nationality,
        licenseLevel: json.licenseLevel,
      },
    })
    return NextResponse.json(manager)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du manager" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.manager.delete({
      where: {
        id: params.id,
      },
    })
    return NextResponse.json({ message: "Manager supprimé avec succès" })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du manager" },
      { status: 500 }
    )
  }
}