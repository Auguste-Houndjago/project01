import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { email, adminCode, name } = body;
  
      if (!email || !adminCode || !name) {
        return NextResponse.json(
          { error: "L'email, le code admin et le nom sont requis." },
          { status: 400 }
        );
      }
  
      // Vérifier si l'utilisateur existe
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user || user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "L'utilisateur doit être un ADMIN existant." },
          { status: 404 }
        );
      }
  
      // Vérifier si cet utilisateur est déjà un admin enregistré
      const existingAdmin = await prisma.admin.findUnique({
        where: { userId: user.id },
      });
  
      if (existingAdmin) {
        return NextResponse.json(
          { error: "Cet utilisateur est déjà un admin." },
          { status: 409 }
        );
      }
  
      // Créer une entrée dans la table Admin
      const newAdmin = await prisma.admin.create({
        data: {
          userId: user.id,
          adminCode,
          name,
        },
      });
  
      return NextResponse.json(
        { message: "Admin enregistré avec succès.", admin: newAdmin },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'enregistrement de l'admin." },
        { status: 500 }
      );
    }
  }
  