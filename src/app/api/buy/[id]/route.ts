import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(request:NextRequest,context: { params: any }){
    let postid = context.params.id;
}