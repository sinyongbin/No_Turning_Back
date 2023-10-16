import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { title } from "node:process";



export async function POST(req:NextRequest, res: NextResponse){
    const data = await req.formData();
    let {id, email,comments,content} = Object.fromEntries(data);

    let insertComment = {
        email: "a@naver.com",       
        content: comments.toString(),
    }
    const commentshow = await prisma.comment.create({
        data:insertComment
    })
   
     const post = await prisma.post.create({

         data:{
            id: id.toString(),
            email: email.toString(),
            title: title.toString(),
            content: content.toString(),  
             
         },
     })
 
 
     return new Response("OK")
 }
       
