import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import {Gender as gender} from 'prisma/prisma-client'

import axios from "axios";
export async function GET() {
    const profile = {
        bio : gender.MALE,
        email: "jadedafeeeder@gmail.com",
        nickname: "nicknametest",
    }
    const data = await prisma.profile.create({data:profile })

    return NextResponse.json(data)
}