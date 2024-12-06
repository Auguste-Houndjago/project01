import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      include: { user: true },
    });

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Impossible de récupérer les admins." },
      { status: 500 }
    );
  }
}

