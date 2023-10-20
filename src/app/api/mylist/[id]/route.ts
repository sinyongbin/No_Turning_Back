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

export async function POST(request:NextRequest,context: { params: any }) {
    const myemail = context.params.id;
    const data = await request.json();

    console.log(data);

    console.log(data.id);

    // let { id } = Object.fromEntries(data);

    const deletedPost = await prisma.post.deleteMany({
        where: {
            id: data.id
        },
    });
    return NextResponse.json("정상적으로 삭제되었습니다.")

}