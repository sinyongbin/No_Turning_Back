import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Category } from "@prisma/client";



export async function GET(req:NextRequest){
    const id = (req.nextUrl.searchParams.get('id'));  
    if (id) {
    const data = await prisma.post.findMany({
        where: { category: { in: [Category.beauty, Category.hobby, Category.digital, Category.car, Category.etc, Category.sport] } },
        select: {
            id: true,
            title: true,
            starting_price: true,
            category: true,
            images: true,
        },
        orderBy: { update_date: "desc" },
    });

    // BigInt 값을 문자열로 변환
    const serializedData = data.map((item) => ({
      ...item,
      starting_price: item.starting_price.toString(),
      end_date: item.toString(), // 이 부분은 정확한 값으로 수정해야 합니다.
      // 다른 BigInt 필드도 필요한 경우 문자열로 변환
    }));

    return NextResponse.json(serializedData);
  }

    // id 값이 존재하지 않는 경우 예외 처리 등을 수행
    return NextResponse.json({ error: "Invalid id value" });
}