import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        players: true,
        manager: true,
      },
    })
    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des équipes" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const team = await prisma.team.create({
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
      { error: "Erreur lors de la création de l'équipe" },
      { status: 500 }
    )
  }
}