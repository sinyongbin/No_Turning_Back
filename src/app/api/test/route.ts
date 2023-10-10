import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import axios from "axios";


export async function GET() {
    
}

export async function POST(req:NextRequest) {
    const data = await req.formData()
    let {name, address, address2,phone,email} = Object.fromEntries(data);
    let body = Object.fromEntries(data);
    return new Response("OK")
}
