import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest, context: { params: any }){
    let findId =context.params.id;
    // console.log("몽고아이디 검색:",findId);
    let temp = []
    try{
        const detailData = await prisma.post.findUnique({
            where:{
                id:findId,
            },
            select:{
                id:true,
                email:true,
                title:true,
                content:true,
                starting_price:true,
                endDate:true
            },
        });
        const nickname  = await prisma.profile.findMany(
            {   
                where: {
                    email : detailData?.email
                },
                select:{
                    
                    nickname:true
                }
            }
        )
        temp.push({post: detailData})
        temp.push(nickname[0])
        
        // console.log(temp)
        return NextResponse.json({result: temp},{status:200})
    }catch{
        return NextResponse.json({result: "ERROR"},{status:500})
    }
    
}

