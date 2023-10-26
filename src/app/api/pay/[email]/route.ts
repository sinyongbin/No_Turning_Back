import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(req : NextRequest, context: { params: any }) {
    let getEamil = context.params.email;
    console.log(getEamil);
    
    let data = await fetch(`http://localhost:8080/jinddoPay/create/${getEamil}`, {
        method : "GET"
    })
    .then(e=>{return e.json()})
    
    return NextResponse.json(data)
}
