import { NextResponse , NextRequest } from "next/server";
import  fs   from "fs";
import { randomUUID } from "crypto";

export async function POST(req : NextRequest) {
    const postid = "test"

    const body = await req.json()
    return NextResponse.json(body)
}
