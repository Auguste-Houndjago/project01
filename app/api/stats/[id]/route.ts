import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
      const statId = req.nextUrl.pathname.split("/").pop(); // Récupérer statId depuis l'URL
      const data = await req.json();
  
      if (!statId) {
        return NextResponse.json(
          { error: "ID de la statistique requis." },
          { status: 400 }
        );
      }
  
      const updatedStat = await prisma.statistics.update({
        where: { id: statId },
        data,
      });
  
      return NextResponse.json(updatedStat, { status: 200 });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des statistiques :", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de la mise à jour des statistiques." },
        { status: 500 }
      );
    }
  }
  
  // Supprimer une statistique
  export async function DELETE(req: NextRequest) {
    try {
      const statId = req.nextUrl.pathname.split("/").pop(); // Récupérer statId depuis l'URL
  
      if (!statId) {
        return NextResponse.json(
          { error: "ID de la statistique requis." },
          { status: 400 }
        );
      }
  
      await prisma.statistics.delete({
        where: { id: statId },
      });
  
      return NextResponse.json(
        { message: "Statistique supprimée avec succès." },
        { status: 200 }
      );
    } catch (error) {
      console.error("Erreur lors de la suppression des statistiques :", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de la suppression des statistiques." },
        { status: 500 }
      );
    }
  }
  