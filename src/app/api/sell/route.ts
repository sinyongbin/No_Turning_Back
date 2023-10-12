import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Gender } from "@prisma/client";
import { Category } from "@prisma/client";

// const jsonData = await req.json();

// export async function GET(res: NextResponse) {

    // const profile = await prisma.profile.create({
    //     data:{
    //         bio: Gender.MALE,
    //         email: "bin0219@naver.com",
    //         nickname :"용빈",
    //     },
    // })

// }



export async function POST(req:NextRequest, res: NextResponse) {

    const data = await req.formData();

    let { title, nickname, categoryname, price, content, category} = Object.fromEntries(data);
    let body = Object.fromEntries(data);

    console.log(body)

    let selectedCategory;
    if (category === 'beauty') {
      selectedCategory = Category.beauty;
    } else if (category === 'hobby') {
      selectedCategory = Category.hobby;
    } else if (category === 'digital') {
      selectedCategory = Category.digital;
    } else if (category === 'sport') {
      selectedCategory = Category.sport;
    } else if (category === 'car') {
      selectedCategory = Category.car;
    } else {
      selectedCategory = Category.etc;
    }

    let insert = {
        email: "vin0219@naver.com",
        // nickname: nickname.toString(),
        title: title.toString(),
        content: content.toString(),
        starting_price: parseInt(price.toString()),
        categoryname: categoryname.toString(),
        category:selectedCategory,
    }
    

    const post = await prisma.post.create({
        data: insert
    })
    
    // const profile = await prisma.profile.create({

    console.log(post);
    // console.log(profile);
    //     data:{
    //         bio: Gender.FEMALE,
    //         email: "te@test.com",
    //         nickname :"jjinddo",
    //     },
    // })

    // console.log(post);
    // console.log(profile);
    

    // return res.json(profile);

    return new Response("OK")
}


// 1. 이미 몽고에 등록되어있는 profile에 있는 닉네임이 세션적용이 되서 등록창에 보여져야함 
// 근데 지금 이메일을 강제로 등록시키는중 (name="email"이부분에 "nickname"로 바꿔줘야함)
// email을 세션에 담아서 profile에 딸린 nickname를 get으로 보여지게한다.

// 회원가입할때 정보가 몽고디비와 오라클디비에 나눠서 들어가져야한다 (ex: 몽고디비에 이메일과 )
