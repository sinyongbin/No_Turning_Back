import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import { Post,Profile } from "@prisma/client";

// export async function GET(req: NextRequest) {

//  const data = await prisma.post.findFirst({
//         select: {
//             id: true,
//             title:true,
//             content:true,
            
//             user: {
//             select: {
//                 nickname: true,
//             },
//           },
//         },
//       });

  //   return NextResponse.json(data);
  // }
export async function GET() {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      starting_price: true,
    },
  });
  const serializedData = data.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    starting_price: item.starting_price.toString(),
  }));

  return NextResponse.json(serializedData);
}

// export async function GET(req:NextRequest,id:string) {
//     const data = await prisma.post.findMany({
//         where: {
//           id: id,
//         },
//       });
//     return NextResponse.json(data);
// }


// export async function GET(req: NextRequest,id:any) {
  
//   const profiles = await prisma.profile.findMany({
//     where: {
//       id: id
//     },
//     include: {
//       post: {
//         select: {
//           email: true,
//           title: true,
//           content: true,
//           images: true,
//           starting_price: true,
//         },
//       },
//     },
//   });
  
//   const responseData = profiles.map((profile) => {
//     return {
//       nickname: profile.nickname, 
//       posts: profile.post.map((post) => {
//         return {
//           title: post.title,
//           content: post.content,
//           images: post.images,
//           starting_price: post.starting_price.toString(), // BigInt를 문자열로 변환하여 반환
//         };
//       }),
//     };
//   });

//   return NextResponse.json(responseData);
// }



// export async function GET(req:NextRequest) {
//   const id = (req.nextUrl.searchParams.get('id') as string);
//   const data = await prisma.post.findMany({
//     where: { 
//       id : id,
//       category: { 
//         in: ["beauty", "hobby", "etc","car"] 
//       } 
//     },
//     select: {
//       id: true,
//       title: true,
//       content:true,
//       comments:true,
//       starting_price: true,
//       category: true,
//       images: true,
//     },
//   });

//   // BigInt 값을 문자열로 변환
//   const serializedData = data.map((item) => ({
//     ...item,
//     starting_price: item.starting_price.toString(),
//     end_date: item.toString(),
    
//   }));

//   return NextResponse.json(serializedData);
// }
