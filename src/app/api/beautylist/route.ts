import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function GET(){
    
    const data = await prisma.post.findMany({
        where: { category: { in: ["beauty"] } },
      });
      
    //console.log(data);


    // const categorytagName  = (val : string) =>{
    //     if(val == "beauty")
    //         return Category.beauty
    //     else if(val == "hobby")
    //         return Category.hobby
    //     else if( val == "digital")
    //         return Category.digital
    //     else if( val =="sport")
    //         return  Category.sport
    //     else if( val == "car")
    //         return Category.car
    //     else 
    //         return Category.etc
    // }

    
     // BigInt 값을 문자열로 변환
     const serializedData = data.map((item) => ({
        ...item,
        starting_price: item.starting_price.toString(),
        // 다른 BigInt 필드도 필요한 경우 문자열로 변환
    }));

    return NextResponse.json(serializedData);
}

// export async function GET(){
//     const data = await prisma.post.findMany({select :  {
//         id: true,
//         email: true,
//         title: true,
//         content: true,
//         starting_price: true,
//     } })
//     return NextResponse.json(data)
// }