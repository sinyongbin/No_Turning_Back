import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function GET(req: NextRequest, context: { params: any }){
    // const postid = (req.nextUrl.searchParams.get('postid') as string);
    let receiverEmail = context.params.email;

    const messages  = await prisma.message.findMany({
        where:{
            receiver: receiverEmail,
        },
        select:{
            id: true,
            postid: true,
            sender: true,
            receiver: true,
            title: true,
            content: true,
            create_date: true,
        },
    });
    
    const messageList = [];
    for (const message of messages) {

        const senderProfile = await prisma.profile.findUnique({
        where: {
            email: message.sender,
        },
        select: {
            nickname: true,
        },
        });

        const receiverProfile = await prisma.profile.findUnique({
        where: {
            email: message.receiver,
        },
        select: {
            nickname: true,
        },
        });

        messageList.push({
            message: message,
            sendernickname: senderProfile?.nickname,
            receivernickname: receiverProfile?.nickname,
        });
    }
    console.log('messageList: ', messageList);
    return NextResponse.json(messageList, {status: 200});
}
