import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

//회원정보 가져오기(GET)

export async function GET(request:NextRequest,context: { params: any }) {
    let myemail = context.params.id;

    try{
        const result = await fetch(`http://localhost:8080/member/member_info/${myemail}`,{
            method : "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        })
        if(result.status === 200){
            const response = await result.json();

            const { address, phoneNum } = response;

            const data = await prisma.profile.findMany({
                select :  {
                    nickname: true,
                },
                where : {   
                    email: myemail
                }
            });

            const combinedData = {
                //...response, //전체 데이터 뽑아오기
                address,
                phoneNum,
                nickname: data[0].nickname, 
            };

            return NextResponse.json(combinedData)
        }

    }
    catch(err){
        return NextResponse.json({result:"회원정보를 가져오지 못했습니다"},{status : 500});
    }
    return new Response("OK")
}

//회원정보 변경(PUT)

export async function PUT(req:NextRequest,context: { params: any }) {

    let myemail = context.params.id;

    const data = await req.formData();

    let { nickname } = Object.fromEntries(data);

    console.log(nickname)

    const update = await prisma.profile.updateMany({
        data: {
            nickname: nickname.toString(),
        },
        where : {
            email: myemail
        },
    })
    return new Response("OK")
}