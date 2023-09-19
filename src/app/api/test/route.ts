import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import axios from "axios";
export async function GET() {
    const data = await prisma.test.findMany()
    const url = ""
    let sql = await axios.get(url).then(e=>{
        console.log(e)
    })
    return NextResponse.json(data)
}
export async function POST(req:NextRequest) {
    const data =  await req.formData()
    let {name, address, address2,phone,email} = Object.fromEntries(data);
    let body = Object.fromEntries(data);
    return new Response("OK")
}
