import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";

export async function POST(request:NextRequest,context: { params: any }) {
    let myEmail = context.params.id;
    let postInfo =[];
    try{
        let result = await fetch(`http://localhost:8080/transaction/sellerTransaction/${myEmail}`,{
            method : "GET",
        }).then(e=>e.json());
        
        if(result !== null){
            for(let i = 0; i<result.length; i++){
                let data = await prisma.post.findUnique({
                    select :  {
                        title: true,
                    },
                    where : {   
                        id: result[i].postId
                    }
                });
                postInfo.push({
                    title: data && data.title,
                    transactionId: result[i].transactionId,
                    maxPrice: result[i].maxPrice,
                    maxEmail: result[i].maxEmail,
                    currentPrice: result[i].currentPrice,
                    postId: result[i].postId,
                    sellerEmail: result[i].sellerEmail,
                    biddingTimeStamp: result[i].biddingTimeStamp,
                    sellerCheck: result[i].sellerCheck,
                    buyerCheck: result[i].buyerCheck
                });
            }
            };
            return NextResponse.json(postInfo,{status:200});
        }catch(err){
            return NextResponse.json({result:"구매정보를 가져오지 못했습니다"},{status : 500});
    }
}