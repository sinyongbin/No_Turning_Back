import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db";

export async function POST(request: NextRequest, context: { params: any }) {
    let myEmail = context.params.id;
    const postid1 = await request.json();
    let postInfo = [];

    try {
        let result = await fetch(`http://localhost:8080/transaction/sellerTransaction/${myEmail}`, {
            method: "GET",
        }).then(e => e.json());
        if (result !== null) {
            for (let i = 0; i < result.length; i++) {
                // Check if the postid1 matches the postId in the current result item
                if (result[i].postId === postid1) {
                    let data = await prisma.post.findUnique({
                        select: {
                            title: true,
                        },
                        where: {
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
            }
            return NextResponse.json(postInfo, { status: 200 });
        } 
    } catch (err) {
        return NextResponse.json({ result: "구매정보를 가져오지 못했습니다" }, { status: 500 });
    }
}

export async function PUT(req:NextRequest, context:{ params: any }) {
    const postid1 = await req.json();
    try{
        let result1 = await fetch(`http://localhost:8080/transaction/post/${postid1}`, {
            method: "GET"
        }).then(e=>e.json());

        if(result1.buyerCheck === true && result1.sellerCheck === false) {
            let result2 = await fetch(`http://localhost:8080/transaction/sellerCheck/${postid1}`,{
                method: "PUT"
            })
            return NextResponse.json({status:true});
        } else if (result1.buyerCheck === true && result1.sellerCheck === true) {
            return NextResponse.json({status:200});
        } else {
            return NextResponse.json({status:false});
        }
    }catch(err){
        return NextResponse.json({status:500});
    }
}