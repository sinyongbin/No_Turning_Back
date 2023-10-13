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
    //const images = data.getAll('images'); // 이미지 파일을 모두 가져옴

    let { email, title, categoryname, price, content, category, images} = Object.fromEntries(data);
    let body = Object.fromEntries(data);

    console.log('body입니다:', body)
    // console.log(images);

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


    // const selectedCategory = getCategoryEnum(category);
  

    // 이미지를 Base64로 변환하고 배열에 추가
    // const imageBase64Array = [];
    // const images = data.getAll('images');
    
  
    let insert = {
        email: email.toString(), // 필요없는거 아닌가? 경매 등록할 때
        title: title.toString(),
        content: content.toString(),
        starting_price: parseInt(price.toString()),
        categoryname: categoryname.toString(),
        images: images.toString(),// 여기가 문제 !!
        category: selectedCategory,
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


