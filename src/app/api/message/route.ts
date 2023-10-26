import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
 

export async function POST(req: NextRequest, res: NextResponse){
    const data = await req.json();
    // let {id, sender, receiver, title, content} = Object.fromEntries(data);

    // let message = {
    //     // id: id.toString(),
    //     sender: sender.toString(),
    //     receiver: receiver.toString(),
    //     title: title.toString(),
    //     content: content.toString(), 
    // }

    const message = {
        postid: data[0].postid,
        sender: data[0].sender,
        receiver: data[0].receiver,
        title: data[0].title,
        content: data[0].content,
    };

    const messageshow = await prisma.message.create({
        data:message
    })
    console.log(messageshow);
    return new Response("OK")
}

