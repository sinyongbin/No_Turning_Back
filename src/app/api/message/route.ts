import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
 

export async function POST(req:NextRequest, res: NextResponse) {

    const data = await req.formData();
    
    console.log(data);
    

    let { email, title, content } = Object.fromEntries(data);

    let insert = {
        email: email.toString(),
        title: title.toString(),
        content: content.toString(),
    }
    const report = await prisma.message.create({
        data: insert
    })
    console.log("문의하기 글 내용: ", report);
    return new Response("OK")
}

