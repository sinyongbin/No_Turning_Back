import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";


export async function GET(req:NextRequest,context: { params: any }) {
  const searchText = context.params.searchText;
  console.log("검색어:", searchText);
  
  const result = await prisma.post.findMany({
      where: {
          OR: [         
              { title: { contains: searchText } },    
              {categoryname:{contains:searchText}},
              { user: { nickname: { contains: searchText } } }
          ]
      },
      select: {
          id: true,
          title: true,
          categoryname:true,
          starting_price:true,
          user: {
              select: {
                  nickname: true,
              },
          },
          images:true,
      },
   
  });

  console.log("검색 결과:", result);
  return NextResponse.json(result);
}
