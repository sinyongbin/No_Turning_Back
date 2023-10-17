import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Gender } from "@prisma/client";
import { type } from "os";

export async function GET(request:NextRequest) {
    
    const findEmail = request.nextUrl.searchParams.get('email');
    console.log("몽고디비로 넘어온 이메일 값: ", findEmail);

    // console.log(typeof(findEmail));
    // const profile = await prisma.profile.findUnique({
    //     where:{email:findEmail},
    //     select:{email:true, nickname:true},
    // })
    
    const profile = await prisma.profile.findMany();
    console.log(profile);
    return new Response("OK")
}

