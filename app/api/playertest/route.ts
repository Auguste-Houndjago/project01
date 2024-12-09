import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
    try {
        const players = await prisma.player.findMany({
        include:{manager:true , team:true , statistics:{
            orderBy:{
                createdAt: 'desc',
            },
            take:1
        },
        


        }
        })
        return NextResponse.json(players , {status:200})

    } catch (error) {
        console.error("error fetching players ", error)
        return NextResponse.json(
            {error: "error fetching players "},
            {status: 500}
        
        )
    }
}