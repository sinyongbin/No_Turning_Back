import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

//회원정보 가져오기(GET)

export async function GET() {
    const data = await prisma.profile.findMany({
        select :  {
            nickname: true,
            email: true,
        },
        where : {
            email: 'q@naver.com'
        }
    })
    return NextResponse.json(data)
}

//회원정보 변경(PUT)

export async function PUT(req:NextRequest, res: NextResponse) {

    const data = await req.formData();
    console.log("몽고로 넘어온 data: ",data);

    let { nickname } = Object.fromEntries(data);

    const update = await prisma.profile.updateMany({
        data: {
            nickname: nickname.toString(),
        },
        where : {
            email: 'q@naver.com'
        }
    })
    return new Response("OK")
}