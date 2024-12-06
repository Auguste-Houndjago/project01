import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      licenseLevel,
      profileImage,
    
    } = body;

    if (!email || !firstName || !lastName || !dateOfBirth || !nationality) {
      return NextResponse.json(
        { error: "Les champs obligatoires sont requis." },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe et est un MANAGER
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== "MANAGER") {
      return NextResponse.json(
        { error: "L'utilisateur doit être un MANAGER existant." },
        { status: 404 }
      );
    }

    // Vérifier si cet utilisateur est déjà un manager
    const existingManager = await prisma.manager.findUnique({
      where: { userId: user.id },
    });

    if (existingManager) {
      return NextResponse.json(
        { error: "Cet utilisateur est déjà un manager." },
        { status: 409 }
      );
    }

    // Créer une entrée dans la table Manager
    const newManager = await prisma.manager.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        nationality,
        licenseLevel,
        profileImage,
  
      },
    });

    return NextResponse.json(
      { message: "Manager enregistré avec succès.", manager: newManager },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement du manager." },
      { status: 500 }
    );
  }
}



export async function GET() {
    try {
      const managers = await prisma.manager.findMany({
        include: {
          user: true, // Inclure les informations utilisateur liées
          team: true, // Inclure l'équipe liée
          players: true, // Inclure les joueurs gérés
          images: true, // Inclure les images associées
        },
      });
  
      return NextResponse.json(managers, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Impossible de récupérer les managers." },
        { status: 500 }
      );
    }
  }
  

  export async function PATCH(req: NextRequest) {
    try {
      const body = await req.json();
      const {
        id,
        firstName,
        lastName,
        dateOfBirth,
        nationality,
        licenseLevel,
        profileImage,
        teamId,
      } = body;
  
      if (!id) {
        return NextResponse.json(
          { error: "L'ID du manager est requis." },
          { status: 400 }
        );
      }
  
      const updatedManager = await prisma.manager.update({
        where: { id },
        data: {
          firstName,
          lastName,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
          nationality,
          licenseLevel,
          profileImage,
          teamId,
        },
      });
  
      return NextResponse.json(
        { message: "Manager mis à jour avec succès.", manager: updatedManager },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Impossible de mettre à jour le manager." },
        { status: 500 }
      );
    }
  }

  
  export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const managerId = searchParams.get("id");
  
    if (!managerId) {
      return NextResponse.json(
        { error: "L'ID du manager est requis." },
        { status: 400 }
      );
    }
  
    try {
      await prisma.manager.delete({
        where: { id: managerId },
      });
  
      return NextResponse.json(
        { message: "Manager supprimé avec succès." },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Impossible de supprimer le manager." },
        { status: 500 }
      );
    }
  }
  