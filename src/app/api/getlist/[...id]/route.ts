import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Category as PrismaCategory } from "@prisma/client";



export async function GET(req:NextRequest,id:string){
  console.log(id);
  
  if (id) {
    const data = await prisma.post.findMany({
      where: { category: { in: [PrismaCategory.beauty, PrismaCategory.hobby, PrismaCategory.digital,PrismaCategory.car,PrismaCategory.etc,PrismaCategory.sport] } },
      select: {
        id: true,
        title: true,
        starting_price: true,
        category: true,
        images: true,
      },
      orderBy: { create_date: "desc" },
    });

    // BigInt 값을 문자열로 변환
    const serializedData = data.map((item) => ({
      ...item,
      starting_price: item.starting_price.toString(),
      end_date: item.toString(), // 이 부분은 정확한 값으로 수정해야 합니다.
      // 다른 BigInt 필드도 필요한 경우 문자열로 변환
    }));
    console.log(serializedData);
    
    return NextResponse.json(serializedData);
  }

  // id 값이 존재하지 않는 경우 예외 처리 등을 수행할 수 있습니다.
  return NextResponse.json({ error: "api 오류 " });
}
