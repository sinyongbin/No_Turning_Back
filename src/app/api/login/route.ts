import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db";



export async function POST(request: NextRequest, response: NextResponse) {
    
    const data = await request.formData();
    // console.log(data);
    
    try {
        const result = await fetch("http://localhost:8080/member/login", {
            method: "POST",
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const balanceState=await result.text();

        if (result.status === 200) {

            let { email } = Object.fromEntries(data);
            let prismaData = await prisma.profile.findUnique({
                where: { email: email.toString() },
                select: {
                    email: true,
                    nickname: true,
                }
            })
            const returnValues={
                email:prismaData?.email,
                nickname:prismaData?.nickname,
                balanceState:balanceState
            };
            console.log("보내줄 값임: ",returnValues);

            
            return NextResponse.json({ result: returnValues }, { status: 200 });
        }
    }
    catch (err) {
        return NextResponse.json({ result: "로그인 실패" }, { status: 500 });
    }
    return NextResponse.json({ result: "로그인 실패" }, { status: 500 });
}