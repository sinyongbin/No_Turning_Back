import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Gender } from "@prisma/client";


export async function GET(request:NextRequest) {
    const findEmail = (request.nextUrl.searchParams.get('email')as string);
    const profile = await prisma.profile.findUnique({
        where:{email:findEmail},
        select:{email:true, nickname:true},
    })
        console.log(profile);
    return new NextResponse(JSON.stringify(profile));
}

export async function POST(req:NextRequest, res: NextResponse) {

    const data = await req.formData();
    
    let {email, nickName, bio} = Object.fromEntries(data);
    console.log("email", email)
    console.log("nickName", nickName)
    console.log("bio", bio)

    const gender  = (val : string) =>{
        if(val == "MALE")
            return Gender.MALE
        else if(val == "FEMALE")
            return Gender.FEMALE
        else
            return Gender.TRANS
    }

    const profile = await prisma.profile.create({
        data: {
            email: email.toString(),
            nickname: nickName.toString(),
            bio: gender(bio.toString()),
        }
    })
    console.log(profile);


    return new Response("OK")
}
