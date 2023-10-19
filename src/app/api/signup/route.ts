import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db";
import { Gender } from "@prisma/client";


export async function POST(req: NextRequest, res: NextResponse) {

    const data = await req.formData();


    try {
        const orcleResult = await fetch("http://localhost:8080/member/member_join", {
            method: "POST",
            body: JSON.stringify({
                email: data.get('email'),
                address: data.get('address'),
                phoneNum: data.get('phoneNum'),
                password: data.get('password'),

            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log('orcleResult.status: ', orcleResult.status);

        if (orcleResult.status === 200) {
            let { email, nickName, bio } = Object.fromEntries(data);

            const gender = (val: string) => {
                if (val == "MALE")
                    return Gender.MALE
                else if (val == "FEMALE")
                    return Gender.FEMALE
                else
                    return Gender.TRANS
            }

            const profile = await prisma.profile.create({
                data: {
                    email: email.toString(),
                    nickname: nickName.toString(),
                    bio: gender(bio.toString()),
                }
            })
            return NextResponse.json({ result: "로그인 성공" }, { status: 200 });
        }
    }
    catch (err) {
        return NextResponse.json({ result: "로그인 실패" }, { status: 500 });
    }
    return NextResponse.json({ result: "로그인 실패" }, { status: 500 });
}
