import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function GET(){
    const data = await prisma.post.findMany({
        orderBy: {
            update_date: 'desc',
        }
    });

    return NextResponse.json(data);
}


