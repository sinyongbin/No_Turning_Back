import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(){
    const result = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        images:true,
        user:{
          select:{
            nickname:true,
          }
        }
      } 
    })
    console.log(result);
    return NextResponse.json(result);
  }
//ninckname , contnent , title 받아와야함