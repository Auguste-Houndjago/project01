import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function POST(req: NextRequest) {
  try {

    const { email, password } = await req.json();

   
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe sont requis." },
        { status: 400 }
      );
    }

    const { data:session, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
  
if (error) {
    console.error("Erreur de connexion:", error);
    console.log("Erreur de connexion:", error);

      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      );
}


return NextResponse.json(
      { message: "Connexion réussie.", session },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la connexion." },
      { status: 500 }
    );
  }
}
