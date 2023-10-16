import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Gender } from "@prisma/client";
import { Category } from "@prisma/client";

export async function POST(req:NextRequest, res: NextResponse) {
  let data = await req.json()
  console.log("데이터좀 보라고: ", data);
//  console.log(data[0].email)
    // const data = await req.formData();
    // console.log('body입니다:', data);

    // //const images = data.getAll('images'); // 이미지 파일을 모두 가져옴
    // data.getAll("images").forEach((e,i)=>{
    //   console.log(e.slice(0,10))
    // })
    // let { email, title, categoryname, price, content, category, images} = Object.fromEntries(data);
    
    // console.log('body입니다:', email);
    // // console.log('images',images.toString());
    console.log('email이라구',data[0].email)
    let selectedCategory;
    if (data[0].category === 'beauty') {
      selectedCategory = Category.beauty;
    } else if (data[0].category === 'hobby') {
      selectedCategory = Category.hobby;
    } else if (data[0].category === 'digital') {
      selectedCategory = Category.digital;
    } else if (data[0].category === 'sport') {
      selectedCategory = Category.sport;
    } else if (data[0].category === 'car') {
      selectedCategory = Category.car;
    } else {
      selectedCategory = Category.etc;
    }
    let insert = {
        email: data[0].email, // 필요없는거 아닌가? 경매 등록할 때
        title: data[0].title,
        content: data[0].content,
        starting_price: parseInt(data[0].price),
        categoryname: data[0].categoryname,
        images: data[0].images,
        category: selectedCategory,
    }
    const post = await prisma.post.create({
        data: insert
    })
    return new Response("OK")
}
