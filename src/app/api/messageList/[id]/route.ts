import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function GET(req: NextRequest, context: { params: any }){
    // const postid = (req.nextUrl.searchParams.get('postid') as string);
    let oneMessage = context.params.id;

    const messages  = await prisma.message.findMany({
        where:{
            id: oneMessage,
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

    console.log('messageList 따온거 나옴zzz: ', messageList);
    // return NextResponse.json("OK");
    return NextResponse.json(messageList, {status: 200});
}

// 쪽지 삭제 부분
export async function DELETE(req: NextRequest, context: { params: any }){
    let oneMessage = context.params.id;

    console.log("oneMessage: ", oneMessage);
    // console.log("data.id: ", data);

    const deleteUser = await prisma.message.delete({
        where: {
            id: oneMessage,    
        },
    })
    console.log("delete할 쪽지 id먼데!!: ", deleteUser);

    return NextResponse.json(deleteUser, {status: 200});
}



