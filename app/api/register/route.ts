import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, mot de passe et rôle sont requis." },
        { status: 400 }
      );
    }

    if (!["ADMIN", "MANAGER"].includes(role)) {
      return NextResponse.json(
        { error: "Le rôle doit être ADMIN ou MANAGER." },
        { status: 400 }
      );
    }


    // Create user in Supabase Auth
    const { data: supabaseUser, error: supabaseError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (supabaseError) {
      console.error("Erreur lors de la création de l'utilisateur Supabase:", supabaseError);
      return NextResponse.json(
        { error: "Erreur lors de la création de l'utilisateur dans Supabase." },
        { status: 500 }
      );
    }

    // Create user in Prisma
    const newUser = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        role,
      },
    });


    return NextResponse.json(
      { message: "Utilisateur créé avec succès.", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de l'utilisateur." },
      { status: 500 }
    );
  }
}