import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(request:NextRequest,context: { params: any }){
    let myemail = context.params.id;

    const data = await prisma.post.findMany({
        where: {
            email: myemail
        },
        orderBy: {
            update_date: 'desc',
        }
    });
    // console.log('data', data);
    // const data = await prisma.post.findMany({select :  {
    //     id: true,
    //     email: true,
    //     title: true,
    //     content: true,
    //     starting_price: true,
    // } })

    // BigInt 값을 문자열로 변환
    const changeData = data.map((item) => ({
        ...item,
        starting_price: item.starting_price.toString(),
        // 다른 BigInt 필드도 필요한 경우 문자열로 변환
    }));
    // console.log("changeData: " , changeData);

    return NextResponse.json(changeData);
}

// export async function POST(request:NextRequest,context: { params: any }){
//     let myemail = context.params.id;

//     const data = await prisma.post.delete({
//         where: {
//             email: myemail
//         },
//         select: {
//             id: 
//         }
//     });
// }