import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import {Gender as gender} from 'prisma/prisma-client'

import axios from "axios";
export async function GET() {
    //const data = await prisma.test.findMany()
    const url = ""
    let sql = await axios.get(url).then(e=>{
        console.log(e)
    })
    //return NextResponse.json(data)
}