import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Category } from "@prisma/client";


export async function GET(req: NextRequest) {
    
    let data = await req.json()


    const result = await prisma.post.findMany({
            select:{
            id:true,
            category:true,
            title:true,
            starting_price:true,
        }
    });
    return NextResponse.json(result);
    }