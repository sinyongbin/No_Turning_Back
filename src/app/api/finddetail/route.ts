import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function GET(req: NextRequest) {
    // const data = await prisma.post.findFirst({
    //    select: {
    //        id: true,
    //        user: {
    //        select: {
    //            nickname: true,
    //        },
    //        },
    //    },
//  });   
    const id = (req.nextUrl.searchParams.get('id') as string);

    try {
    const data = await prisma.post.findUnique({
        where: {
            id: id,
        },
        select: {
            title: true,
            content: true,
            starting_price: true,
            create_date: true,
            images: true,
            category: true,
            comments: true,
        },
    });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}