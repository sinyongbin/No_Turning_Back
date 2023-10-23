import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Content } from "next/font/google";

export async function GET(){
    const result = await prisma.post.findMany({
      select:{
        content:true,
        images:true,
        title:true,
        user:{
          select:{
            nickname:true,
          }
        }
      }
      
    })
    console.log(result);
    return new Response("OK");
  }
//ninckname , contnent , title 받아와야함