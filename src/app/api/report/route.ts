import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function POST(req:NextRequest, res: NextResponse) {

    const data = await req.formData();
    console.log("데이터좀 보라고: ", data);

    let { email, title, content } = Object.fromEntries(data);
    // console.log('body입니다:', email);

    let insert = {
        email: email.toString(),
        title: title.toString(),
        content: content.toString(),
    }
    const report = await prisma.report.create({
        data: insert
    })
    console.log("report: ", report);
    return new Response("OK")
}
