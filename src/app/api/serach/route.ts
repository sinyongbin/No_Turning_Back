import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Content } from "next/font/google";

export async function GET(){
    const result = await prisma.post.findMany({
        where: {
          OR: [
            { content: },
            { title:},
          ],
        },
        select:{
            user:ninckname,
        }
      });
    }      
//ninckname , contnent , title 받아와야함