import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Gender } from "@prisma/client";

// const jsonData = await req.json();

// export async function GET(res: NextResponse) {

// }



export async function POST(req:NextRequest, res: NextResponse) {

    const data = await req.formData();

    // 세션 스토리지에서 이메일 값을 가져옵니다.
    //const email = sessionStorage.getItem('email');
    
    let { title, categoryname, price, content} = Object.fromEntries(data);
    let body = Object.fromEntries(data);

    console.log(body)

    
    let insert = {
        email: "te@test.com", 
        title: title.toString(),
        content: content.toString(),
        starting_price: parseInt(price.toString()),
        categoryname: categoryname.toString(),
    }

    const post = await prisma.post.create({
        data: insert
    })
    
    const profile = await prisma.profile.create({

        data:{
            bio: Gender.FEMALE,
            email: "te@test.com",
            nickname :"jjinddo",
        },
    })

    console.log(post);
    console.log(profile);
    
    // return res.json(profile);
    
    return new Response("OK")
}

