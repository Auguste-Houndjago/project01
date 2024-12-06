import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("id");
  
    if (!adminId) {
      return NextResponse.json(
        { error: "L'ID de l'admin est requis." },
        { status: 400 }
      );
    }
  
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: adminId },
        include: { user: true },
      });
  
      if (!admin) {
        return NextResponse.json(
          { error: "Admin introuvable." },
          { status: 404 }
        );
      }
  
      return NextResponse.json(admin, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Impossible de récupérer l'admin." },
        { status: 500 }
      );
    }
  }
  

  export async function PATCH(req: NextRequest) {
    try {
      const body = await req.json();
      const { id, name, adminCode } = body;
  
      if (!id || (!name && !adminCode)) {
        return NextResponse.json(
          { error: "L'ID et au moins un champ à mettre à jour sont requis." },
          { status: 400 }
        );
      }
  
      const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: {
          name: name || undefined,
          adminCode: adminCode || undefined,
        },
      });
  
      return NextResponse.json(
        { message: "Admin mis à jour avec succès.", admin: updatedAdmin },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Impossible de mettre à jour l'admin." },
        { status: 500 }
      );
    }
  }

  

  export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("id");
  
    if (!adminId) {
      return NextResponse.json(
        { error: "L'ID de l'admin est requis." },
        { status: 400 }
      );
    }
  
    try {
      await prisma.admin.delete({
        where: { id: adminId },
      });
  
      return NextResponse.json(
        { message: "Admin supprimé avec succès." },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Impossible de supprimer l'admin." },
        { status: 500 }
      );
    }
  }
  