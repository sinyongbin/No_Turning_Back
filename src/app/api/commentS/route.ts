import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function POST(req:NextRequest, res: NextResponse){
    const data = await req.formData();
    let {id, email} = Object.fromEntries(data);
    async function createComment(postId:any, email:any, content:any) {
        const newComment = await prisma.comment.create({
          data: {
            post: { connect: { id: postId } }, 
            email, 
          }
        });
        return newComment;
      }
}