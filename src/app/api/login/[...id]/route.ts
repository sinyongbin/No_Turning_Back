import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";



export async function GET(request:NextRequest,context: { params: any }) {
    let query = context.params.id;
    // console.log(query)
    try{
        const result = await fetch("http://localhost:8080/member/login",{
            method : "POST",
            body : JSON.stringify({
                email : query[0],
                password:query[1]
            }),
            headers:{
                'Content-Type':'application/json'
            }}
        )
        if(result.status === 200)
        {
            const prismaData = await prisma.profile.findUnique({
                where : {email : query[0]},
                select:{
                    email:true,
                    nickname:true,
                }
            })
            console.log('prismaData:',prismaData);  
            return NextResponse.json({result:prismaData},{status : 200});
        }
    }
    catch(err)
    {
        return NextResponse.json({result:"로그인 실패"},{status : 500});
    }
    return NextResponse.json({result:"로그인 실패"},{status : 500});
}
