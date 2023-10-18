import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest, context: { params: any }){
    let id =context.params.id;
    const result = await prisma.post.findUnique({
        where:{
            id:id,
        },
        select:{
            images:true,
        },
    });
    
    return NextResponse.json(result);
}