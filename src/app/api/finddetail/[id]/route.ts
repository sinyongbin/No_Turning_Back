import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest, context: { params: any }) {
    let id = context.params.category;

    const result = await prisma.post.findMany({
        where:{
            id: id
        },
        select: {
            id: true,
            title: true,
            content: true,
            starting_price: true,
            images: true,
            user: {
                select: {
                    nickname: true,
                }
            },
        },
    });   
    return NextResponse.json(result);
}