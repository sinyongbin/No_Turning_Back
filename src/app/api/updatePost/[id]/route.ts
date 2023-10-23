import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function PUT(req: NextRequest, context: { params: any }){
    let id = context.params.id
    try {
        const updatedInfo = await prisma.post.update({
        where: { id:id },
        data: {
            publicInfo: 'CLOSED',
        },
    });
    // console.log("변경후 상태",updatedInfo);
    
        return NextResponse.json(updatedInfo);
    } catch (error) {
        console.error('error PUBLICINFO:', error);
        throw new Error('업데이트 실패');
    }
}